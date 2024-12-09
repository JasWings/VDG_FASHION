import Joi from "joi";

 const FeatureSchema = Joi.object({
  identity: Joi.string().required(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
});

export const createFeature = (data) => {
    const { error, value } = FeatureSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};

const updateFeatureSchema = Joi.object({
  identity: Joi.string().optional(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

export const updateFeature = (data) => {
    const { error, value } = updateFeatureSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};

const roleSchema = Joi.object({
    identity: Joi.string().required(),
    description: Joi.string().optional(),
    isActive: Joi.boolean().default(true),
    permissions : Joi.any().required()
  });

  export const RoleValidation = (data) => {
    const { error, value } = roleSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }
    return value;
};


const UserSchemaValidation = Joi.object({
    email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone_number: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/) 
    .required()
    .messages({
      "string.pattern.base": "Phone number must be in a valid format, e.g., +1234567890",
    }),
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(1).max(100).required(),
  password: Joi.string().min(8).max(128).required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
    "any.only": "Confirm password must match password"
  }),
});

export const validateUser = (data) => {
  const { error, value } = UserSchemaValidation.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }
  return value;
};

 const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const loginValidations = async (data) => {
    const { error , value } = loginValidationSchema.validate(data,{ abortEarly: false })
    if(error){
        throw new Error(error?.details.map((detail) => detail.message).join(", "))
    }
    return value
}

