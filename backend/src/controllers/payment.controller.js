import { listPayment_s, recordPayment_s } from "../services/payment.service.js"
import { created, ok, serverError } from "../utils/apiResponse.js";



export const recordPayment = async (req, res) => {
    try {
        
        const payment = await recordPayment_s(req.invoice, req.user.id, req.body);

        created(res, payment, 'Payment recorded successfully');

    }catch(error) {
        
        if(error.status === 'fail') {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }

        serverError(res, error.message)
    }
}

export const listPayment = async (req, res) => {
    try {

        const payments = await listPayment_s(req.invoice);

        ok(res, payments, 'geting list pyment successfully')

    }catch(error) {
        if(error.status === 'fail') {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }

        serverError(res)
    }
}