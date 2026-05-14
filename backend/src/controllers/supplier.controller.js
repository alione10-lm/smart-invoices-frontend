import { createSupplier_s, deleteSupplier_s, getAllSupplier_s, updateSupplier_s } from "../services/supplier.service.js"
import { created, ok, serverError } from "../utils/apiResponse.js"



export const createSupplier = async (req, res) => {
    try {
        const supplier = await createSupplier_s(req.user.id, req.body)

        created(res, supplier, 'supplier is created')
    }catch(error) {
        serverError(res)
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const supplier = await updateSupplier_s(req.supplier, req.body);

        ok(res, supplier, 'supplier is updated successfully')
    }catch(error) {
        serverError(res, error.message)
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const deleted = await deleteSupplier_s(req.suppllier);

        ok(res, deleted , "supplier deleted successfully")
    }catch(error) {
        serverError(res, error.message)
    }
}

export const getSupplierById = async (req, res) => {
    try {
        ok(res, req.supplier)
    }catch(error) {
        serverError(res)
    }
}

export const getAllSupplier = async (req, res) => {
    try {

        const suppliers = await getAllSupplier_s(req.user.id);

        ok(res, suppliers)

    }catch(error) {
        serverError(res, error.message)
    }
}