import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { PlusIcon } from "@/components/icons/plus-icon";
import dynamic from "next/dynamic";
import { Image } from "@/components/ui/image";
import { productPlaceholder } from "@/lib/placeholders";
import ImageLoader from "@/components/ui/loaders/imageLoader";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { getImageURL } from "@/lib/image";
import cn from "classnames";
import usePrice from "@/lib/use-price";
import { useCart } from "@/store/quick-cart/cart.context";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { authorizationAtom } from "@/store/authorization-atom";

const AddToCart = dynamic(() =>
  import("@/components/products/add-to-cart/add-to-cart").then(
    (module) => module.AddToCart
  )
);

type OfferProps = {
  product: any;
  offers: any;
  cart: any;
  className?: string;
};

const Offer: React.FC<OfferProps> = ({ product, offers, cart, className }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);
  const { openModal } = useModalAction();
  const { addItemToCart ,Cart } = useCart();
  const [isAuthorize] = useAtom(authorizationAtom);

  const { name, slug, product_type, sale_price, price, image, quantity } = product ?? {};
  const isVariant = product_type === "variable";
  const variants_list = product?.variation_options;
  const first_variant = variants_list?.[0];

  const { price: displayPrice } = usePrice({
    amount: isVariant ? first_variant?.sale_price : sale_price,
    currencyCode: "INR",
  });

  const offer = offers; // Assuming one offer is associated
  const discountType = offer?.discountType;
  const buyQuantity = offer?.buyQuantity;
  const getQuantity = offer?.getQuantity;
  const freeProducts = offer?.freeProducts;
  const appliedOffer = Cart?.price_details?.applied_offer;

  async function handleAddToCart() {
    if (isAuthorize) {
      if (!offer) {
        return <AddToCart variant="normal" data={product} cartProduct={null} />;
      }
      try {
        const response: any = await addItemToCart("", 1, offer?._id);
        if (response.status === "failed") {
          toast.error(response?.message);
        } else {
          toast.success(`🎉 Offer Applied: Buy ${buyQuantity} Get ${getQuantity}!`);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.warn("Login to continue");
      openModal("LOGIN_VIEW");
    }
  }

  async function handleRemoveToCart() {
    if (isAuthorize) {
      try {
        const response: any = await addItemToCart("", 1, '',offer?._id);
        if (response.status === "failed") {
          toast.error(response?.message);
        } else {
          toast.success(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.warn("Login to continue");
      openModal("LOGIN_VIEW");
    }
  }

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product);
  }

  return (
    <article
      className={cn(
        "product-card cart-type-offer h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow",
        className
      )}
    >
      <div
        className="relative flex h-48 m-5 w-auto cursor-pointer items-center justify-center sm:h-48"
        onClick={handleProductQuickView}
      >
        {imageLoading && <ImageLoader />}
        <Image
          src={image ? getImageURL(image?.file) : productPlaceholder}
          alt={slug || ""}
          fill
          sizes="(max-width: 768px) 100vw"
          className="product-image object-contain"
          onLoad={() => setImageLoading(false)}
          style={{ opacity: imageLoading ? "0" : "1" }}
        />
      </div>

      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-0 left-0 p-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-br-lg shadow-lg">
          {discountType === "Buy X Get Y"
            ? `Buy ${buyQuantity} Get ${getQuantity}`
            : `Buy ${buyQuantity} Get ${getQuantity} Free`}
        </div>
      )}

      <header className="p-3 md:p-6">
        <div className="mb-2 flex items-center">
          <span className="text-sm font-semibold text-heading md:text-base">
            {displayPrice}
          </span>
        </div>

        <div className="flex justify-between mb-4">
          <h3
            className="cursor-pointer truncate text-base font-semibold text-[#1F2937] leading-6 "
            onClick={handleProductQuickView}
          >
            {name}
          </h3>
          <p className="text-base font-semibold text-[#1F2937] leading-6 ">
            &#8377;{sale_price}
          </p>
        </div>

{appliedOffer?._id === offer?._id ? (
  <div className="applied-offer relative bg-green-100 p-3 text-sm text-green-700 rounded-lg mb-4 flex items-center justify-between">
    <span className="flex items-center">
      🎉 Offer Applied: Buy {appliedOffer.buyQuantity} Get {appliedOffer.getQuantity}!
    </span>
    <div className="relative group">
  <span className="cursor-pointer text-blue-500 underline ml-2">Details</span>
  <div className="absolute top-full left-0 mt-2 hidden w-64 p-3 z-10000 bg-white border border-gray-200 shadow-lg rounded-lg group-hover:block">
    <div className="text-gray-800 font-medium mb-2">Free Items Added:</div>
    {appliedOffer.freeProducts.map((freeProduct, index) => (
      <div key={index} className="text-sm text-gray-700">
        {freeProduct.name} (x{freeProduct.quantity})
      </div>
    ))}
  </div>
</div>

    <button
      onClick={handleRemoveToCart} // Adjust with your remove logic
      className="ml-4 text-red-500 hover:text-red-600"
      aria-label="Remove Offer"
    >
      &times;
    </button>
  </div>
) : (
  <button
    onClick={handleAddToCart}
    className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 md:h-9 md:text-sm"
  >
    <span className="flex-1">{t("text-add")}</span>
    <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
      <PlusIcon className="h-4 w-4 stroke-2" />
    </span>
  </button>
)}


        {Number(quantity) <= 0 && (
          <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
            Out Of Stock
          </div>
        )}
      </header>
    </article>
  );
};

export default Offer;
