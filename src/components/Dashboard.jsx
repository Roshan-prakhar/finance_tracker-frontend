import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const Dashboard = ({children, activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Menubar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden lg:block">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>

                    <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pb-8">{children}</div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;