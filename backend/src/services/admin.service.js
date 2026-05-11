import Users from '../models/User.js';
import Suppliers from '../models/Supplier.js';
import Invoices from '../models/Invoice.js';
import Payments from '../models/Payment.js';

export const listClient_s = async () => {
  const clients = await Users.find({ role: 'client' })
    .select('-password');
  
  return clients
}

export const clientSuppliers_s = async (clientId) => {

  const suppliers = await Suppliers.find({ userId: clientId });

  return suppliers
}

export const clientInvoices_s = async (clientId) => {
  const invoices = await Invoices.find({ userId: clientId }).sort({ createAt: -1 });

  return invoices
}

export const clientPayments_s = async (clientId) => {
  const payments = await Payments.find({ userId: clientId }).sort({ createAt: -1 });

  return payments
}
