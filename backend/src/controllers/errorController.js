/**
 * Global Error Handling Middleware:
 * - handleDevError: Sends detailed error information in development.
 * - handleProdError: Sends limited, user-friendly error info in production. Logs unknown errors.
 * - handleZodError: Converts Zod validation errors into a custom AppError.
 * - handleCastError: Creates a custom error for invalid MongoDB object IDs.
 * - handleDuplicateKeyError: Creates a custom error for MongoDB duplicate key errors.
 * - globalErrorHandler: Main error handler that processes errors differently based on environment
 *   (development/production), and handles specific MongoDB errors (CastError, DuplicateKeyError).
 */

import { ZodError } from "zod";
import AppError from "../utils/appError.js";

const handleDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const handleProdError = (err, res) => {
  if ("isOperational" in err && err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("unknown error");
    console.error(JSON.stringify(err));
    res.status(500).json({
      status: "error",
      message: "somthing went wrong",
    });
  }
};

const handleZodError = (err) => {
  const message = err.issues.map((issue) => issue.message).join(". ");
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateKeyError = (err) => {
  const fields = "keyValue" in err && JSON.stringify(err.keyValue);
  const message = fields
    ? `duplicate field ${fields}, please provide different values`
    : "please provide different value";

  return new AppError(message, 400);
};

const globalErrorHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") handleDevError(err, res);
  if (process.env.NODE_ENV === "production") {
    if (err instanceof ZodError) err = handleZodError(err);
    if ("name" in err && err.name === "CaseError") err = handleCastError(err);
    if ("code" in err && err.code === 11000) err = handleDuplicateKeyError(err);
    handleProdError(err, res);
  }
};

export default globalErrorHandler;
