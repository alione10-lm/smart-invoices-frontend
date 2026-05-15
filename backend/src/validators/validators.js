import { custom, z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2).trim(),
    email: z.string().email(),
    password: z.string().min(8).trim(),
    role: z.enum(["client", "admin"]).default("client").optional(),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export const createSupplierSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    phone: z.string(),
    address: z.string().max(255),
    contact: z.string(),
});

export const updateSupplierSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    address: z.string().max(255).optional(),
    contact: z.string().optional(),
});

export const createInvoiceSchema = z.object({
    supplierId: z.string(),
    amount: z
        .number("amount must be number")
        .positive("amount must be positive")
        .min(0.01),
    dueDate: z.coerce.date(),
    description: z.string().max(255).optional(),
});

export const updateInvoiceSchema = z.object({
    supplierId: z.string().optional(),
    amount: z
        .number("amount must be number")
        .positive("amount must be positive")
        .min(0.01)
        .optional(),
    dueDate: z.coerce.date().optional(),
    description: z.string().max(255).optional().optional(),
});

export const recordPaymentSchema = z.object({
    amount: z.number().positive().min(0.01, "amount must be gt 0"),
    paymentDate: z.coerce.date(),
    note: z.string().default(null).optional(),
    mode: z.enum(["especes", "cheque", "virement"]),
});
