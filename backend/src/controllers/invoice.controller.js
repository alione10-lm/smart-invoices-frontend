import mongoose from "mongoose";
import {
    createInvoice_s,
    deleteInvoice_s,
    listInvoice_s,
    updateInvoice_s,
} from "../services/invoice.service.js";
import { created, forbidden, ok, serverError } from "../utils/apiResponse.js";

export const createInvoice = async (req, res) => {
    try {
        const invoice = await createInvoice_s(req.user.id, req.body);

        created(res, invoice, "invoice created");
    } catch (error) {
        if (error.status === "fail") {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
        serverError(res);
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const invoice = await updateInvoice_s(req.invoice, req.body);

        ok(res, invoice, "invoice Updated Successfully");
    } catch (error) {
        if (error.status === "fail") {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        serverError(res, error.message);
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const deleted = await deleteInvoice_s(req.params.id, req.user.id);

        ok(res, deleted.message);
    } catch (error) {
        if (error.status === "fail") {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        serverError(res);
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        ok(res, req.invoice);
    } catch (error) {
        serverError(res);
    }
};

export const listInvoice = async (req, res) => {
    try {
        const invoices = await listInvoice_s(req.user.id, req.params);

        ok(res, invoices);
    } catch (error) {
        console.log(error);

        serverError(res, error.message);
    }
};
