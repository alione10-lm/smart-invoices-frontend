


export const invoiceStatus = (amount, dueDate, totalpaid) => {
    const overdue = new Date() > new Date(dueDate);
    if(totalpaid >= amount) {
        return 'paid'
    }

    if(totalpaid > 0) {
        return overdue ? 'overdue' : 'partially_paid'
    }

    return overdue ? 'overdue': 'unpaid'
}
