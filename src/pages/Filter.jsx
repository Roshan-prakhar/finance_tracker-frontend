import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Search} from "lucide-react";
import {useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
    useUser();
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });
            console.log('transactions: ', response.data);
            setTransactions(response.data);
        }catch (error) {
            console.error('Failed to fetch transactions: ', error);
            toast.error(error.message || "Failed to fetch transactions. Please try again.");
        }finally {
            setLoading(false);
        }

    }

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Filter Transactions</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Search and filter your income &amp; expenses</p>
                    </div>
                </div>

                {/* Filter Card */}
                <div className="card mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Apply Filters</h5>
                    <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5" htmlFor="type">Type</label>
                            <select value={type} id="type" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setType(e.target.value)}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="startdate" className="block text-xs font-medium text-gray-500 mb-1.5">Start Date</label>
                            <input value={startDate} id="startdate" type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setStartDate(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="enddate" className="block text-xs font-medium text-gray-500 mb-1.5">End Date</label>
                            <input value={endDate} id="enddate" type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setEndDate(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="sortfield" className="block text-xs font-medium text-gray-500 mb-1.5">Sort By</label>
                            <select value={sortField} id="sortfield" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setSortField(e.target.value)}>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sortorder" className="block text-xs font-medium text-gray-500 mb-1.5">Order</label>
                            <select value={sortOrder} id="sortorder" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setSortOrder(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="keyword" className="block text-xs font-medium text-gray-500 mb-1.5">Keyword</label>
                            <div className="flex gap-2">
                                <input value={keyword} id="keyword" type="text" placeholder="Search..." className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all" onChange={e => setKeyword(e.target.value)} />
                                <button
                                    onClick={handleSearch}
                                    className="px-3 py-2.5 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
                                >
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results Card */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-semibold text-gray-900">
                            Results {transactions.length > 0 && <span className="text-gray-400 font-normal">({transactions.length})</span>}
                        </h5>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3"></div>
                            <p className="text-sm text-gray-400">Loading transactions...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                                <Search className="w-6 h-6 text-gray-300" />
                            </div>
                            <p className="text-sm text-gray-400 mb-1">No results found</p>
                            <p className="text-xs text-gray-300">Apply filters above and click search</p>
                        </div>
                    ) : (
                        <div>
                            {transactions.map((transaction) => (
                                <TransactionInfoCard
                                    key={transaction.id}
                                    title={transaction.name}
                                    icon={transaction.icon}
                                    date={moment(transaction.date).format('Do MMM YYYY')}
                                    amount={transaction.amount}
                                    type={type}
                                    hideDeleteBtn
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Dashboard>
    )
}

export default Filter;