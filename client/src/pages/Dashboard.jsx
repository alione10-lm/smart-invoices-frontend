import { CheckCheck, DollarSign, File, Hourglass, } from "lucide-react";
import '../styles/dashboard.css';
import StatsCard from "../components/StatsCard";

const dummyData = {
    success: true,
    message: "Success",
    data: {
        supplierId: "69dcaf8815d4b5705d2c147e",
        supplierName: "mch Supplies",
        totalInvoices: 3,
        totalAmount: 9502.25,
        totalPaid: 945,
        totalRemaining: 8557.25,
        percentage: 0,
        invoicesByStatus: {
            unpaid: 2,
            partially_paid: 1,
            paid: 0,
        },
    },
};

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning ☀";
    if (h < 18) return "Good Afternoon 🌤";
    return "Good Evening 🌙";
};

const getDate = () => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
};

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">

            <div className="dashboard-header">
                <div className="dashboard-header-left">
                    <p className="dashboard-date">{getDate()}</p>
                    <h1 className="dashboard-greeting">{getGreeting()}</h1>
                    <p className="dashboard-sub">Here's What's Happening With Your Invoices Today.</p>
                </div>
            </div>

            <div className="stats-grid">
                <StatsCard
                    title="Total Invoices"
                    value={dummyData.data.totalInvoices}
                    icon={<File />}
                />
                <StatsCard
                    title="Total Amount"
                    value={`$${dummyData.data.totalAmount.toFixed(2)}`}
                    icon={<DollarSign />}
                />
                <StatsCard
                    title="Total Paid"
                    value={`$${dummyData.data.totalPaid.toFixed(2)}`}
                    icon={<CheckCheck />}
                />
                <StatsCard
                    title="Total Remaining"
                    value={`$${dummyData.data.totalRemaining.toFixed(2)}`}
                    icon={<Hourglass />}
                />
            </div>

        </div>
    );
};

export default Dashboard;