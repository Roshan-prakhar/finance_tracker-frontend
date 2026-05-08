import React from "react";
import {X} from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/30 backdrop-blur-sm animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-[90vh] animate-fade-in-up">
                <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-100 overflow-hidden">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>

                        <button
                            type="button"
                            className="text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600 rounded-lg text-sm w-8 h-8 flex justify-center items-center transition-all duration-200 cursor-pointer"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-5 md:p-6 text-gray-700 overflow-y-auto max-h-[70vh]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
