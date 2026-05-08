import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Menu, X, ArrowRight} from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', to: '#features' },
        { name: 'About', to: '#about' },
        { name: 'Pricing', to: '#pricing' }
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">₹</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">Finve</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                href={link.to}
                                key={link.name}
                                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 rounded-lg"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Action Buttons & Hamburger Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-xl transition-all duration-200 hover:bg-green-700"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden animate-slide-down border-t border-gray-100">
                    <div className="container mx-auto px-4 py-4 bg-white">
                        <nav className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-gray-100">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-center text-white font-semibold bg-green-600 rounded-xl transition-all hover:bg-green-700"
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