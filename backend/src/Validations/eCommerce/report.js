import Joi from 'joi'



const reportValidation = Joi.object({
    reportType: Joi.string().required(),
    data: Joi.object().required(),
});

export const reportdetails = (data) => {
    const { error, value } = reportValidation.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};




