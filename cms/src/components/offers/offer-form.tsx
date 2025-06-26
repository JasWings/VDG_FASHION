import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Input from '@/components/ui/input';
import SelectInput from '@/components/ui/select-input';
import { DatePicker } from '@/components/ui/date-picker';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { offerValidationSchema } from './offer-validation-schema';
import { useProductsQuery } from '@/data/product';
import { useCreateOfferMutation, useUpdateOfferMutation } from "@/data/offer";
import Label from '../ui/label';

const defaultValues = {
  offerTitle: '',
  discountType: '',
  buyQuantity: 1,
  getQuantity: 1,
  eligibleProducts: [],
  freeProducts: [],
  startDate: new Date(),
  endDate: new Date(),
  minimumPurchaseAmount: 0,
  perUserLimit: null,
  globalLimit: null,
  isActive: true,
};

type FormValues = typeof defaultValues;

type IProps = {
  initialValues?: FormValues;
};

export default function CreateOrUpdateOfferForm({ initialValues }: IProps) {
  const router = useRouter();
  const initialFormValues = initialValues
    ? {
        ...initialValues,
        startDate: initialValues.startDate ? new Date(initialValues.startDate) : new Date(),
        endDate: initialValues.endDate ? new Date(initialValues.endDate) : new Date(),
      }
    : defaultValues;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialFormValues,
    resolver: yupResolver(offerValidationSchema),
  });

  const { products, isLoading: loadingProducts } = useProductsQuery();
  const { mutate: createOffer, isLoading: creating } = useCreateOfferMutation();
  const { mutate: updateOffer, isLoading: updating } = useUpdateOfferMutation();

  const onSubmit = (values: FormValues) => {
    const transformedValues = {
      ...values,
      eligibleProducts: values.eligibleProducts.map((product) => product.value),
      freeProducts: values.freeProducts.map((product) => product.value),
      discountType: values.discountType.value,
    };

    if (initialValues) {
      updateOffer({ ...transformedValues, id: initialValues.id });
    } else {
      createOffer(transformedValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="BOGO Offer Details"
          details="Set up the details for your Buy One Get One offer including quantities, applicable and free products, and more."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Offer Title"
            {...register('offerTitle')}
            error={errors.offerTitle?.message}
            variant="outline"
            className="mb-5 p-3"
          />

          <div className="mb-5">
            <Label>{'Discount Type'}</Label>
            <SelectInput
              options={[
                { label: 'Buy X Get Y', value: 'Buy X Get Y' },
                { label: 'Buy X Get X', value: 'Buy X Get X' },
              ]}
              name="discountType"
              control={control}
              error={errors.discountType?.message}
              className="p-3 mb-5"
            />
          </div>

          <Input
            label="Buy Quantity"
            type="number"
            {...register('buyQuantity')}
            error={errors.buyQuantity?.message}
            variant="outline"
            className="mb-5 p-3"
          />

          <Input
            label="Get Quantity"
            type="number"
            {...register('getQuantity')}
            error={errors.getQuantity?.message}
            variant="outline"
            className="mb-5 p-3"
          />

          <div className="mb-5">
            <Label>{'Eligible Products'}</Label>
            <SelectInput
              options={products?.map((product) => ({
                label: product.name,
                value: product._id,
              }))}
              name="eligibleProducts"
              control={control}
              isMulti
              isLoading={loadingProducts}
              error={errors.eligibleProducts?.message}
              className="p-3 mb-5"
            />
          </div>

          <div className="mb-5">
            <Label>{'Free Products'}</Label>
            <SelectInput
              options={products?.map((product) => ({
                label: product.name,
                value: product._id,
              }))}
              name="freeProducts"
              control={control}
              isMulti
              isLoading={loadingProducts}
              error={errors.freeProducts?.message}
              className="p-3 mb-5"
            />
          </div>

          <Input
            label="Minimum Purchase Amount"
            type="number"
            {...register('minimumPurchaseAmount')}
            error={errors.minimumPurchaseAmount?.message}
            variant="outline"
            className="mb-5 p-3"
          />

          <div className="flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{'Start Date'}</Label>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    minDate={new Date()}
                    className="border border-border-base"
                  />
                )}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>{'End Date'}</Label>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    className="border border-border-base"
                  />
                )}
              />
            </div>
          </div>

          <Input
            label="Per User Limit (Optional)"
            type="number"
            {...register('perUserLimit')}
            error={errors.perUserLimit?.message}
            variant="outline"
            className="mb-5 p-3"
          />

          <Input
            label="Global Usage Limit (Optional)"
            type="number"
            {...register('globalLimit')}
            error={errors.globalLimit?.message}
            variant="outline"
            className="mb-5 p-3"
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Back
        </Button>
        <Button loading={creating || updating}>
          {initialValues ? 'Update Offer' : 'Create Offer'}
        </Button>
      </div>
    </form>
  );
}
