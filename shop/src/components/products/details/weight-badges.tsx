interface Props {
  weight: any;
  product:any;
}
import { useModalAction } from "@/components/ui/modal/modal.context";

const WeightBadges = ({ weight ,product}: Props) => {
      const {openModal}=useModalAction()

      function handleProductQuickView(product:any) {
        return openModal('PRODUCT_DETAILS', product);
      } 


  return (
    <div className="mt-4 flex w-full flex-row items-start border-t border-border-200 border-opacity-60 pt-4 md:mt-6 md:pt-6">
      <span className="py-1 text-sm font-semibold capitalize text-heading ltr:mr-6 rtl:ml-6">
        Weight:
      </span>
      <div className="flex flex-row flex-wrap">
          <button
            key={weight}
            onClick={()=>handleProductQuickView(product)}
            className={`mb-2 whitespace-nowrap rounded border border-border-200 bg-transparent py-1 px-2.5 text-sm lowercase tracking-wider text-heading transition-colors hover:border-accent hover:text-accent focus:bg-opacity-100 focus:outline-0 ltr:mr-2 rtl:ml-2`}
          >
            {weight} gm
          </button>
      </div>
    </div>
  );
};

export default WeightBadges;
