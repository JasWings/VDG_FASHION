import Joi from 'joi'



const CouponValidation = Joi.object({
    code: Joi.string().required().max(20).messages({
        'string.base': 'Code should be a type of text',
        'string.max': 'Code should have a maximum length of 20 characters',
        'any.required': 'Code is required',
    }),
    type: Joi.string().valid('percentage', 'fixed').required().messages({
        'any.required': 'Type is required',
        'any.only': 'Type must be either "percentage" or "fixed"',
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description should be a type of text',
        'any.required': 'Description is required',
    }),
    amount: Joi.number().required().min(0).messages({
        'number.base': 'Amount should be a type of number',
        'number.min': 'Amount should be at least 0',
        'any.required': 'Amount is required',
    }),
    minimum_cart_amount: Joi.number().required().min(0).messages({
        'number.base': 'Minimum cart amount should be a type of number',
        'number.min': 'Minimum cart amount should be at least 0',
        'any.required': 'Minimum cart amount is required',
    }),
    image: Joi.string().required().messages({
        'string.base': 'Image should be a type of string',
        'any.required': 'Image is required',
    }),
    active_from: Joi.date().iso().required().messages({
        'date.base': 'Active from should be a valid date',
        'any.required': 'Active from is required',
    }),
    expire_at: Joi.date().iso().required().messages({
        'date.base': 'Expire at should be a valid date',
        'any.required': 'Expire at is required',
    }),
});

export const coupondetails = (data) => {
    const { error, value } = CouponValidation.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};




