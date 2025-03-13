import Joi from "joi"

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

const Otp = Joi.object({
  token : Joi.string().length(10).required(),
  otp : Joi.string().length(6).required(),
  email : Joi.string().optional(),
  otp_id : Joi.any().optional(),
phone_number : Joi.any().optional()
})

export const OtpValidation = ( data ) => {
  const {error,value} = Otp.validate(data)
  if(error){
  throw new Error(error.details.map((detail)=>detail.message).join(", "))
  }
  return value
}

const changePassword = Joi.object({
  confirm_password : Joi.string().required(),
  new_password : Joi.string().required(),
  old_password : Joi.string().required()
})

export const ChangePasswordValidation = (data) => {
  const { error,value} = changePassword.validate(data)
  if(error){
    throw new Error(error.details.map((detail)=>detail.message).join(", "))
    }
    return value
}


const forgetPasswordValidationSchema = Joi.object({
    email: Joi.string().email().required()
});

export const validateForgotPassword = async (data) => {
    const { error, value } = forgetPasswordValidationSchema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error?.details.map((detail) => detail.message).join(", "));
    }
    return value;
};


const otpValidationSchema = Joi.object({
  otp: Joi.string().required(),
  token: Joi.string().required(),
  email: Joi.string().optional()
});

export const validateOtp = async (data) => {
  const { error, value } = otpValidationSchema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error?.details.map((detail) => detail.message).join(", "));
  }
  return value;
};

const resetPasswordValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  new_password: Joi.string().min(6).required(),
  confirm_password: Joi.string()
    .min(6)
    .required()
    .valid(Joi.ref('new_password'))
    .messages({ 'any.only': 'Confirm password must match the new password' }),
});

export const validateResetPassword = async (data) => {
  const { error, value } = resetPasswordValidationSchema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error?.details.map((detail) => detail.message).join(", "));
  }
  return value;
};


