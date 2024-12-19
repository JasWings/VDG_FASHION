import Joi from 'joi'



const orderValidation = Joi.object({
    tracking_number: Joi.string().required(),
    customer_id: Joi.any().required(),
    customer_contact: Joi.string().required(),
    amount: Joi.number().required(),
    sales_tax: Joi.number().required(),
    paid_total: Joi.number().required(),
    total: Joi.number().required(),
    cancelled_amount: Joi.string().default("0.00"),
    language: Joi.string().default("en"),
    coupon_id: Joi.any().default(null),
    parent_id: Joi.any().default(null),
    shop_id: Joi.any().default(null),
    discount: Joi.number().default(0),
    payment_gateway: Joi.string().required(),
    order_date: Joi.date().default(Date.now),
    shipping_address: Joi.string().required(),
    billing_address: Joi.string().required(),
    logistics_provider: Joi.string().allow(null),
    delivery_fee: Joi.number().required(),
    delivery_time: Joi.string().required(),
    order_status: Joi.string().default("order-pending"),
    payment_status: Joi.string().default("payment-pending"),
    created_at: Joi.date().default(Date.now),
    payment_intent: Joi.any().default(null),
});

export const orderdetails = (data) => {
    const { error, value } = orderValidation.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};




