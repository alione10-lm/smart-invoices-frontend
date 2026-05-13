import axios from "axios";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export const fetchInvoices = async () => {
    try {
        const res = await axios.get("/api/invoices", {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await res.data;
    } catch (error) {
        throw new Error("Error fetching invoices:", error);
    }
};

export const getInvoiceById = async (id) => {
    try {
        const res = await axios.get(`/api/invoices/${id}`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await res.data;
    } catch (error) {
        throw new Error(`Error fetching invoice with id ${id}:`, error);
    }
};

export const createInvoice = async (invoiceData) => {
    try {
        const res = await axios.post("/api/invoices", invoiceData, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await res.data;
    } catch (error) {
        throw new Error("Error creating invoice:", error);
    }
};

export const updateInvoice = async (id, invoiceData) => {
    try {
        const res = await axios.put(`/api/invoices/${id}`, invoiceData, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await res.data;
    } catch (error) {
        throw new Error(`Error updating invoice with id ${id}:`, error);
    }
};

export const deleteInvoice = async (id) => {
    try {
        const res = await axios.delete(`/api/invoices/${id}`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await res.data;
    } catch (error) {
        throw new Error(`Error deleting invoice with id ${id}:`, error);
    }
};
