import Invoices from '../models/Invoice.js';
import Payments from '../models/Payment.js';
import { invoiceStatus } from '../utils/InvoiceStatus.js';
import { AppError } from '../middlewares/errHandler.js'


export const recordPayment_s = async (invoice, userId, data) => {

    const currentPaid = await Payments.aggregate([
        { $match: { invoiceId: invoice._id } },
        { $group: { _id: null, totale: {$sum: "$amount"} } }
    ])
    
    if(currentPaid.totale >= invoice.amount) {
        throw new AppError('This invoice is already fully paid.', 422);
    }

    if(invoice.status === 'paid') {
        throw new AppError('this invoice is already paid.', 422);
    }

    if(data.paymentDate > new Date()) {
        throw new AppError('Payment date cannot be on the future', 422);
    }

    const totalePaid = (currentPaid[0]?.totale || 0) + data.amount;

    
    if(totalePaid > invoice.amount) {
        const remaining = invoice.amount - currentPaid[0]?.totale;
        throw new AppError(`payment amount exceeds the remaining balance max allowed ${remaining}`, 422)
    }


    const payment = await Payments.create({
        invoiceId: invoice.id,
        userId,
        ...data
    })

    const updateStatus = invoiceStatus(invoice.amount, invoice.dueDate, totalePaid);

    invoice.status = updateStatus

    const updateInvoice = await Invoices.findByIdAndUpdate(invoice.id, invoice, { returnDocument: 'after' });

    return {
        payment,
        invoice: updateInvoice
    }
}

export const listPayment_s = async (invoice) => {
    
    const payments = await Payments.find({ invoiceId: invoice.id });

    const totalePaid = payments.reduce((sum, i) => sum + i.amount , 0);
    const remaining = (invoice.amount - totalePaid) || 0;

    return {
        payments,
        summary : {
            invoiceId: invoice.id,
            invoiceAmount: invoice.amount,
            status: invoice.status,
            totalePaid,
            remaining,
            paymentsCount: payments.length
        }

    }

}