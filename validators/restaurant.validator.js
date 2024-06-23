const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);

const validateRestaurant = (restaurant) => {
  const schemaRequirements = joi.object({
    name: joi.string().min(3).max(50).required(),
    description: joi.string().min(3).max(255).required(),
    address: joi.string().min(3).max(100).required(),
    phone: joi.string().min(3).max(15).required(),
    email: joi.string(),
    icon: joi.string().allow(null).allow('').optional(),
    banner: joi.string().allow(null).allow('').optional(),
    categoriesIds: joi.array().items(joi.objectId()).required(),
  });
  return schemaRequirements.validate(restaurant);
};

module.exports = validateRestaurant;