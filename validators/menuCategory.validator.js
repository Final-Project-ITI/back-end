const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);

const validateCategory = (category) => {
    const schemaRequirements = joi.object({
        name: joi.string().max(50),
        icon: joi.string().allow(null).allow('').optional(),
    });
    return schemaRequirements.validate(category);
};

module.exports = validateCategory;