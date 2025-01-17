
import Joi from 'joi'


const offerValidationSchema = Joi.object({
    offerTitle: Joi.string().required(),
    offerType: Joi.string().valid('BUY_X_GET_Y', 'BUY_X_PAY_Z').required(),
    x: Joi.number().min(1).required(),
    y: Joi.number().min(1).required(),
    z: Joi.number().min(1).optional(),
    validFrom: Joi.date().required(),
    validTill: Joi.date().required().greater(Joi.ref('validFrom')).message('validTill must be greater than validFrom'),
    productIds: Joi.array().items(Joi.string().length(24)).required()
});

export const offerdetails = (data) => {
    const { error, value } = offerValidationSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};