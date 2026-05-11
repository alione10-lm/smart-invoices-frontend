import { Suppliers } from "../models/Supplier.js"
import { forbidden, notFound } from "../utils/apiResponse.js";
import Users from "../models/User.js";
import { ENV } from "../config/env.js";

// supllier

export const supllierExist = async (req, res, next) => {
    const supplier = await Suppliers.findOne(req.body);

    if(supplier) {
        return forbidden(res, 'supplier is alrady exist')
    }

    next()
}


// auth

export const userAlradyrExist = async (req, res, next) => {
    const user = await Users.findOne(req.body);

    if(user) {
        return forbidden(res, 'user is alrady exist')
    }

    next()
}

export const userExist = async (req, res, next) => {
    const user = await Users.findOne({email: req.body.email});

    if(!user) {
        return notFound(res, 'user not Found')
    }

    next() 
}

export const clientExist = async (req, res, next) => {
    const client = await Users.findOne({ _id: req.params.id })

    if (!client) {
        return notFound(res, 'Client not Found');
    }

    next()
}


// globale error

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    }
}


export const errHandler = (err, req, res, next) => {
    let status = err.statusCode || 500;
    let message = err.message || 'Inrernal server Error';

    if(err.name === 'validationError') {
        status = 400;
        message = 'Validation Error';
    }


    return res.status(status).json({
        error: message,
        success: false,
    })
}

