import {useState, useEffect} from "react";
import {assets} from "../assets/assets.js";
import {Link} from "react-router-dom";
import {Menu, X, Sparkles} from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: '/home' },
        { name: 'Features', to: '/home#features' },
        { name: 'About', to: '/home#about' }
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-white/50 backdrop-blur-sm'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <img src={assets.logo} alt="logo" className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Money Manager
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                to={link.to}
                                key={link.name}
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons & Hamburger Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
                            >
                                <Sparkles className="w-4 h-4" />
                                Get Started
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden animate-fade-in border-t border-gray-100">
                    <div className="container mx-auto px-4 py-4 bg-white/95 backdrop-blur-lg">
                        <nav className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-gray-100">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors font-medium"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-center text-white font-semibold rounded-xl transition-all"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;