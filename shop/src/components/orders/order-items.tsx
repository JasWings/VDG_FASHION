import { Table } from '@/components/ui/table';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import { useModalAction } from '@/components/ui/modal/modal.context';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { getReview } from '@/lib/get-review';
import { useCountry } from '@/store/country/country.context';

//FIXME: need to fix this usePrice hooks issue within the table render we may check with nested property
const OrderItemList = (_: any, record: any) => {
  const { price } = usePrice({
    amount: record?.product?.product_prices[0].current_price,
  });
  let name = record.product.identity;
  
  if (record?.pivot?.variation_option_id) {
    const variationTitle = record?.variation_options?.find(
      (vo: any) => vo?.id === record?.pivot?.variation_option_id
    )['title'];
    name = `${name} - ${variationTitle}`;
  }
  console.log(record,"recodrd")
  return (
    <div className="flex items-center">
      <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded">
        <Image
          src={"https://api.slrexports.com/"+record.product?.thumb_image.file ?? productPlaceholder}
          alt={name}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <div className="flex flex-col overflow-hidden ltr:ml-4 rtl:mr-4">
        <div className="mb-1 flex space-x-1 rtl:space-x-reverse">
          <p
            // href={Routes.product(record?.slug)}
            className="inline-block overflow-hidden truncate text-sm text-body transition-colors hover:text-accent"
            // locale={record?.language}
          >
            {name}
          </p>
          <span className="inline-block overflow-hidden truncate text-sm text-body">
            x
          </span>
          <span className="inline-block overflow-hidden truncate text-sm font-semibold text-heading">
            {record.quantity}
          </span>
        </div>
        <span className="mb-1 inline-block overflow-hidden truncate text-sm font-semibold text-accent">
          {/* {price} */}
          {/* {record?.data.country.currency_symbol+record?.product?.product_prices[0].actual_price* record.quantity} */}
        </span>
      </div>
    </div>
  );
};
export const OrderItems = ({
  products,
  orderId,
}: {
  products: any;
  orderId: any;
}) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();
  const {selectedCountry}=useCountry()
  console.log(products)
  const findPriceIndex=(product:any)=>{
    let countryIndex: number | undefined
    const PriceIndex=  product?.product?.product_prices.map((list,index)=>{
        if(list.country===products.country ){
           return countryIndex=index
        }
    })
  return countryIndex
 }

  const orderTableColumns = [
    {
      title: <span className="ltr:pl-20 rtl:pr-20">Item</span>,
      dataIndex: '',
      key: 'items',
      align: alignLeft,
      width: 250,
      ellipsis: true,
      render: OrderItemList,
    },
    {
      title: "Quantity",
      dataIndex: 'quantity',
      key: 'pivot',
      align: 'center',
      width: 100,
      render: function renderQuantity(pivot: any) {
        return <p className="text-base">{pivot}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: '',
      key: 'product',
      align: alignRight,
      width: 100,
      render: function RenderPrice(pivot: any) {
        const { price } = usePrice({
          amount: pivot?.product?.product_prices?.[findPriceIndex(pivot)]?.current_price*pivot.quantity,
        });
        return <div>{products?.data.country.currency_symbol+pivot?.product?.product_prices?.[findPriceIndex(pivot)]?.current_price*pivot.quantity}</div>;
      },
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: alignRight,
    //   width: 140,
    //   render: function RenderReview(_: any, record: any) {
    //     function openReviewModal() {
    //       openModal('REVIEW_RATING', {
    //         product_id: record.id,
    //         shop_id: record.shop_id,
    //         order_id: orderId,
    //         name: record.name,
    //         image: record.image,
    //         my_review: getReview(record),
    //         ...(record.pivot?.variation_option_id && {
    //           variation_option_id: record.pivot?.variation_option_id,
    //         }),
    //       });
    //     }

    //     return (
    //       <button
    //         onClick={openReviewModal}
    //         className="cursor-pointer text-sm font-semibold text-body transition-colors hover:text-accent"
    //       >
    //         {getReview(record)
    //           ? t('text-update-review')
    //           : t('text-write-review')}
    //       </button>
    //     );
    //   },
    // },
  ];
  
  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products?.data?.items}
      rowKey={(record: any) =>
        record.id
          ? record.id
          : record.created_at
      }
      className="orderDetailsTable w-full"
      rowClassName="!cursor-auto"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
