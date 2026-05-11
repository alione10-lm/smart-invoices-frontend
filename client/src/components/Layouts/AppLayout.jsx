import { Bell, LogOut } from "lucide-react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-secondary ">
            <Sidebar />

            <div className="flex-1">
                <header className="flex bg-background items-center justify-end h-20 border-l border-secondary gap-4 w-full p-4  ">
                    <Bell className="text-primary" size={16} />
                    <LogOut className="text-primary" size={16} />
                </header>
                <main className="flex-1 w-full p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
