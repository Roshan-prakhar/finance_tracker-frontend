import { useState, useRef, useEffect, useContext } from "react";
import {User, LogOut, X, Menu} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // Add event listener when dropdown is open
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between gap-5 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-30">
            {/* Left side - Menu button and title */}
            <div className="flex items-center gap-4">
                <button
                    className="block lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200"
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                >
                    {openSideMenu ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </button>

                <div className="flex items-center gap-2.5">
                    <img src={assets.logo} alt="logo" className="h-9 w-9" />
                    <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Money Manager</span>
                </div>
            </div>

            {/* Right side - Avatar dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:ring-2 hover:ring-purple-200"
                >
                    {user?.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt="profile" className="w-10 h-10 rounded-full object-cover"/>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                        </div>
                    )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-1 z-50 animate-fade-in">
                        {/* User info section */}
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-purple-50 flex-shrink-0">
                                    {user?.profileImageUrl ? (
                                        <img src={user.profileImageUrl} alt="profile" className="w-full h-full object-cover" />
                                    ): (
                                        <User className="w-4 h-4 text-purple-600"/>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user?.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown options */}
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-lg mx-1"
                                 style={{width: 'calc(100% - 8px)'}}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[65px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-20 animate-fade-in">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;
