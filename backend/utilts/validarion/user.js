const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').required()
});

const updateUserPutSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updateUserSchema = createUserSchema.fork(
  ["name", "password"],
  (schema) => schema.optional()
);

module.exports = {
  createUserSchema,
  updateUserPutSchema,
  updateUserSchema,
};
