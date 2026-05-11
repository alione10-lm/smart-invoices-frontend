import { clientInvoices_s, clientSuppliers_s, listClient_s, clientPayments_s } from "../services/admin.service.js";
import { ok, serverError } from "../utils/apiResponse.js"


export const listClient = async (req, res) => {
  try {
    const clients = await listClient_s();
    ok(res, clients)
  } catch (error) {
    serverError(res)
  }
}

export const clientSuppliers = async (req, res) => {
  try {
    const suppliers = await clientSuppliers_s(req.params.id);

    ok(res, suppliers);
  } catch (error) {
    serverError(res)
  }
}

export const clientInvoices = async (req, res) => {
  try {
    const invoices = await clientInvoices_s(req.params.id);

    ok(res, invoices);
  } catch (error) {
    serverError(res);
  }
}

export const clientPayments = async (req, res) => {
  try {
    const payments = await clientPayments_s(req.params.id);

    ok(res, payments)
  }catch(error) {
    serverError(res)
  }
}


