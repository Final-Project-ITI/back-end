const joi = require("joi");
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const validatePhone = (phone) => {
    const schemaRequirements = joi.object({
        phoneNumber: joi.string().regex(phoneRegex)
    });
    return schemaRequirements.validate(phone);
};

module.exports = validatePhone;