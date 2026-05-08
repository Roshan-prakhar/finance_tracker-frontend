import {Download, Inbox, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [loading, setLoading] = useState(false);
    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        }finally {
            setLoading(false);
        }
    }
    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-900">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button disabled={loading} className="card-btn" onClick={handleEmail}>
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Emailing...
                            </>
                        ): (
                            <>
                                <Mail size={14} />
                                Email
                            </>
                        )}
                    </button>
                    <button disabled={loading} className="card-btn" onClick={handleDownload}>
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Downloading...
                            </>
                        ): (
                            <>
                                <Download size={14} />
                                Download
                            </>
                        )}
                    </button>
                </div>
            </div>

            {(!transactions || transactions.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                        <Inbox className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 mb-1">No income records yet</p>
                    <p className="text-xs text-gray-300">Add your first income to see it here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                    {transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default IncomeList;