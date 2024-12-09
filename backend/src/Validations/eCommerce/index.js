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
  type_id : Joi.string().required().label("Group"),
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


export const validateGroup = (data) => {
  const bannerSchema = Joi.object({
    type_id: Joi.number().optional(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.object({
      id: Joi.number().optional(),
      original: Joi.string().uri().optional(),
      thumbnail: Joi.string().uri().optional(),
    }).optional(),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso(),
  });

  const promotionalSliderSchema = Joi.object({
    id: Joi.string().optional(),
    original: Joi.string().uri().optional(),
    thumbnail: Joi.string().uri().optional(),
  });

  const settingsSchema = Joi.object({
    isHome: Joi.boolean().optional(),
    layoutType: Joi.string().optional(),
    productCard: Joi.string().optional(),
  });

  const groupSchema = Joi.object({
    id : Joi.any().optional(),
    name: Joi.string().required(),
    settings: settingsSchema.optional(),
    slug: Joi.string().required(),
    language: Joi.string().optional(),
    icon: Joi.string().required(),
    promotional_sliders: Joi.array().items(promotionalSliderSchema),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso(),
    translated_languages: Joi.array().items(Joi.string()),
    banners: Joi.array().items(bannerSchema),
  });

  const { error, value } = groupSchema.validate(data, { abortEarly: false });

  if (error) {
    throw new Error(`Validation Error: ${error.details.map((x) => x.message).join(", ")}`);
  }
  return value;
};





