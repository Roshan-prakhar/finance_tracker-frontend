import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useUser} from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import Dashboard from "../components/Dashboard.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import { Plus, TrendingDown, Receipt, Wallet, ArrowUpRight } from "lucide-react";

const Expense = () => {
    useUser();
    const navigate = useNavigate();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(`${API_ENDPOINTS.GET_ALL_EXPENSE}`);
            if (response.data) setExpenseData(response.data);
        } catch (error) {
            toast.error("Failed to fetch expense details.");
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.data) setCategories(response.data);
        } catch (error) {
            toast.error("Failed to fetch expense categories.");
        }
    };

    const handleAddExpense = async (expense) => {
        const { name, categoryId, amount, date, icon } = expense;
        if (!name.trim()) { toast.error("Name is required."); return; }
        if (!categoryId) { toast.error("Category is required."); return; }
        if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0."); return; }
        if (!date) { toast.error("Date is required."); return; }
        const today = new Date().toISOString().split('T')[0];
        if (date > today) { toast.error('Date cannot be in the future'); return; }
        try {
            await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, { name, categoryId, amount: Number(amount), date, icon });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
            fetchExpenseCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense.");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense.");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully!");
        } catch (error) {
            toast.error("Failed to download expense details. Please try again.");
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) toast.success("Email sent");
        } catch (e) {
            toast.error("Failed to email expense details. Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    const totalExpense = expenseData.reduce((sum, t) => sum + (t.amount || 0), 0);
    const highestExpense = expenseData.length > 0 ? Math.max(...expenseData.map(t => t.amount || 0)) : 0;

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
                        <p className="text-sm text-gray-400 mt-1">Monitor and control your spending habits</p>
                    </div>
                    <button onClick={() => setOpenAddExpenseModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
                        style={{ background: '#dc2626', boxShadow: '0 4px 14px rgba(220,38,38,0.25)' }}>
                        <Plus size={16} />
                        Add Expense
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-2xl p-5 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #dc2626, transparent 70%)' }}></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <Wallet size={20} className="text-rose-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Total Expenses</p>
                                <p className="text-2xl font-bold text-white">${totalExpense.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                <Receipt size={20} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">{expenseData.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                                <TrendingDown size={20} className="text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Highest Entry</p>
                                <p className="text-2xl font-bold text-gray-900">${highestExpense.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <ExpenseOverview transactions={expenseData} onExpenseIncome={() => setOpenAddExpenseModal(true)} />
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <ExpenseList transactions={expenseData} onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                            onDownload={handleDownloadExpenseDetails} onEmail={handleEmailExpenseDetails} />
                    </div>
                </div>

                <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
                    <AddExpenseForm onAddExpense={handleAddExpense} categories={categories} />
                </Modal>

                <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Expense">
                    <DeleteAlert content="Are you sure you want to delete this expense detail?" onDelete={() => deleteExpense(openDeleteAlert.data)} />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Expense;