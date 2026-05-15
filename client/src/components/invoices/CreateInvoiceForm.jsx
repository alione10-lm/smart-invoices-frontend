// CreateInvoiceForm.jsx

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const EMPTY_FORM = { supplierName: "", dueDate: "", amount: "" };

export function CreateInvoiceForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    const [suppliers, setSuppliers] = useState([]);

    const [supplierError, setSupplierError] = useState(null);
    const [loadingSuppliers, setLoadingSuppliers] = useState(true);

    const validate = () => {
        const e = {};
        if (!form.supplierName.trim()) e.supplierName = "Supplier is required";
        if (!form.dueDate) e.dueDate = "Due date is required";
        if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
            e.amount = "Enter a valid amount";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) return setErrors(e);
        onSubmit({
            supplierName: form.supplierName.trim(),
            dueDate: form.dueDate,
            amount: parseFloat(form.amount),
        });
        setForm(EMPTY_FORM);
        setErrors({});
    };

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const { data } = await getSuppliers();
                setSuppliers(data);
            } catch (error) {
                setSupplierError("Failed to load suppliers. Please try again.");
            } finally {
                setLoadingSuppliers(false);
            }
        };

        getSuppliers();
    }, []);

    return (
        <form
            className="flex flex-col gap-5 bg-background w-[45%] px-10 py-5 rounded border border-border"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="flex pb-3 mb-4 items-center justify-between w-full border-b border-border">
                <h1 className="text-lg  font-bold">Create Invoice</h1>
                <X
                    size={20}
                    className=" stroke-primary right-4 top-4 cursor-pointer"
                    onClick={onCancel}
                />
            </div>
            <Field label="Supplier" error={errors.supplierName}>
                <select
                    name="supplierName"
                    id=""
                    value={form.supplierName}
                    onChange={handleChange}
                    className="input"
                >
                    <option value="" disabled defaultValue={true}>
                        Select a supplier
                    </option>
                    {suppliers.map((supplier) => (
                        <option key={supplier} value={supplier}>
                            {supplier}
                        </option>
                    ))}
                </select>
            </Field>

            <Field label="Due Date" error={errors.dueDate}>
                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="input"
                />
            </Field>

            <Field label="Amount" error={errors.amount}>
                <div className="relative">
                    <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        $
                    </span>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="input"
                    />
                </div>
            </Field>

            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-4  cursor-pointer flex-1 py-2 bg-secondary text-secondary-foreground rounded text-sm font-medium transition-opacity hover:opacity-80"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    className="px-4 flex-1 cursor-pointer  py-2 bg-primary rounded text-sm font-semibold transition-opacity hover:opacity-90"
                >
                    Create Invoice
                </button>
            </div>
        </form>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
            >
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs" style={{ color: "var(--destructive)" }}>
                    {error}
                </p>
            )}
        </div>
    );
}
