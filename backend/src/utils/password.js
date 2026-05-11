import bcrypt from "bcrypt";
import { ENV } from "../config/env.js";


export const hashPassword = async (password) => {
    return await bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS)
}

export const comparPassword = async (condidatePassword, password) => {
    return await bcrypt.compare(condidatePassword, password)
}

