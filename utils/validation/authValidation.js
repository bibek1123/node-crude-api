const joi = require("joi");
const messageContant = require("../../config/constants/messageContant");
exports.createKeys = joi
  .object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/).required().messages({
      "string.pattern.base": messageContant.MESSAGE.PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
    }),
  })
  .unknown(false);

exports.loginKeys = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/).required().messages({
      "string.pattern.base": messageContant.MESSAGE.PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
    }),
  })
  .unknown(false);


  

