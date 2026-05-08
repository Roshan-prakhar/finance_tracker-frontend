import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 p-4 sticky top-[61px] z-20 flex flex-col">
            {/* User profile */}
            <div className="flex items-center gap-3 mx-2 mt-2 mb-6 pb-5 border-b border-gray-100">
                <div className="relative flex-shrink-0">
                    {user?.profileImageUrl ? (
                        <img src={user?.profileImageUrl || ""} alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                    ): (
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                        </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="min-w-0">
                    <h5 className="text-gray-900 font-semibold text-sm truncate">{user?.fullName || ""}</h5>
                    <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
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
                                    ? "bg-green-600 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            <item.icon className="w-[18px] h-[18px]" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    )
}

export default Sidebar;