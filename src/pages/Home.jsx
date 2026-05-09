import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Coins, Wallet, WalletCards, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, Landmark, Activity, Shield, Globe, Zap, BarChart3, ChevronRight, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, BookOpen, Award, Calendar, Users, Clock, Sparkles, Target, Bell, Download} from "lucide-react";
import {addThousandsSeparator} from "../util/util.js";
import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

// Stock Ticker Data - Simulated NSE/BSE style
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

// Stock Ticker Component
const StockTicker = () => {
    return (
        <div className="w-full bg-slate-900 border-y border-slate-800 overflow-hidden py-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
            
            <div className="flex animate-marquee whitespace-nowrap">
                {[...stockData, ...stockData, ...stockData].map((stock, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-6 border-r border-slate-800">
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
                        <div className={`w-12 h-6 rounded ${stock.change >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'} flex items-center justify-center`}>
                            <Activity size={12} className={stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Premium ATM Card Component with Glassmorphism
const PremiumCard = ({ type, balance, change, holder, number, expiry, gradient, accentColor }) => {
    const isDebit = type === 'debit';
    
    return (
        <div className={`relative rounded-3xl p-6 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl cursor-pointer group ${isDebit ? 'min-h-[280px]' : 'min-h-[240px]'}`}
            style={{
                background: gradient,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
            }}>
            
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 animate-pulse"
                style={{background: `radial-gradient(circle, ${accentColor}, transparent)`, filter: 'blur(40px)'}}></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 animate-pulse"
                style={{background: `radial-gradient(circle, #fff, transparent)`, filter: 'blur(40px)', animationDelay: '1s'}}></div>
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 3s ease-in-out infinite',
                }}></div>

            <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                }}></div>

            <div className="absolute top-6 left-6 w-12 h-9 rounded-lg opacity-80"
                style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)',
                }}>
                <div className="absolute inset-0 rounded-lg border border-amber-700/20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-5 border border-amber-800/30 rounded-sm"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-amber-800/20"></div>
            </div>

            <div className="absolute top-6 right-6 opacity-40">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M9 15c0-2.8 2.2-5 5-5M7 19c0-4.4 3.6-8 8-8M5 23c0-6 4.9-11 11-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between pt-12">
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${isDebit ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                        {isDebit ? 'Platinum Debit' : 'World Elite Credit'}
                    </span>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-medium">Available Balance</p>
                    <p className="text-4xl font-bold text-white tracking-tight font-mono">
                        ${addThousandsSeparator(balance || 0)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${change >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                            {change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {Math.abs(change)}%
                        </div>
                        <span className="text-xs text-white/40">vs last month</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-1">
                                {[...Array(4)].map((_, j) => (
                                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                                ))}
                            </div>
                        ))}
                        <span className="ml-2 text-sm font-mono text-white/70 tracking-widest font-semibold">{number}</span>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Card Holder</p>
                            <p className="text-sm font-semibold text-white/90 tracking-wider uppercase">{holder}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Valid Thru</p>
                            <p className="text-sm font-semibold text-white/90 font-mono">{expiry}</p>
                        </div>
                        
                        <div className="ml-4 opacity-80">
                            {isDebit ? (
                                <div className="flex items-center gap-1">
                                    <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                                    <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3"></div>
                                </div>
                            ) : (
                                <svg className="h-8 w-auto" viewBox="0 0 80 26" fill="none">
                                    <path d="M33.3 25.2L37.8 0.8H43.2L38.7 25.2H33.3ZM60.9 1.3C59.7 0.9 57.8 0.5 55.4 0.5C49.9 0.5 46.1 3.2 46.1 7.1C46.1 9.8 48.5 11.3 50.3 12.2C52.2 13.1 52.9 13.7 52.9 14.5C52.9 15.7 51.4 16.3 50 16.3C47.8 16.3 46.6 16 44.9 15.3L44.2 15L43.4 19.9C44.9 20.6 47.6 21.2 50.4 21.2C56.3 21.2 60 18.6 60 14.4C60 12.3 58.6 10.7 55.5 9.4C53.8 8.6 52.8 8 52.8 7.1C52.8 6.3 53.7 5.5 55.8 5.5C57.8 5.5 59.3 5.9 60.4 6.3L61 6.6L61.8 1.8L60.9 1.3ZM73.3 0.8H68.9C67.5 0.8 66.5 1.2 65.9 2.5L56.9 25.2H62.8L64 21.8H71L71.6 25.2H76.8L73.3 0.8ZM65.5 17.2C65.9 16 68.2 9.8 68.2 9.8C68.2 9.9 68.8 8.3 69.1 7.4L69.5 9.3L71.1 17.2H65.5ZM26.9 0.8L21.6 17.3L21 14.4C19.8 10.5 16.2 6.3 12.2 4.2L16.9 25.2H22.9L31.9 0.8H26.9Z" fill="white"/>
                                    <path d="M18.3 0.8H8.1L8 1.3C14.9 2.9 19.6 6.9 21.5 11.8L19.4 2.5C19.1 1.2 18.1 0.8 16.8 0.8H18.3Z" fill="#F7B600"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quick Action Card Component
const QuickActionCard = ({ icon: Icon, label, value, trend, color, onClick }) => (
    <div onClick={onClick} className="group relative rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150`} 
            style={{background: `radial-gradient(circle, ${color}, transparent)`}}></div>
        
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{backgroundColor: `${color}15`}}>
                    <Icon size={20} style={{color: color}} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">${addThousandsSeparator(value || 0)}</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

// Modern Professional Footer
const ModernFooter = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="mt-12 bg-slate-900 border-t border-slate-800">
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
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                React 18
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                                Tailwind CSS
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                                Node.js
                            </span>
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
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400">
                                    <Github size={16} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400">
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

const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) setDashboardData(response.data);
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDashboardData(); }, []);

    const balanceChange = 8.2;
    const incomeChange = 12.5;

    return (
        <Dashboard activeMenu="Dashboard">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                @keyframes shine {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>

            <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                            <p className="text-sm text-gray-400 mt-1">Here's what's happening with your money today</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 text-xs text-gray-500 font-medium shadow-sm">
                            <Calendar size={14} className="text-emerald-500" />
                            {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                        </div>
                    </div>
                    <StockTicker />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-3 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm text-gray-400">Loading your dashboard...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <PremiumCard 
                                type="debit"
                                balance={dashboardData?.totalBalance || 0}
                                change={balanceChange}
                                holder="ROSHAN PRAKHAR"
                                number="9128"
                                expiry="12/28"
                                gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e293b 100%)"
                                accentColor="#10b981"
                            />
                            <PremiumCard 
                                type="credit"
                                balance={dashboardData?.totalIncome || 0}
                                change={incomeChange}
                                holder="ROSHAN PRAKHAR"
                                number="4582"
                                expiry="09/27"
                                gradient="linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #3730a3 100%)"
                                accentColor="#f59e0b"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <QuickActionCard 
                                icon={Wallet}
                                label="Total Balance"
                                value={dashboardData?.totalBalance || 0}
                                trend={8.2}
                                color="#10b981"
                                onClick={() => navigate('/wallet')}
                            />
                            <QuickActionCard 
                                icon={TrendingUp}
                                label="Total Income"
                                value={dashboardData?.totalIncome || 0}
                                trend={12.5}
                                color="#3b82f6"
                                onClick={() => navigate('/income')}
                            />
                            <QuickActionCard 
                                icon={ArrowUpRight}
                                label="Total Expense"
                                value={dashboardData?.totalExpense || 0}
                                trend={-2.4}
                                color="#ef4444"
                                onClick={() => navigate('/expense')}
                            />
                            <QuickActionCard 
                                icon={BarChart3}
                                label="Net Savings"
                                value={(dashboardData?.totalIncome || 0) - (dashboardData?.totalExpense || 0)}
                                trend={15.3}
                                color="#8b5cf6"
                                onClick={() => navigate('/analytics')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <RecentTransactions
                                    transactions={dashboardData?.recentTransactions}
                                    onMore={() => navigate("/expense")}
                                />
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <FinanceOverview
                                    totalBalance={dashboardData?.totalBalance || 0}
                                    totalIncome={dashboardData?.totalIncome || 0}
                                    totalExpense={dashboardData?.totalExpense || 0}
                                />
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <Transactions
                                    transactions={dashboardData?.recent5Expenses || []}
                                    onMore={() => navigate("/expense")}
                                    type="expense"
                                    title="Recent Expenses"
                                />
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <Transactions
                                    transactions={dashboardData?.recent5Incomes || []}
                                    onMore={() => navigate("/income")}
                                    type="income"
                                    title="Recent Incomes"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default Home;