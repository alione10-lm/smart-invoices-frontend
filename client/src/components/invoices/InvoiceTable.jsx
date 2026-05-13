import StatusTag from "./StatusTag";

import InvoiceMenu from "./InvoiceMenu";
import DropwDownItem from "./DrowpDownItem";
import { Pen, Trash, Eye, Hourglass } from "lucide-react";

const InvoiceTable = ({ invoices }) => {
    return (
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
                {invoices.map((invoice) => (
                    <tr key={invoice.id} className="">
                        <td className="px-6 py-4 font-medium">
                            {invoice.supplierName}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(invoice.dueDate).toLocaleDateString()}
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
                        <td className="px-6 py-4  ">
                            <span className="bg-amber-50 text-amber-700 p-1 rounded">
                                ${invoice.remainingAmount.toFixed(2)}
                                <Hourglass
                                    size={12}
                                    className="inline-block ml-1 stroke-amber-500"
                                />
                            </span>
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
    );
};

export default InvoiceTable;
