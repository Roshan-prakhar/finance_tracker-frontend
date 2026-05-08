import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Coins, TrendingDown, TrendingUp, Wallet, WalletCards} from "lucide-react";
import {addThousandsSeparator} from "../util/util.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

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

    return (
        <Dashboard activeMenu="Dashboard">
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-9 h-9 border-2 border-green-100 border-t-green-500 rounded-full animate-spin mb-3"></div>
                    <p className="text-sm text-gray-400">Loading dashboard...</p>
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-5">

                        {/* Total Balance — dark card */}
                        <div className="rounded-2xl p-5 relative overflow-hidden"
                            style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'}}>
                            <div className="absolute inset-0 opacity-20"
                                style={{backgroundImage: 'radial-gradient(circle at 75% 15%, #16a34a 0%, transparent 55%)'}}></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Balance</span>
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <WalletCards className="w-4 h-4 text-green-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-white mb-1.5">
                                    &#8377;{addThousandsSeparator(dashboardData?.totalBalance || 0)}
                                </p>
                                <div className="flex items-center gap-1 text-xs font-medium text-green-400">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span>Available funds</span>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-5 flex opacity-20">
                                <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
                                <div className="w-6 h-6 rounded-full bg-red-400 -ml-3"></div>
                            </div>
                        </div>

                        {/* Total Income */}
                        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Income</span>
                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                    <Wallet className="w-4 h-4 text-green-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1.5">
                                &#8377;{addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            </p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Money received</span>
                            </div>
                        </div>

                        {/* Total Expense */}
                        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Expense</span>
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                    <Coins className="w-4 h-4 text-red-500" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1.5">
                                &#8377;{addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            </p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-red-500">
                                <TrendingDown className="w-3.5 h-3.5" />
                                <span>Money spent</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts & transactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                        />
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />
                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />
                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />
                    </div>
                </>
            )}
        </Dashboard>
    );
};

export default Home;