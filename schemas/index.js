const Joi = require('joi');

const addContactSchema = Joi.object({
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

const setContactFavorite = Joi.object({
    favorite: Joi.boolean().truthy('false')
})

module.exports = {
    addContactSchema, setContactFavorite,
}