import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Search, SlidersHorizontal, Filter, ArrowUpDown, CalendarDays, Tag, Type} from "lucide-react";
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
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setHasSearched(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type, startDate, endDate, keyword, sortField, sortOrder
            });
            setTransactions(response.data);
        } catch (error) {
            toast.error(error.message || "Failed to fetch transactions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all";
    const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Filter Transactions</h2>
                        <p className="text-sm text-gray-400 mt-1">Search and filter your income &amp; expenses</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-100 text-xs text-gray-400 font-medium shadow-sm">
                        <SlidersHorizontal size={13} />
                        Advanced Search
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-4 rounded-full bg-emerald-500"></div>
                        <h5 className="text-sm font-semibold text-gray-900">Apply Filters</h5>
                    </div>

                    <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div>
                            <label className={labelClass} htmlFor="type">
                                <Type size={12} className="inline mr-1" />Type
                            </label>
                            <select value={type} id="type" className={inputClass} onChange={e => setType(e.target.value)}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="startdate" className={labelClass}>
                                <CalendarDays size={12} className="inline mr-1" />Start Date
                            </label>
                            <input value={startDate} id="startdate" type="date" className={inputClass} onChange={e => setStartDate(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="enddate" className={labelClass}>
                                <CalendarDays size={12} className="inline mr-1" />End Date
                            </label>
                            <input value={endDate} id="enddate" type="date" className={inputClass} onChange={e => setEndDate(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="sortfield" className={labelClass}>
                                <ArrowUpDown size={12} className="inline mr-1" />Sort By
                            </label>
                            <select value={sortField} id="sortfield" className={inputClass} onChange={e => setSortField(e.target.value)}>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortorder" className={labelClass}>
                                <ArrowUpDown size={12} className="inline mr-1" />Order
                            </label>
                            <select value={sortOrder} id="sortorder" className={inputClass} onChange={e => setSortOrder(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="keyword" className={labelClass}>
                                <Tag size={12} className="inline mr-1" />Keyword
                            </label>
                            <div className="flex gap-2">
                                <input value={keyword} id="keyword" type="text" placeholder="Search..." className={`${inputClass} flex-1`} onChange={e => setKeyword(e.target.value)} />
                                <button onClick={handleSearch}
                                    className="px-3 py-2.5 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:opacity-90 active:scale-95"
                                    style={{ background: '#16a34a', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}>
                                    <Search size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-4 rounded-full bg-emerald-500"></div>
                            <h5 className="text-sm font-semibold text-gray-900">
                                Results
                                {transactions.length > 0 && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium text-white bg-emerald-500">
                                        {transactions.length}
                                    </span>
                                )}
                            </h5>
                        </div>
                        {transactions.length > 0 && (
                            <span className="text-xs text-gray-400">Showing {transactions.length} result{transactions.length !== 1 ? 's' : ''}</span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-14">
                            <div className="w-9 h-9 border-2 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
                            <p className="text-sm text-gray-400">Loading transactions...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-emerald-50">
                                <Search className="w-6 h-6 text-emerald-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                                {hasSearched ? "No results found" : "Start your search"}
                            </p>
                            <p className="text-xs text-gray-300">
                                {hasSearched ? "Try adjusting your filters" : "Apply filters above and click the search button"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
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
    );
};

export default Filter