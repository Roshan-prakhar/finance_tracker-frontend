import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 sticky top-[61px] z-20 flex flex-col">
            {/* Navigation */}
            <nav className="flex-1 p-3 pt-4 space-y-0.5 overflow-y-auto">
                {SIDE_BAR_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <button
                            onClick={() => navigate(item.path)}
                            key={`menu_${index}`}
                            className={`cursor-pointer w-full flex items-center gap-3 text-sm font-medium py-2.5 px-3 rounded-xl transition-all duration-200
                                ${isActive
                                    ? "bg-green-600 text-white shadow-sm shadow-green-200/50"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
                                ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                            </div>
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* User profile at bottom */}
            <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                    <div className="relative flex-shrink-0">
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-green-600" />
                            </div>
                        )}
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName || "User"}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;