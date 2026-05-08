import {Trash2, TrendingDown, TrendingUp, UtensilsCrossed} from "lucide-react";
import {addThousandsSeparator} from "../util/util.js";

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteBtn, onDelete}) => {
    const isIncome = type === 'income';
    return (
        <div className="group relative flex items-center gap-4 mt-1 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <div className={`w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 ${isIncome ? 'bg-green-50' : 'bg-red-50'}`}>
                {icon ? (
                    <img src={icon} alt={title} className="w-5 h-5" />
                ): (
                    <UtensilsCrossed className={`w-5 h-5 ${isIncome ? 'text-green-600' : 'text-red-600'}`} />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="min-w-0">
                    <p className="text-sm text-gray-800 font-medium truncate">{title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{date}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1 rounded-lg hover:bg-red-50">
                            <Trash2 size={16} />
                        </button>
                    )}

                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${isIncome ? 'bg-green-50 text-green-700': 'bg-red-50 text-red-700'}`}>
                        <span>
                            {isIncome ? '+': '-'} &#8377;{addThousandsSeparator(amount)}
                        </span>
                        {isIncome ? (
                            <TrendingUp size={14} />
                        ) : (
                            <TrendingDown size={14}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard;