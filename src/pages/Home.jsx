import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, Wallet, WalletCards} from "lucide-react";
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
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        }catch (error) {
            console.error('Something went wrong while fetching dashboard data:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);

    return (
        <Dashboard activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Overview of your financial activity</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm text-gray-400">Loading dashboard...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                            <InfoCard
                                icon={<WalletCards className="w-6 h-6" />}
                                label="Total Balance"
                                value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                                color="bg-purple-800"
                            />
                            <InfoCard
                                icon={<Wallet className="w-6 h-6" />}
                                label="Total Income"
                                value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                                color="bg-green-800"
                            />
                            <InfoCard
                                icon={<Coins className="w-6 h-6" />}
                                label="Total Expense"
                                value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                                color="bg-red-800"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
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
            </div>
        </Dashboard>
    )
}

export default Home;