const joi = require("joi");
const User = require("../models/user.model");

const validateUser = (user) => {
  const schemaRequirements = joi.object({
    fullName: joi.string().min(3).max(50),
    email: joi.string().min(3).max(255).required(),
    password: joi.string().min(3).max(50).required(),
    image: joi.string().max(255),
  });
  return schemaRequirements.validate(user);
};

module.exports = validateUser;

