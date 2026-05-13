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
