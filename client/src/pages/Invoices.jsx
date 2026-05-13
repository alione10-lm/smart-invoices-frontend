import { Eye, Filter, Pen, Plus, Trash } from "lucide-react";
import StatusTag from "../components/invoices/StatusTag";
import InvoiceMenu from "../components/invoices/InvoiceMenu";
import Modal from "../components/Modal";
import { CreateInvoiceForm } from "../components/invoices/CreateInvoiceForm";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

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
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [selectedFIlter, setSelectedFilter] = useState("All");

    return (
        <div className="">
            {showCreateModal && (
                <Modal>
                    <CreateInvoiceForm
                        onCancel={() => setShowCreateModal(false)}
                    />
                </Modal>
            )}
            <h1 className="text-lg  ">Invoices</h1>

            <div className="w-full mt-7 flex items-center gap-2">
                <Filter size={16} className="stroke-primary mr-4" />
                {["All", "Paid", "Partially Paid", "Unpaid"].map((status) => (
                    <button
                        key={status}
                        className="px-4 py-2 rounded border border-secondary cursor-pointer bg-secondary text-sm transition-colors"
                        onClick={() => setSelectedFilter(status)}
                        style={{
                            border:
                                selectedFIlter === status &&
                                "1px solid var(--primary)",
                            color:
                                selectedFIlter === status && "var(--primary)",
                        }}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <div className="flex w-full items-center justify-end">
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 flex items-center gap-1 text-sm rounded bg-primary/90 hover:bg-primary/80 cursor-pointer transition-colors duration-300 text-white mt-4"
                >
                    <Plus size={16} />
                    Create Invoice
                </button>
            </div>

            <div className="overflow-x-visible rounded shadow-lg bg-secondary border mt-4 border-secondary ">
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
                                        <DropwDownItem
                                            type="update"
                                            invoiceId={invoice.id}
                                        >
                                            <Pen size={13} />
                                            edit
                                        </DropwDownItem>
                                        <DropwDownItem
                                            type="delete"
                                            invoiceId={invoice.id}
                                        >
                                            <Trash size={13} />
                                            delete
                                        </DropwDownItem>
                                        <DropwDownItem invoiceId={invoice.id}>
                                            <Eye size={13} />
                                            view details
                                        </DropwDownItem>
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

const DropwDownItem = (props) => {
    const navigate = useNavigate();

    if (props.type === "delete") {
        return (
            <button className={props.className} onClick={props.handleDelete}>
                {props.children}
            </button>
        );
    }
    if (props.type === "update") {
        return (
            <button className={props.className} onClick={props.handleUpdate}>
                {props.children}
            </button>
        );
    }

    return (
        <button
            className={props.className}
            onClick={() => navigate(`/invoices/${props.invoiceId}`)}
        >
            {props.children}
        </button>
    );
};
export default Invoices;
