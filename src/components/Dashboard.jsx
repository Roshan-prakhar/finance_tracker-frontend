import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const Dashboard = ({children, activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div className="min-h-screen bg-gray-50/60">
            <div className="flex">
                {/* Sidebar with logo header - desktop only */}
                {user && (
                    <div className="hidden lg:flex flex-col w-64 flex-shrink-0">
                        {/* Logo header matching menubar height */}
                        <div className="h-[61px] bg-white border-b border-r border-gray-100 flex items-center px-5 flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-sm shadow-green-200">
                                    <span className="text-white font-bold text-sm">₹</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900 tracking-tight">Finve</span>
                            </div>
                        </div>
                        <Sidebar activeMenu={activeMenu} />
                    </div>
                )}

                {/* Main content */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <Menubar activeMenu={activeMenu} />
                    {user && (
                        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-10">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;