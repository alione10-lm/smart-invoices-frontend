import Users from "../models/User.js"
import { signToken } from "../utils/JWT.js";
import { comparPassword, hashPassword } from "../utils/password.js"



export const createUser = async (data) => {

    const password = await hashPassword(data.password);

    const newUser = await Users.create({
        ...data,
        password
    })

    return newUser
}

export const login_s = async (data) => {
    const user = await Users.findOne({email: data.email}).select('+password')
    
    const verifyPassword = await comparPassword(data.password, user.password);

    if(!verifyPassword) {
        return { success: false, message: 'password incorrect' }
    }

    const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    user.password = undefined;

    return { success: true, user, token }
}