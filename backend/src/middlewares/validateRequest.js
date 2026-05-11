import { ZodError } from 'zod'

export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const validateData = schema.parse(req.body);

      req.body = validateData;

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        })
      }

      next(error)
    }
  }
}