import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  name: yup.string().required('Offer name is required'),
  code: yup.string().required('Offer code is required'),
  discount: yup
    .number()
    .min(0, 'Discount must be at least 0')
    .max(100, 'Discount cannot exceed 100')
    .required('Discount percentage is required'),
  validFrom: yup
    .date()
    .required('Start date is required')
    .typeError('Invalid start date'),
  validUntil: yup
    .date()
    .min(yup.ref('validFrom'), 'End date must be after start date')
    .required('End date is required')
    .typeError('Invalid end date'),
  isActive: yup.boolean().required('Active status is required'),
});
