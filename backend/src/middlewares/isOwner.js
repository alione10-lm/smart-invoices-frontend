import Suppliers from "../models/Supplier.js";
import Invoices from "../models/Invoice.js";
import { forbidden, notFound, serverError } from "../utils/apiResponse.js";

import Payments from "../models/Payment.js";

export const verifySupplierOwnership = async (req, res, next) => {
    try {
        const supplier = await Suppliers.findById(req.params.id);


        if (!supplier) {
            return notFound(res, "supplier not found");
        }

        if (supplier.userId.toString() !== req.user.id) {
            return forbidden(res);
        }

        supplier.toObject();
        const invoises = await Invoices.find({supplierId: supplier._id})
        const invoiceCount = invoises.length

        req.supplier = {
            ...supplier.toObject(),
            invoises,
            invoiceCount
        };


        next();
    } catch (error) {
        serverError(res, error.message);
    }
};
export const verifyIvoiceOwnership = async (req, res, next) => {
    try {
        const invoice = await Invoices.findById(req.params.id).populate(
            "supplierId",
        );

        if (!invoice) {
            return notFound(res, "Invoice not found");
        }

        if (invoice.userId.toString() !== req.user.id) {
            return forbidden(res);
        }

        const payments = await getInvoicePayments(invoice._id);

        req.invoice = {
            ...invoice.toObject(),
            payments,
        };

        next();
    } catch (error) {
        serverError(res, error.message);
    }
};
const getInvoicePayments = async (invoiceId) => {
    try {
        const payments = await Payments.find({ invoiceId });
        return payments;
    } catch (error) {
        throw new Error("Error fetching payments: " + error.message);
    }
};
