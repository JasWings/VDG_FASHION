import * as yup from 'yup';

export const sliderValidationSchema = yup.object().shape({
  title: yup.string().trim().required('form:error-title-required'),
  description: yup.string().trim(),
  images: yup
    .array()
    .of(yup.string().required('form:error-image-required'))
    .min(1, 'form:error-min-one-image'),
  // linkType: yup
  //   .string()
  //   .oneOf(['product', 'category', 'external'], 'form:error-invalid-link-type')
  //   .required('form:error-link-type-required'),
  // linkTarget: yup.string(),
  // priority: yup
  //   .number()
  //   .integer('form:error-priority-integer')
  //   .min(0, 'form:error-priority-min-zero')
  //   .default(0),
  isActive: yup.boolean().default(true),
  // startDate: yup.date().nullable().typeError('form:error-invalid-start-date'),
  // endDate: yup.date().nullable().typeError('form:error-invalid-end-date'),
});
