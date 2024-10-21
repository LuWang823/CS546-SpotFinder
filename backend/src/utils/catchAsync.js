/**
 * Utility to catch errors in async functions:
 * - catchAsync: A higher-order function that wraps asynchronous route handlers,
 *   forwarding any errors to the global error handler using next().
 */
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export default catchAsync;
