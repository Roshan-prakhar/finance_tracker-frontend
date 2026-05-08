import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import {Plus, TrendingUp, Receipt, Wallet, ArrowDownRight} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) setIncomeData(response.data);
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    };

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) setCategories(response.data);
        } catch(error) {
            toast.error(error.data?.message || "Failed to fetch income categories");
        }
    };

    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;
        if (!name.trim()) { toast.error("Please enter a name"); return; }
        if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0"); return; }
        if (!date) { toast.error("Please select a date"); return; }
        const today = new Date().toISOString().split('T')[0];
        if (date > today) { toast.error('Date cannot be in the future'); return; }
        if (!categoryId) { toast.error("Please select a category"); return; }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, { name, amount: Number(amount), date, icon, categoryId });
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to adding income");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    };

    const handleDownloadIncomeDetails = async() => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download income details successfully");
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to download income");
        }
    };

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200) toast.success("Income details emailed successfully");
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to email income");
        }
    };

    useEffect(() => { fetchIncomeDetails(); fetchIncomeCategories(); }, []);

    const totalIncome = incomeData.reduce((sum, t) => sum + (t.amount || 0), 0);
    const avgIncome = incomeData.length > 0 ? (totalIncome / incomeData.length).toFixed(0) : 0;

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Income</h1>
                        <p className="text-sm text-gray-400 mt-1">Track and manage all your income sources</p>
                    </div>
                    <button onClick={() => setOpenAddIncomeModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
                        style={{background: '#16a34a', boxShadow: '0 4px 14px rgba(22,163,74,0.3)'}}>
                        <Plus size={16} />
                        Add Income
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-2xl p-5 relative overflow-hidden"
                        style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'}}>
                        <div className="absolute inset-0 opacity-20"
                            style={{backgroundImage: 'radial-gradient(circle at 80% 20%, #16a34a, transparent 70%)'}}></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <Wallet size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Total Income</p>
                                <p className="text-2xl font-bold text-white">${totalIncome.toLocaleString()}</p>
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
                                <p className="text-2xl font-bold text-gray-900">{incomeData.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <TrendingUp size={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Avg per Entry</p>
                                <p className="text-2xl font-bold text-gray-900">${Number(avgIncome).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <IncomeList transactions={incomeData} onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                            onDownload={handleDownloadIncomeDetails} onEmail={handleEmailIncomeDetails} />
                    </div>
                </div>

                <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
                    <AddIncomeForm onAddIncome={(income) => handleAddIncome(income)} categories={categories} />
                </Modal>

                <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({show: false, data: null})} title="Delete Income">
                    <DeleteAlert content="Are you sure want to delete this income details?" onDelete={() => deleteIncome(openDeleteAlert.data)} />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Income;