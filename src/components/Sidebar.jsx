import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-65px)] bg-white border-r border-gray-100 p-5 sticky top-[65px] z-20 flex flex-col">
            {/* User profile */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 pb-6 border-b border-gray-100">
                <div className="relative">
                    {user?.profileImageUrl ? (
                        <img src={user?.profileImageUrl || ""} alt="profile image" className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-100 ring-offset-2" />
                    ): (
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center ring-2 ring-purple-100 ring-offset-2">
                            <User className="w-7 h-7 text-purple-600" />
                        </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-center">
                    <h5 className="text-gray-900 font-semibold text-sm">{user?.fullName || ""}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{user?.email || ""}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {SIDE_BAR_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <button
                            onClick={() => navigate(item.path)}
                            key={`menu_${index}`}
                            className={`cursor-pointer w-full flex items-center gap-3 text-[14px] font-medium py-2.5 px-4 rounded-xl transition-all duration-200
                                ${isActive
                                    ? "text-white shadow-md shadow-purple-500/20"
                                    : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                                }`}
                            style={isActive ? { background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' } : {}}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    )
}

export default Sidebar;