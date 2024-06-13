const joi = require("joi");
const Restaurant = require("../models/restaurant.model");

const validateRestaurant = (restaurant) => {
  const schemaRequirements = joi.object({
    name: joi.string().min(3).max(50).required(),
    description: joi.string().min(3).max(255).required(),
    address: joi.string().min(3).max(255).required(),
    phone: joi.string().min(3).max(15).required(),
    email: joi.string(),
    icon: joi.string().allow(null).allow('').optional(),
    banner: joi.string().allow(null).allow('').optional(),
  });
  return schemaRequirements.validate(restaurant);
};

module.exports = validateRestaurant;