import { NavLink } from "react-router-dom";
import { Home, Newspaper, Users2 } from "lucide-react";

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
            <h1 className="my-10">smart invoices</h1>
            {Object.entries(NAVLINKS).map(([key, link]) => (
                <NavLink
                    key={key}
                    to={`/${key === "dashboard" ? "" : key}`}
                    className="  flex items-center p-3   gap-4 rounded hover:bg-background/30 text-secondary-foreground hover:text-primary mb-1"
                >
                    {link.icon}
                    {link.name}
                </NavLink>
            ))}
        </aside>
    );
};

export default Sidebar;
