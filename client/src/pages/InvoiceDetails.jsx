import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import DetailsSkeleton from "../components/invoices/InvoiceDetilsSkeleton";

const statusConfig = {
    paid: {
        dot: "bg-green-500",
        text: "text-green-400",
        bg: "bg-green-500/10",
        label: "paid",
    },
    unpaid: {
        dot: "bg-destructive",
        text: "text-destructive",
        bg: "bg-destructive/10",
        label: "unpaid",
    },
    partially_paid: {
        dot: "bg-yellow-500",
        text: "text-yellow-400",
        bg: "bg-yellow-500/10",
        label: "partially paid",
    },
};

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || statusConfig.unpaid;
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${cfg.bg} ${cfg.text}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
};

const fmt = (n) => `$${(n ?? 0).toFixed(2)}`;

const fmtDate = (d) =>
    d
        ? new Date(d).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
          })
        : "—";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInvoiceDetails = async () => {
            try {
                const { data } = await api.get(`/invoices/${id}`);
                await new Promise((r) => setTimeout(r, 1000));
                setInvoice(data);
                console.log(data.payments);
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getInvoiceDetails();
    }, [id]);

    if (loading) return <DetailsSkeleton />;

    if (error)
        return (
            <div className="flex-center flex-col gap-3 mt-20 text-muted-foreground">
                <p className="text-destructive font-medium">
                    Failed to load invoice.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Go back
                </button>
            </div>
        );

    const invoiceNumber = invoice.invoiceNumber ?? invoice._id ?? id;
    const total = invoice.amount ?? 0;
    const totalPaid = invoice.payments.reduce(
        (sum, p) => sum + (p.amount ?? 0),
        0,
    );
    const outstanding = invoice.amount - totalPaid;
    const payments = invoice.payments ?? [];
    const supplierName = invoice.supplierId?.name;

    return (
        <>
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 hover:text-primary transition-colors" />
                </button>
                <h1 className="text-2xl font-semibold">Invoice Detail</h1>
            </div>

            <div className="w-full rounded-lg border border-border bg-secondary p-6 mb-5">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-center w-14 h-14 rounded-full bg-chart-5 text-white font-bold text-lg shrink-0">
                            {}
                        </div>
                        <div>
                            <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-1">
                                Invoice · {invoiceNumber}
                            </p>
                            <h2 className="text-xl font-bold mb-1">
                                {supplierName}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {invoice.issuedDate
                                    ? `Issued ${fmtDate(invoice.issuedDate)} · `
                                    : ""}
                                Due {fmtDate(invoice.dueDate)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <StatusBadge status={invoice.status} />
                    </div>
                </div>

                <div className="border-t border-border mb-6" />

                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            Total amount
                        </p>
                        <p className="text-2xl font-bold">{fmt(total)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            Paid
                        </p>
                        <p className="text-2xl font-bold text-primary">
                            {fmt(totalPaid)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            Outstanding
                        </p>
                        <p className="text-2xl font-bold text-destructive">
                            {fmt(outstanding)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <div className="rounded-lg border border-border bg-secondary p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-bold">Payments</h3>
                        <button className="button_primary">
                            <Plus className="w-4 h-4" />
                            Add payment
                        </button>
                    </div>

                    {payments.length > 0 ? (
                        <div className="space-y-3">
                            {payments.map((p, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {p.mode ?? "Payment"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {fmtDate(p.paymentDate)}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-primary">
                                        {fmt(p.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-center py-14 text-sm text-muted-foreground">
                            No payments recorded yet.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Details;
