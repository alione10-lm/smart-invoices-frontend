import { CheckCheck, DollarSign, File, Hourglass } from "lucide-react";
import { useEffect } from "react";

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

const Dashboard = () => {
    return (
        <div className="">
            <h1 className="text-sm font-bold mb-5 text-secondary-foreground">
                welcome back , Oussama
            </h1>
            <div className="w-full grid gap-4 grid-cols-4">
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

const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="p-4 bg-secondary rounded-lg shadow">
            {icon}
            <h2 className="text-sm font-medium text-muted-foreground mt-2">
                {title}
            </h2>
            <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
    );
};

export default Dashboard;
