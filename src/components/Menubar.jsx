import { useState, useRef, useEffect, useContext } from "react";
import { User, LogOut, X, Menu, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";

const PAGE_SUBTITLES = {
    "Dashboard": "Overview of your financial activity",
    "Income": "Track and manage all your income sources",
    "Expense": "Monitor and control your spending habits",
    "Category": "Manage your income and expense categories",
    "Filters": "Search and filter your transactions",
};

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { clearUser, user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between bg-white border-b border-gray-100 py-3 px-5 sm:px-6 sticky top-0 z-30 h-[61px]">
            {/* Left: hamburger (mobile) + page title */}
            <div className="flex items-center gap-3">
                <button
                    className="block lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                >
                    {openSideMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                {/* Mobile logo */}
                <div className="flex lg:hidden items-center gap-2">
                    <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">₹</span>
                    </div>
                    <span className="text-base font-bold text-gray-900">Finve</span>
                </div>
                {/* Desktop page title */}
                <div className="hidden lg:block">
                    <h2 className="text-sm font-bold text-gray-900 leading-tight">{activeMenu}</h2>
                    <p className="text-xs text-gray-400">{PAGE_SUBTITLES[activeMenu] || ""}</p>
                </div>
            </div>

            {/* Right: search + bell + divider + user */}
            <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200">
                    <Search className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200">
                    <Bell className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-1"></div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl transition-all duration-200 hover:bg-gray-50"
                    >
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                <User className="w-4 h-4 text-green-600" />
                            </div>
                        )}
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.fullName}</p>
                            <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 py-1 z-50 animate-slide-down">
                            <div className="py-1 px-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 rounded-lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile side menu overlay */}
            {openSideMenu && (
                <div className="fixed top-[61px] left-0 w-64 bottom-0 bg-white border-r border-gray-200 shadow-lg lg:hidden z-20 animate-slide-in-left">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;
