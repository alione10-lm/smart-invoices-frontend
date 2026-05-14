import { AppError } from "../middlewares/errHandler.js";
import Invoices from "../models/Invoice.js";
import Payments from "../models/Payment.js";
import Suppliers from "../models/Supplier.js";
import { invoiceStatus } from "../utils/InvoiceStatus.js";

export const createInvoice_s = async (userId, data) => {
    const supplier = await Suppliers.findById(data.supplierId);

    if (!supplier) {
        throw new AppError("supplier not found", 404);
    }

    if (!supplier.userId.equals(userId)) {
        throw new AppError(
            "Forbidden. This supplier does not belong to you.",
            403,
        );
    }

    const invoice = await Invoices.create({
        ...data,
        userId,
    });
    return invoice;
};

export const updateInvoice_s = async (invoice, data) => {
    const totalpaid = await Payments.aggregate([
        { $match: { invoiceId: invoice.id, userId: invoice.userId } },
        { $group: { _id: null, totale: { $sum: "$amount" } } },
    ]);

    if (totalpaid.totale >= invoice.amount) {
        throw new AppError(
            "Cannot modify an invoice that is already fully paid",
            422,
        );
    }

    Object.keys(data).forEach((feild) => {
        invoice[feild] = data[feild];
    });

    if (data.supplierId) {
        const supplier = await Suppliers.findById(data.supplierId);

        if (!supplier) {
            throw new AppError("supplier not found", 404);
        }

        if (!supplier.userId.equals(invoice.userId)) {
            throw new AppError(
                "Forbidden. This supplier does not belong to you.",
                403,
            );
        }
    }

    invoice.status = invoiceStatus(
        invoice.amount,
        invoice.dueDate,
        totalpaid.totale,
    );

    const invoiceUpdated = await Invoices.findByIdAndUpdate(
        { _id: invoice.id },
        invoice,
        { returnDocument: "after" },
    );

    return invoiceUpdated;
};

// dont forgout testing update after complate Payment service

export const deleteInvoice_s = async (invoiceId, userId) => {
    const paymentCount = await Payments.countDocuments({ invoiceId });

    if (paymentCount > 0) {
        return new AppError(
            `cannot delete invoice it has ${paymentCount} payment recorded`,
            422,
        );
    }

    await Invoices.findByIdAndDelete(invoiceId);

    return { message: "invoice is deleted successfully" };
};

export const listInvoice_s = async (userId, pagination) => {
    const limit = parseInt(pagination.limit) || 15;
    const page = parseInt(pagination.page) || 1;
    const skip = (page - 1) * limit;

    const filter = {};

    if (pagination.status) filter.status = pagination.status;
    if (pagination.supplierId) filter.supplierId = pagination.supplierId;

    const invoices = await Invoices.find({ ...filter, userId })
        .limit(limit)
        .skip(skip)
        .sort({ createAt: -1 })
        .populate("supplierId", "name");

    const project = await Promise.all(
        invoices.map(async (inv) => {
            const payment = await Payments.find({ invoiceId: inv.id });

            const totalpaid = payment.reduce((sum, val) => sum + val.amount, 0);
            const remainingAmount = inv.amount - totalpaid;

            return {
                id: inv.id,
                supplierId: inv.supplierId,
                supplierName: inv.supplierId.name,
                dueDate: inv.dueDate,
                amount: inv.amount,
                status: inv.status,
                totalpaid,
                remainingAmount,
            };
        }),
    );

    return project;
};
