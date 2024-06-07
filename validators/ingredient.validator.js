const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);

const validateIngredient = (ingredient) => {
    const schemaRequirements = joi.object({
        name: joi.string().max(50)
    });
    return schemaRequirements.validate(ingredient);
};

module.exports = validateIngredient;