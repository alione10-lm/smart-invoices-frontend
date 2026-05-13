import React, { useEffect } from "react";
import { getInvoiceById } from "../services/invoicesAPI";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
    const { id } = useParams();

    useEffect(() => {
        const getInvoiceDetails = async () => {
            try {
                const { data } = await getInvoiceById(id);
                console.log(data);
            } catch (error) {
                console.error("Error fetching invoice details:", error);
            }
        };
        getInvoiceDetails();
    }, [id]);

    return <div>InvoiceDetails</div>;
};

export default InvoiceDetails;
