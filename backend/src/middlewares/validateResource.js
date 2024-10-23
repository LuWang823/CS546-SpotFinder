import catchAsync from "../utils/catchAsync.js";

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
