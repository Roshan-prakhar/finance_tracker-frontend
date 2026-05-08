import {ArrowRight, Inbox} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({transactions, onMore}) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Recent Transactions</h4>

                <button className="card-btn" onClick={onMore}>
                    View All <ArrowRight size={14}/>
                </button>
            </div>

            <div className="mt-4">
                {(!transactions || transactions.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                            <Inbox className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-400">No recent transactions</p>
                    </div>
                ) : (
                    transactions.slice(0, 5).map(item => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default RecentTransactions;