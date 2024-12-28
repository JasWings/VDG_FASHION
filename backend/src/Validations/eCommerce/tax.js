import Joi from 'joi';

const taxValidation = Joi.object({
    country: Joi.string().allow(null).optional(),
    state: Joi.string().allow(null).optional(),
    zip: Joi.string().allow(null).optional(),
    city: Joi.string().allow(null).optional(),
    rate: Joi.number().required(),
    name: Joi.string().required(),
    is_global: Joi.boolean().required(),
    priority: Joi.number().allow(null).optional(),
    on_tax: Joi.boolean().required(),
});

export const validateTax = (data) => {
    const { error, value } = taxValidation.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};
