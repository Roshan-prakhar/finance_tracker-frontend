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
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-30">
            {/* Left side - Menu button and title */}
            <div className="flex items-center gap-4">
                <button
                    className="block lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
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
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">₹</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">Finve</span>
                </div>
            </div>

            {/* Right side - Avatar dropdown */}
            <div className="flex items-center gap-3">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl transition-all duration-200 hover:bg-gray-50"
                    >
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} alt="profile" className="w-9 h-9 rounded-full object-cover"/>
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                                <User className="w-4 h-4 text-green-600" />
                            </div>
                        )}
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.fullName}</p>
                            <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 py-1 z-50 animate-slide-down">
                            <div className="py-1 px-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600
                                     hover:bg-red-50 hover:text-red-600 transition-colors duration-150 rounded-lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[61px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-20 animate-fade-in">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Menubar;
