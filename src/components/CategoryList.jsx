import {Inbox, Layers2, Pencil} from "lucide-react";

const CategoryList = ({categories, onEditCategory}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Category Sources</h4>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                        <Inbox className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 mb-1">No categories yet</p>
                    <p className="text-xs text-gray-300">Add your first category to get started</p>
                </div>
            ): (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all duration-200">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${category.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                                {category.icon ? (
                                    <img src={category.icon} alt={category.name} className="h-5 w-5" />
                                ): (
                                    <Layers2 className={`w-5 h-5 ${category.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                                )}
                            </div>

                            <div className="flex-1 flex items-center justify-between min-w-0">
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-800 font-medium truncate">
                                        {category.name}
                                    </p>
                                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full ${category.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {category.type}
                                    </span>
                                </div>
                                <button
                                    onClick={() => onEditCategory(category)}
                                    className="text-gray-300 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1.5 rounded-lg hover:bg-purple-50">
                                    <Pencil size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryList;