// A higher-order function that wraps asynchronous route handlers
// Forwards any error to the Global Error Handler using next().
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export default catchAsync;
