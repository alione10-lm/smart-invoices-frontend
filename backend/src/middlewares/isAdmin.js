import { forbidden, unauthorized } from "../utils/apiResponse.js"


export const isAdmin = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorized(res, 'Authentication required.')
    }

    if (req.user.role !== "admin") {
      return forbidden(res, `Access denied. Required role(s): ${role}.`)
    }

    next()
  }
}