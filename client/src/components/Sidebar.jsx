import { NavLink } from "react-router-dom";
import {
    Home,
    MousePointer2,
    Newspaper,
    TextCursorIcon,
    Users2,
} from "lucide-react";

const NAVLINKS = {
    dashboard: {
        name: "dashboard",
        icon: <Home size={16} />,
    },
    suppliers: {
        name: "suppliers",
        icon: <Users2 size={16} />,
    },

    invoices: {
        name: "invoices",
        icon: <Newspaper size={16} />,
    },
};

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen border-r border-secondary bg-background  p-4">
<<<<<<< HEAD
            <h1 className="my-10">Smart Invoices</h1>
=======
            <div className="mb-16 border-b border-secondary pb-4 mt-10 flex items-center font-semibold text-xl gap-2">
                <div className="p-2 bg-secondary border border-primary/30 rounded flex items-center justify-center">
                    <MousePointer2 size={20} className="stroke-primary " />
                </div>
                <h1 className="">
                    <span>Invoice</span>
                    <span className="text-primary">Pilot</span>
                </h1>
            </div>

>>>>>>> 36c1772d65c2c7aa25c50d1cad3796a4b392e309
            {Object.entries(NAVLINKS).map(([key, link]) => (
                <NavLink
                    key={key}
                    to={`/${key === "dashboard" ? "" : key}`}
                    className="  flex items-center p-3   gap-4 rounded text-secondary-foreground hover:text-primary hover:bg-primary/10 mb-1"
                >
                    {link.icon}
                    {link.name}
                </NavLink>
            ))}
        </aside>
    );
};

export default Sidebar;
