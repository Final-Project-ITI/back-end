const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);

const validateAddress = (address) => {
    const schemaRequirements = joi.object({
        userId: joi.objectId().required(),
        details: joi.string().min(50).max(350)
    });
    return schemaRequirements.validate(address);
};

module.exports = validateAddress;