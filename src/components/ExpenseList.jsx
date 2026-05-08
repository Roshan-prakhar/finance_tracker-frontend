import moment from "moment";
import {Download, Inbox, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-900">All Expenses</h5>
                <div className="flex items-center justify-end gap-2">
                    <button className="card-btn" onClick={onEmail}>
                        <Mail size={14} /> Email
                    </button>
                    <button className="card-btn" onClick={onDownload}>
                        <Download size={14} /> Download
                    </button>
                </div>
            </div>

            {(!transactions || transactions.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                        <Inbox className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 mb-1">No expense records yet</p>
                    <p className="text-xs text-gray-300">Add your first expense to see it here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                    {transactions.map((expense) => (
                        <TransactionInfoCard
                            key={expense.id}
                            title={expense.name}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
