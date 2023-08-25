const validate = (validator) => {
  return async function (req, res, next) {
    try {
      await validator.validateAsync(req.body);
      next();
    } catch (err) {
      res.message = err.message
      return util.validationErrorResponse(res)
    }
  };
};

module.exports = validate;
