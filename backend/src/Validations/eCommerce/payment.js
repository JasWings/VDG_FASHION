import Joi from 'joi';

const paymentValidationSchema = Joi.object({
    order_id: Joi.string().required(), 
    payment_id: Joi.string().required(),
    payment_status: Joi.string().valid('pending', 'completed', 'failed').required(), 
    amount: Joi.number().positive().required(),
    payment_gateway: Joi.string().valid('razorpay').default('razorpay'),
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
    created_at: Joi.date().default(Date.now)
});


export const Paymentdetails = (data) => {
    const { error, value } = paymentValidationSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};
