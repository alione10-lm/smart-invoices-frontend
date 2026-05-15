import Invoices from "../models/Invoice.js";
import { Suppliers } from "../models/Supplier.js"


export const createSupplier_s = async (userId, data) => {
    const newSupplier = {
        ...data,
        userId
    }

    await Suppliers.create(newSupplier);

    return newSupplier
}

export const updateSupplier_s = async (supllier, data) => {
    const supllierUpdated = await Suppliers.findByIdAndUpdate({ _id: supllier._id }, { $set: data }, { returnDocument: 'after' })

    return supllierUpdated
}

export const deleteSupplier_s = async (supllier) => {
    
    const deleted = await Suppliers.deleteOne(supllier);

    return deleted
}

export const getAllSupplier_s = async (userId) => {
    const suplliers = await Suppliers.find({userId});

    return suplliers
}

