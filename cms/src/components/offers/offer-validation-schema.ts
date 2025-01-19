import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  title: yup.string().required('Offer title is required'),
  description: yup.string().optional(),
  offerType: yup.object().required('Offer type is required'),
  applicableProducts: yup
    .array()
    .min(1, 'At least one applicable product is required')
    .required('Applicable products are required'),
  freeProducts: yup.array().optional(),
  minimumPurchaseAmount: yup
    .number()
    .min(0, 'Minimum purchase amount must be at least 0')
    .optional(),
  startDate: yup
    .date()
    .required('Start date is required')
    .typeError('Invalid start date'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required')
    .typeError('Invalid end date'),
  // isActive: yup.boolean().required('Active status is required'),
});
