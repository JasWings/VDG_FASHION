import usePrice from '@/utils/use-price';
import isEmpty from 'lodash/isEmpty';

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { price, basePrice } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? selectedVariation.sale_price
        : selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: "INR"
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
    currencyCode: "INR"
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
    currencyCode: "INR"
  });
  return (
    <span className="flex items-center">
      <ins className="text-2xl font-semibold text-accent no-underline">
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </ins>
      {basePrice && (
        <del className="ms-2 text-sm font-normal text-muted md:text-base">
          {basePrice}
        </del>
      )}
    </span>
  );
}
