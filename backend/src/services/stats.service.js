import mongoose from "mongoose";
import Invoices from "../models/Invoice.js"
import Payments from "../models/Payment.js"



export const stats_s = async (supplier, userId) => {

    const [invoices, globaleStats] = await Promise.all([
        Invoices.find({ supplierId: supplier._id }),
        Invoices.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: {_id: null, totale: { $sum: "$amount" }} },
        ])
    ]);

    const [unpaid, partially_paid,paid] = await Promise.all([
        Invoices.countDocuments({ supplierId: supplier._id, status: 'unpaid' }),
        Invoices.countDocuments({ supplierId: supplier._id, status: 'partially_paid' }),
        Invoices.countDocuments({ supplierId: supplier._id, status: 'paid' }),
    ])

    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, i) => sum + i.amount ,0);

    const totalPaymentAmount = await Promise.all(
        invoices.map(async (inv) => {
            const payments = await Payments.find({ invoiceId: inv._id });
            const total = payments.reduce((sum, i) => sum + i.amount ,0);

            return total;
        })
    )

    const totalPaid = totalPaymentAmount.reduce((sum, i) => sum + i , 0)
    const totalRemaining = totalAmount - totalPaid;

    const globaleTotal = globaleStats[0]?.total || 0;
    const percentage = globaleTotal > 0
    ? ((totalAmount / globaleTotal) * 100).toFixed(2)
    : 0


    return {
        supplierId: supplier.id,
        supplierName: supplier.name,
        totalInvoices,
        totalAmount,
        totalPaid,
        totalRemaining,
        percentage,
        invoicesByStatus: {
            unpaid,
            partially_paid,
            paid
        }
    }

}
