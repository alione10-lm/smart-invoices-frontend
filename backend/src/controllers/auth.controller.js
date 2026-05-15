import Users from "../models/User.js";
import { createUser, login_s } from "../services/auth.service.js";
import {
    badRequest,
    created,
    forbidden,
    ok,
    serverError,
} from "../utils/apiResponse.js";

export const register = async (req, res) => {
    try {
        const userExists = await Users.findOne({ email: req.body.email });

        if (userExists) {
            return badRequest(res, "email already in use ");
        }
        const user = await createUser(req.body);

        created(res, user, "user created successfully");
    } catch (error) {
        serverError(res, user);
    }
};

export const login = async (req, res) => {
    try {
        const user = await login_s(req.body);

        if (!user.success) {
            return forbidden(res, user.message);
        }

        ok(res, user);
    } catch (error) {
        serverError(res, error.message);
    }
};
