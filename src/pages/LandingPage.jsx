import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import StatsSection from "../components/StatsSection.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Activity, Shield, Globe, Zap, Github, Linkedin, Mail, Phone, MapPin, BookOpen, Award, Calendar, Users, Clock, ChevronRight, WalletCards, TrendingUp, BarChart3, LayoutDashboard, PieChart, Settings, HelpCircle, LogIn, UserPlus, Sparkles, Target, Download, Lock, Eye, Wallet } from "lucide-react";

/* ─── Stock Ticker Data ─── */
const stockData = [
    { symbol: "NIFTY 50", price: 22450.75, change: 1.25, type: "index" },
    { symbol: "SENSEX", price: 73852.94, change: 0.89, type: "index" },
    { symbol: "RELIANCE", price: 2847.50, change: -0.45, type: "stock" },
    { symbol: "TCS", price: 3892.15, change: 2.14, type: "stock" },
    { symbol: "HDFCBANK", price: 1456.80, change: -1.20, type: "stock" },
    { symbol: "INFY", price: 1523.45, change: 0.67, type: "stock" },
    { symbol: "SBIN", price: 742.30, change: 1.89, type: "stock" },
    { symbol: "BAJFINANCE", price: 6789.20, change: -0.78, type: "stock" },
    { symbol: "BHARTIARTL", price: 987.65, change: 1.45, type: "stock" },
    { symbol: "ITC", price: 423.80, change: 0.34, type: "stock" },
    { symbol: "LT", price: 3156.40, change: -0.92, type: "stock" },
    { symbol: "ADANIENT", price: 2890.15, change: 3.21, type: "stock" },
];

/* ─── Stock Ticker Component ─── */
const StockTicker = () => (
    <div className="w-full bg-slate-900 border-y border-slate-800 overflow-hidden py-2.5 relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap">
            {[...stockData, ...stockData, ...stockData].map((stock, idx) => (
                <div key={idx} className="flex items-center gap-2.5 px-6 border-r border-slate-800/50">
                    <span className={`text-xs font-bold tracking-wider ${stock.type === 'index' ? 'text-amber-400' : 'text-slate-300'}`}>
                        {stock.symbol}
                    </span>
                    <span className="text-sm font-mono font-semibold text-white">
                        {stock.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                    </span>
                    <span className={`flex items-center gap-0.5 text-xs font-bold ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(stock.change)}%
                    </span>
                    <Activity size={12} className={stock.change >= 0 ? 'text-emerald-500/50' : 'text-rose-500/50'} />
                </div>
            ))}
        </div>
    </div>
);

/* ─── Enhanced Header with Intra-Site Navigation ─── */
const EnhancedHeader = () => {
    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Income', icon: TrendingUp, href: '/income' },
        { label: 'Expense', icon: BarChart3, href: '/expense' },
        { label: 'Categories', icon: WalletCards, href: '/category' },
        { label: 'Filters', icon: PieChart, href: '/filters' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:shadow-emerald-600/30 transition-shadow">
                            <WalletCards className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold text-gray-900 tracking-tight">FinTrack</span>
                            <span className="text-emerald-600 font-bold">Pro</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all duration-200 group"
                            >
                                <item.icon size={16} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="hidden sm:flex items-center gap-2">
                        <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                            <LogIn size={16} />
                            Sign In
                        </Link>
                        <Link to="/signup" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-600/20">
                            <UserPlus size={16} />
                            Get Started
                        </Link>
                    </div>
                </div>

                <div className="lg:hidden pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <Link key={item.label} to={item.href} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all duration-200 whitespace-nowrap">
                            <item.icon size={14} className="text-gray-400" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
};

/* ─── Premium Glassmorphism ATM Card ─── */
const GlassCard = ({ type, balance, holder, number, expiry, gradient, accentColor, top, left, rotate, scale }) => {
    const isDebit = type === 'debit';
    
    return (
        <div className={`absolute hidden lg:block w-64 rounded-2xl p-5 shadow-2xl transition-all duration-500 hover:scale-105 hover:z-50 cursor-pointer group`}
            style={{
                top, left, rotate, scale,
                background: gradient,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                zIndex: 20
            }}>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
                style={{background: `radial-gradient(circle, ${accentColor}, transparent)`, filter: 'blur(30px)'}}></div>
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 2.5s ease-in-out infinite',
                }}></div>

            <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.08) 100%)',
                }}></div>

            <div className="w-10 h-7 rounded-md opacity-80 mb-4"
                style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)',
                }}>
                <div className="w-full h-full rounded-md border border-amber-700/20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-3.5 border border-amber-800/30 rounded-sm"></div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isDebit ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></div>
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">
                        {isDebit ? 'Platinum Debit' : 'World Elite Credit'}
                    </span>
                </div>

                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Balance</p>
                <p className="text-2xl font-bold text-white tracking-tight font-mono mb-1">
                    ${balance}
                </p>
                
                <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${isDebit ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    <ArrowUpRight size={10} />
                    {isDebit ? '8.2%' : '12.5%'}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">Holder</p>
                        <p className="text-[10px] font-semibold text-white/80 tracking-wider uppercase">{holder}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">Valid</p>
                        <p className="text-[10px] font-semibold text-white/80 font-mono">{expiry}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-0.5">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="w-1 h-1 rounded-full bg-white/25"></div>
                            ))}
                        </div>
                    ))}
                    <span className="text-[10px] font-mono text-white/60 ml-1">{number}</span>
                </div>

                <div className="absolute bottom-4 right-4 opacity-70">
                    {isDebit ? (
                        <div className="flex items-center gap-0.5">
                            <div className="w-5 h-5 rounded-full bg-red-500/80"></div>
                            <div className="w-5 h-5 rounded-full bg-yellow-500/80 -ml-2.5"></div>
                        </div>
                    ) : (
                        <svg className="h-5 w-auto" viewBox="0 0 80 26" fill="none">
                            <path d="M33.3 25.2L37.8 0.8H43.2L38.7 25.2H33.3ZM60.9 1.3C59.7 0.9 57.8 0.5 55.4 0.5C49.9 0.5 46.1 3.2 46.1 7.1C46.1 9.8 48.5 11.3 50.3 12.2C52.2 13.1 52.9 13.7 52.9 14.5C52.9 15.7 51.4 16.3 50 16.3C47.8 16.3 46.6 16 44.9 15.3L44.2 15L43.4 19.9C44.9 20.6 47.6 21.2 50.4 21.2C56.3 21.2 60 18.6 60 14.4C60 12.3 58.6 10.7 55.5 9.4C53.8 8.6 52.8 8 52.8 7.1C52.8 6.3 53.7 5.5 55.8 5.5C57.8 5.5 59.3 5.9 60.4 6.3L61 6.6L61.8 1.8L60.9 1.3ZM73.3 0.8H68.9C67.5 0.8 66.5 1.2 65.9 2.5L56.9 25.2H62.8L64 21.8H71L71.6 25.2H76.8L73.3 0.8ZM65.5 17.2C65.9 16 68.2 9.8 68.2 9.8C68.2 9.9 68.8 8.3 69.1 7.4L69.5 9.3L71.1 17.2H65.5ZM26.9 0.8L21.6 17.3L21 14.4C19.8 10.5 16.2 6.3 12.2 4.2L16.9 25.2H22.9L31.9 0.8H26.9Z" fill="white"/>
                            <path d="M18.3 0.8H8.1L8 1.3C14.9 2.9 19.6 6.9 21.5 11.8L19.4 2.5C19.1 1.2 18.1 0.8 16.8 0.8H18.3Z" fill="#F7B600"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ─── Modern Professional Footer ─── */
const ModernFooter = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                                <WalletCards className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">FinTrack Pro</h3>
                                <p className="text-xs text-slate-400 font-medium">Personal Finance Management</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-md">
                            Empowering individuals to take control of their financial future through intelligent tracking, 
                            insightful analytics, and seamless money management.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">React 18</span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">Tailwind CSS</span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">Node.js</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/income" className="hover:text-emerald-400 transition-colors">Income</Link></li>
                            <li><Link to="/expense" className="hover:text-emerald-400 transition-colors">Expenses</Link></li>
                            <li><Link to="/category" className="hover:text-emerald-400 transition-colors">Categories</Link></li>
                            <li><Link to="/filters" className="hover:text-emerald-400 transition-colors">Filters</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Connect</h4>
                        <div className="space-y-3">
                            <a href="mailto:roshanprakhar@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group">
                                <Mail size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                roshanprakhar@gmail.com
                            </a>
                            <a href="tel:+919508849293" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group">
                                <Phone size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                +91-9508849293
                            </a>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin size={14} className="text-slate-500" />
                                India
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <a href="https://github.com/Roshan-prakhar" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400">
                                    <Github size={16} />
                                </a>
                                <a href="https://linkedin.com/in/Roshan-prakhar" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400">
                                    <Linkedin size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Shield size={12} className="text-emerald-500" />
                        <span>© {currentYear} FinTrack Pro. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Sparkles size={12} className="text-amber-500" />
                            Crafted with precision
                        </span>
                        <span className="flex items-center gap-1">
                            <Globe size={12} className="text-blue-500" />
                            v1.0.0
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FinmaHero = () => (
    <section className="relative overflow-hidden pt-16 pb-28 px-6" style={{ background: '#f0f4f0' }}>
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-10 translate-x-1/3 -translate-y-1/4 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 -translate-x-1/3 translate-y-1/4 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #15803d, transparent)' }}></div>

        <GlassCard 
            type="debit"
            balance="12,832.08"
            holder="ROSHAN PRAKHAR"
            number="9128"
            expiry="12/28"
            gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)"
            accentColor="#10b981"
            top="24px"
            left="68%"
            rotate="6deg"
            scale="1"
        />
        <GlassCard 
            type="credit"
            balance="4,200.00"
            holder="ROSHAN PRAKHAR"
            number="4582"
            expiry="09/27"
            gradient="linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)"
            accentColor="#f59e0b"
            top="180px"
            left="78%"
            rotate="-4deg"
            scale="0.9"
        />

        <div className="hidden lg:block absolute right-36 top-52 w-44 rounded-2xl p-3.5 shadow-xl -rotate-2 z-10 bg-white/80 backdrop-blur-sm border border-white/50">
            <p className="text-xs text-gray-400 mb-2 font-medium">Quick Stats</p>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-600">Income</span>
                <span className="text-xs font-semibold text-emerald-600">+$4,200</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Expense</span>
                <span className="text-xs font-semibold text-rose-500">-$1,840</span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-400">Live updates</span>
            </div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#16a34a' }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#16a34a' }}></div>
                Smart Personal Finance Tracker
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Take Control of{' '}
                <span className="relative inline-block">
                    <span style={{ color: '#16a34a' }}>Your Money</span>
                    <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                        <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
                Track income, monitor expenses, and gain insights into your financial health — all in one beautifully simple dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/signup" className="px-7 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
                    style={{ background: '#16a34a', boxShadow: '0 8px 24px rgba(22,163,74,0.35)' }}>
                    Get Started Free
                </Link>
                <Link to="/login" className="px-7 py-3.5 text-sm font-semibold text-gray-700 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm">
                    Sign In →
                </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-emerald-600" />
                    End-to-end encrypted
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Free to get started
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Trusted by thousands
                </div>
            </div>
        </div>
    </section>
);

const FinmaFeatures = () => {
    const features = [
        { icon: <BarChart3 size={24} className="text-white" />, bg: '#16a34a', title: 'Smart Analytics', desc: 'Visualize your spending patterns with beautiful charts and real-time insights.' },
        { icon: <TrendingUp size={24} className="text-white" />, bg: '#1d4ed8', title: 'Income Tracking', desc: 'Log every income source and watch your earnings grow over time.' },
        { icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>, bg: '#dc2626', title: 'Expense Control', desc: 'Categorize expenses and set limits to keep your spending in check.' },
        { icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>, bg: '#7c3aed', title: 'Advanced Filters', desc: 'Search and filter transactions by date, type, category, or keyword.' },
        { icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, bg: '#0891b2', title: 'Export Reports', desc: 'Download your financial data as Excel files or get reports via email.' },
        { icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>, bg: '#d97706', title: 'Custom Categories', desc: 'Create and manage your own income and expense categories.' },
    ];

    return (
        <section id="features" className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
                        style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#16a34a' }}>
                        Everything you need
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful features, simple interface</h2>
                    <p className="text-gray-500 max-w-md mx-auto text-base">All the tools you need to master your personal finances in one place.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <div key={i} className="rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 group">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105" style={{ background: f.bg }}>
                                {f.icon}
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── App Capabilities Section (replaces fake stats) ─── */
const AppCapabilities = () => (
    <section className="py-16 px-6" style={{ background: '#f0f4f0' }}>
        <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #16a34a, transparent 60%), radial-gradient(circle at 80% 20%, #22c55e, transparent 50%)' }}></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Why Choose FinTrack Pro?</h2>
                        <p className="text-sm text-gray-400 max-w-md mx-auto">Built for personal use with enterprise-grade features and bank-level security.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Lock, title: 'Secure', desc: 'End-to-end encryption' },
                            { icon: Eye, title: 'Transparent', desc: 'Clear visual insights' },
                            { icon: Zap, title: 'Fast', desc: 'Real-time updates' },
                            { icon: Wallet, title: 'Free', desc: 'No hidden charges' },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                                    <item.icon size={22} className="text-emerald-400" />
                                </div>
                                <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FinmaCTA = () => (
    <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to take control?</h2>
            <p className="text-gray-400 mb-8">Start managing your personal finances with precision and clarity.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: '#16a34a', boxShadow: '0 8px 24px rgba(22,163,74,0.35)' }}>
                Start for Free
                <ChevronRight size={18} />
            </Link>
        </div>
    </section>
);

const LandingPage = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
                .animate-marquee { animation: marquee 25s linear infinite; }
                .animate-marquee:hover { animation-play-state: paused; }
                @keyframes shine { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
            `}</style>

            <EnhancedHeader />
            <StockTicker />
            <main>
                <FinmaHero />
                <FinmaFeatures />
                <AppCapabilities />
                <FinmaCTA />
            </main>
            <ModernFooter />
        </div>
    );
};

export default LandingPage;