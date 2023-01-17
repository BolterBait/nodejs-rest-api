const Joi = require('joi');

const validateBody = (body) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30),

        phone: Joi.string()
            .regex(/^[0-9]{10}$/)
            .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        favorite: Joi.boolean()
            .truthy('false')
    });

    return schema.validate(body);
}

module.exports = {
    validateBody,
} 