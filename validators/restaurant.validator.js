const joi = require("joi");
const Restaurant = require("../models/restaurant.model");

const validateRestaurant = (restaurant) => {
  const schemaRequirements = joi.object({
    name: joi.string().min(3).max(50).required(),
    description: joi.string().min(3).max(50).required(),
    icon: joi.string().max(255),
  });
  return schemaRequirements.validate(restaurant);
};

module.exports = validateRestaurant;

