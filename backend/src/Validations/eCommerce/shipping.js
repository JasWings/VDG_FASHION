import Joi from 'joi';

const shippingValidation = Joi.object({
    amount: Joi.number().required(),
    name: Joi.string().required(),
    is_global: Joi.boolean().optional(),
    type: Joi.string().required(),
    payment_method: Joi.string().required()
});

export const validateShipping = (data) => {
    const { error, value } = shippingValidation.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};
