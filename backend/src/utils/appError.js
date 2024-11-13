// Custom Error class
class AppError extends Error {
  status;
  isOperational; // tracked errors

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = this.statusCode.toString().startsWith("4")
      ? "fail"
      : "errorf";
    this.isOperational = true;
  }
}

export default AppError;
