import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus, FolderOpen, TrendingUp, TrendingDown, Sparkles} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) setCategoryData(response.data);
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategoryDetails(); }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;
        if (!name.trim()) { toast.error("Category Name is required"); return; }
        const isDuplicate = categoryData.some(c => c.name.toLowerCase() === name.trim().toLowerCase());
        if (isDuplicate) { toast.error("Category Name already exists"); return; }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add category.");
        }
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    };

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if (!name.trim()) { toast.error("Category Name is required"); return; }
        if (!id) { toast.error("Category ID is missing for update"); return; }
        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to update category.");
        }
    };

    const incomeCategories = categoryData.filter(c => c.type === 'income').length;
    const expenseCategories = categoryData.filter(c => c.type === 'expense').length;

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
                        <p className="text-sm text-gray-400 mt-1">Manage your income and expense categories</p>
                    </div>
                    <button onClick={() => setOpenAddCategoryModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{ background: '#16a34a', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}>
                        <Plus size={16} />
                        Add Category
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-2xl p-5 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #16a34a, transparent 70%)' }}></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <FolderOpen size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Total Categories</p>
                                <p className="text-2xl font-bold text-white">{categoryData.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <TrendingUp size={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Income Types</p>
                                <p className="text-2xl font-bold text-emerald-600">{incomeCategories}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                                <TrendingDown size={20} className="text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Expense Types</p>
                                <p className="text-2xl font-bold text-rose-500">{expenseCategories}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-2 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm text-gray-400">Loading categories...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />
                    </div>
                )}

                <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                <Modal onClose={() => { setOpenEditCategoryModal(false); setSelectedCategory(null); }}
                    isOpen={openEditCategoryModal} title="Update Category">
                    <AddCategoryForm initialCategoryData={selectedCategory} onAddCategory={handleUpdateCategory} isEditing={true} />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Category;