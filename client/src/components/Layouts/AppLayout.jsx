import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

const AppLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header />

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
