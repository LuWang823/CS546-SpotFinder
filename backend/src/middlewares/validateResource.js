import catchAsync from "../utils/catchAsync.js";

// Middleware to validate input data
const validateResource = (Schema) =>
  catchAsync(async (req, _res, next) => {
    await Schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  });

export default validateResource;
