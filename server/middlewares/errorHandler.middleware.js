import { ApiError } from "../utils/ApiError.js";

export const errHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    stack: err.stack,
  });
};
