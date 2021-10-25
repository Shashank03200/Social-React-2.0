const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().min(3).lowercase().required(),
  password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
