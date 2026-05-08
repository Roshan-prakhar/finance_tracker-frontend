import {assets} from "../assets/assets.js";
import {Link} from "react-router-dom";
import {Heart} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            {name: 'Features', to: '/home#features'},
            {name: 'Dashboard', to: '/dashboard'},
            {name: 'Income Tracker', to: '/income'},
            {name: 'Expense Tracker', to: '/expense'},
        ],
        Company: [
            {name: 'About', to: '/home#about'},
            {name: 'Privacy Policy', to: '#'},
            {name: 'Terms of Service', to: '#'},
        ],
        Support: [
            {name: 'Help Center', to: '#'},
            {name: 'Contact Us', to: '#'},
            {name: 'FAQ', to: '#'},
        ],
    };

    return (
        <footer id="about" className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/home" className="flex items-center gap-2.5 mb-5">
                            <img src={assets.logo} alt="logo" className="h-9 w-9" />
                            <span className="text-lg font-bold text-white">Money Manager</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                            Your trusted companion for smart financial management. Track, analyze, and optimize your income and expenses effortlessly.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} Money Manager. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Team Money Manager
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
