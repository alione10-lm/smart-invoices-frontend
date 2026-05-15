import { BrushCleaning, Filter, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { CreateInvoiceForm } from "../components/invoices/CreateInvoiceForm";
import { useState } from "react";

import { useEffect } from "react";
import { fetchInvoices } from "../services/invoicesAPI";
import InvoiceTable from "../components/invoices/InvoiceTable";
import InvoiceTableSkeleton from "../components/invoices/InvoiceTableSkeleton";

const Invoices = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedFIlter, setSelectedFilter] = useState("All");

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInvoices = async () => {
            setLoading(true);
            try {
                const { data } = await fetchInvoices();

                setInvoices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getInvoices();
    }, []);

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
                {loading ? (
                    <InvoiceTableSkeleton />
                ) : error ? (
                    <p className="p-4 text-center text-red-500">
                        Error: {error}
                    </p>
                ) : invoices.length === 0 && !loading ? (
                    <div className="p-4 flex items-center flex-col gap-4 min-h-80 justify-center text-center">
                        <BrushCleaning className="stroke-primary" size={50} />
                        <p className="text-secondary-foreground/50">
                            No i nvoices found.
                        </p>
                    </div>
                ) : (
                    <InvoiceTable invoices={invoices} />
                )}
            </div>
        </div>
    );
};

export default Invoices;
