import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  offerTitle: yup.string().required('Offer title is required'),
  discountType: yup
    .object()
    // .oneOf(['Buy X Get Y', 'Buy X Get X'], 'Invalid discount type')
    .required('Discount type is required'),
  buyQuantity: yup
    .number()
    .min(1, 'Buy quantity must be at least 1')
    .required('Buy quantity is required'),
  getQuantity: yup
    .number()
    .min(1, 'Get quantity must be at least 1')
    .required('Get quantity is required'),
  eligibleProducts: yup
    .array()
    .of(yup.object().required('Product ID is required'))
    .min(1, 'At least one eligible product is required')
    .required('Eligible products are required'),
  freeProducts: yup
    .array()
    .of(yup.object().required('Product ID is required'))
    .optional(),
  minimumPurchaseAmount: yup
    .number()
    .min(0, 'Minimum purchase amount cannot be negative')
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
  usageRestrictions: yup.object({
    perUser: yup
      .number()
      .nullable()
      .positive('Per user limit must be a positive number')
      .optional(),
    globalLimit: yup
      .number()
      .nullable()
      .positive('Global limit must be a positive number')
      .optional(),
  }),
  isActive: yup.boolean().required('Active status is required'),
});
