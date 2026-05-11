import Users from "../models/User.js";
import { notFound, unauthorized } from "../utils/apiResponse.js";
import { verifyToken } from "../utils/JWT.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return unauthorized(res, 'No token provided. Please log in.')
  }

  const token = authHeader.split(' ')[1];

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch (err) {
    unauthorized(res, 'Invalid or expired token. Please log in again.')
  }

  const user = await Users.findById(decoded.id);

  if(!user) {
    return notFound(res, 'user Not Found')
  }

  req.user = user;

  next()
}