import { Bell, LogOut } from "lucide-react";

const Header = () => {
    return (
        <header className="flex bg-background  items-center justify-end h-16 border-b border-secondary gap-4 w-full p-4  ">
            <Bell className="text-primary" size={16} />
            <LogOut className="text-primary" size={16} />
        </header>
    );
};

export default Header;
