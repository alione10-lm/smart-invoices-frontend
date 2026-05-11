import { AppError } from "./errHandler.js";



export const notFoundMiddleware = (req, res, next) => {
  const err = new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404);
  next(err);   
};