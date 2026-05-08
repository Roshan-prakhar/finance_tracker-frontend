import {useState} from "react";
import {AlertTriangle, LoaderCircle, Trash2} from "lucide-react";

const DeleteAlert = ({content, onDelete}) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="text-center py-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mb-6">{content}</p>
            <div className="flex justify-center gap-3">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-red-500/25'}`}
                    style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Deleting...
                        </>
                    ): (
                        <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;