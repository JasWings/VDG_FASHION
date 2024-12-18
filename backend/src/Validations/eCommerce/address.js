import Joi from "joi"

export const addressValidationSchema = Joi.object({
  first_name: Joi.string().min(1).max(50).required(),
  last_name: Joi.string().min(1).max(50).required(),
  address_type: Joi.string().valid("billing", "shipping").required(),
  phone_number: Joi.string().pattern(/^\+\d{10,15}$/).required(),
  is_primary: Joi.boolean().optional(),
  address_line_1: Joi.string().required(),
  address_line_2: Joi.string().optional(),
  address_line_3: Joi.string().optional(),
  landmark: Joi.string().optional(),
  remarks: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pin_code: Joi.number().min(100000).max(999999).required(),
//   user: Joi.string().required(),
});


export const ValidateCustomerAddress = (data) => {
    const { error, value } = addressValidationSchema.validate(data)
    if(error){
        throw new Error(`Validation Error: ${error.details.map((x) => x.message).join(", ")}`)
    }
    return value
}