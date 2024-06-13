const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);

const validateProduct = (productInfo) => {
    const schemaRequirements = joi.object({
        title: joi.string().min(3).max(50).required(),
        price: joi.number().required(),
        description: joi.string().min(3).max(50).required(),
        icon: joi.string().allow(null).allow('').optional(),
        menuCategoryId: joi.objectId().required(),
        ingredientsIds: joi.array().items(joi.objectId()).required(),
    });
    return schemaRequirements.validate(productInfo);
};

module.exports = validateProduct;