import Joi from "joi";

const tagSchema = Joi.object({
    identity: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(255).optional(),
    slug: Joi.string().required()
  });
  

export  const validateTag = (tagData) => {
    const { error, value } = tagSchema.validate(tagData, { abortEarly: false });
    if (error){
        throw new Error(`Validation Error: ${error.details.map((x) => x.message).join(", ")}`)
    } 
    return value;
};

const attributeValidationSchema = Joi.object({
  identity : Joi.string().min(2).max(50).required(),
  value: Joi.string().min(1).max(100).required(),
  meta: Joi.string().max(255).optional(),
});

export const validateAttribute = (attributeData) => {

  const { error, value } = attributeValidationSchema.validate(attributeData, { abortEarly: false });

  if (error) {
    throw new Error(`Validation Error: ${error.details.map((x) => x.message).join(", ")}`);
  }

  return value;

};

const categoryValidationSchema = Joi.object({
  identity: Joi.string().min(2).max(50).required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  details: Joi.string().optional().label("Details"),
  icon: Joi.string().optional().label("Icon"),
  image: Joi.string().optional().label("Image"),
  is_child: Joi.boolean().optional().label("Is Child"),
  parent: Joi.string().optional().label("Parent"),
  tags: Joi.array().items(Joi.string()).optional().label("Tags"),
});

export const validateCategory = (categoryData) => {
  const { error, value } = categoryValidationSchema.validate(categoryData, { abortEarly: false });
  if (error) {
    throw new Error(`Validation Error: ${error.details.map((x) => x.message).join(", ")}`);
  }
  return value;
};




