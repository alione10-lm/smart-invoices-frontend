import { Pen, Plus, Trash } from "lucide-react";
import StatusTag from "../components/invoices/StatusTag";
import InvoiceMenu from "../components/invoices/InvoiceMenu";

const DUMMYDATA = {
    success: true,
    message: "Success",
    data: [
        {
            id: "69dcb0b115d4b5705d2c147f",
            supplierId: {
                _id: "69dcaf8815d4b5705d2c147e",
                name: "mch Supplies",
            },
            supplierName: "mch Supplies",
            dueDate: "2026-05-03T00:00:00.000Z",
            amount: 2500.75,
            status: "partially_paid",
            totalpaid: 945,
            remainingAmount: 1555.75,
        },
        {
            id: "69dcd30ef00e4b289b330c64",
            supplierId: {
                _id: "69dcaf8815d4b5705d2c147e",
                name: "mch Supplies",
            },
            supplierName: "mch Supplies",
            dueDate: "2026-06-01T00:00:00.000Z",
            amount: 3500.75,
            status: "paid",
            totalpaid: 0,
            remainingAmount: 3500.75,
        },
        {
            id: "69dcd31df00e4b289b330c65",
            supplierId: {
                _id: "69dcaf8815d4b5705d2c147e",
                name: "mch Supplies",
            },
            supplierName: "mch Supplies",
            dueDate: "2024-06-01T00:00:00.000Z",
            amount: 3500.75,
            status: "unpaid",
            totalpaid: 0,
            remainingAmount: 3500.75,
        },
    ],
};

const Invoices = () => {
    return (
        <div>
            <h1 className="text-lg  ">Invoices</h1>

            <div className="w-full mt-7 flex items-center gap-2">
                {["All", "Paid", "Partially Paid", "Unpaid"].map((status) => (
                    <button
                        key={status}
                        className="px-4 py-2 rounded  cursor-pointer bg-secondary text-sm transition-colors"
                    >
                        {status}
                    </button>
                ))}
            </div>
            <div className="flex w-full items-center justify-end">
                <button className="px-4 py-2 flex items-center gap-1 text-sm rounded bg-primary/90 hover:bg-primary/80 cursor-pointer transition-colors duration-300 text-white mt-4">
                    <Plus size={16} />
                    Create Invoice
                </button>
            </div>

            <div className="overflow-x-auto rounded shadow-lg bg-secondary border mt-4 border-secondary ">
                <table className="w-full text-sm text-left">
                    <thead className=" uppercase text-xs text-muted-foreground tracking-wider">
                        <tr>
                            {[
                                "Supplier",
                                "Due Date",
                                "Amount",
                                "Status",
                                "Total Paid",
                                "Remaining Amount",
                            ].map((h) => (
                                <th key={h} className="px-6 py-4  ">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border ">
                        {DUMMYDATA.data.map((invoice) => (
                            <tr key={invoice.id} className="">
                                <td className="px-6 py-4 font-medium">
                                    {invoice.supplierName}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        invoice.dueDate,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-semibold ">
                                    ${invoice.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusTag status={invoice.status} />
                                </td>
                                <td className="px-6 py-4 ">
                                    ${invoice.totalpaid.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 font-semibold ">
                                    ${invoice.remainingAmount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 font-semibold ">
                                    <InvoiceMenu>
                                        <button>
                                            <Pen size={13} />
                                            edit
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                console.log(e.target)
                                            }
                                        >
                                            <Trash size={13} />
                                            delete
                                        </button>
                                    </InvoiceMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
