import {
  CreateOrderInput,
  CreateOrderPaymentInput,
  CreateRefundInput,
  DownloadableFilePaginator,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  PaymentGateway,
  QueryOptions,
} from '@/types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@/store/checkout';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { mapPaginatorData } from '@/framework/utils/data-mappers';
import { isArray, isObject, isEmpty } from 'lodash';
import { useCart } from '@/store/quick-cart/cart.context';
import { loadStripe } from '@stripe/stripe-js';

export function useOrders(options?: Partial<OrderQueryOptions>) {
  const { locale } = useRouter();

  const formattedOptions = {
    ...options,
    // language: locale
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<OrderPaginator, Error>(
    [API_ENDPOINTS.USER_ORDER, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.orders.all()
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    orders: data?.pages[0].data?.flatMap((page:any) => page) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}

export function useOrder({ tracking_number }: { tracking_number: string }) {
  const { data, isLoading, error, isFetching, refetch } = useQuery<
    Order,
    Error
  >(
    [API_ENDPOINTS.ORDERS, tracking_number],
    () => client.orders.get(tracking_number),
    { refetchOnWindowFocus: false }
  );
  
  return {
    order: data?.data,
    isFetching,
    isLoading,
    refetch,
    error,
  };
}

export function useRefunds(options: Pick<QueryOptions, 'limit'>) {
  const { locale } = useRouter();

  const formattedOptions = {
    ...options,
    // language: locale
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery(
    [API_ENDPOINTS.ORDERS_REFUNDS, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.orders.refunds(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    refunds: data?.pages?.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}

export const useDownloadableProducts = (
  options: Pick<QueryOptions, 'limit'>
) => {
  const { locale } = useRouter();

  const formattedOptions = {
    ...options,
    // language: locale
  };

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<DownloadableFilePaginator, Error>(
    [API_ENDPOINTS.ORDERS_DOWNLOADS, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.orders.downloadable(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
      refetchOnWindowFocus: false,
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    downloads: data?.pages?.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
};

export function useCreateRefund() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: createRefundRequest, isLoading } = useMutation(
    client.orders.createRefund,
    {
      onSuccess: () => {
        toast.success(`${t('text-refund-request-submitted')}`);
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(`${t(data?.message)}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ORDERS);
        closeModal();
      },
    }
  );

  function formatRefundInput(input: CreateRefundInput) {
    const formattedInputs = {
      ...input,
      // language: locale
    };
    createRefundRequest(formattedInputs);
  }

  return {
    createRefundRequest: formatRefundInput,
    isLoading,
  };
}

export function useCreateOrder() {
  const {Cart}=useCart()
  const {openModal}=useModalAction()
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const { mutate: createOrder, isLoading ,data} = useMutation(client.orders.create, {
    onSuccess: async(data) => {
    // const response= await client.orders.makePayment(data?.data.uuid)
    //  openModal("PAYMENT_MODAL",{paymentGateway:"strip",paymentIntentInfo:response.data,trackingNumber:response.data.payment_id})
          //return router.push(`${Routes.order(data.data.uuid)}/payment`)
      return data
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      toast.error(data?.message);
    },
  });

  function formatOrderInput(input: CreateOrderInput) {
    const formattedInputs = {
      ...input,
      language: locale,
      invoice_translated_text: {
        subtotal: t('order-sub-total'),
        discount: t('order-discount'),
        tax: t('order-tax'),
        delivery_fee: t('order-delivery-fee'),
        total: t('order-total'),
        products: t('text-products'),
        quantity: t('text-quantity'),
        invoice_no: t('text-invoice-no'),
        date: t('text-date'),
      },
    };
    createOrder(formattedInputs);
  }

  return {
    createOrder: formatOrderInput,
    isLoading,
    // isPaymentIntentLoading
  };
}

export function useGenerateDownloadableUrl() {
  const { mutate: getDownloadableUrl } = useMutation(
    client.orders.generateDownloadLink,
    {
      onSuccess: (data) => {
        function download(fileUrl: string, fileName: string) {
          var a = document.createElement('a');
          a.href = fileUrl;
          a.setAttribute('download', fileName);
          a.click();
        }

        download(data, 'record.name');
      },
    }
  );

  function generateDownloadableUrl(digital_file_id: string) {
    getDownloadableUrl({
      digital_file_id,
    });
  }

  return {
    generateDownloadableUrl,
  };
}

export function useVerifyOrder() {
  const [_, setVerifiedResponse] = useAtom(verifiedResponseAtom);

  return useMutation(client.orders.verify, {
    onSuccess: (data) => {
      //@ts-ignore
      if (data?.errors as string) {
        //@ts-ignore
        toast.error(data?.errors[0]?.message);
      } else if (data) {
        // FIXME
        //@ts-ignore
        setVerifiedResponse(data);
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      toast.error(data?.message);
    },
  });
}

export function useOrderPayment() {
  const queryClient = useQueryClient();

  const { mutate: createOrderPayment, isLoading } = useMutation(
    client.orders.payment,
    {
      onSettled: (data) => {
        queryClient.refetchQueries(API_ENDPOINTS.ORDERS);
        queryClient.refetchQueries(API_ENDPOINTS.ORDERS_DOWNLOADS);
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};
        toast.error(data?.message);
      },
    }
  );

  function formatOrderInput(input: CreateOrderPaymentInput) {
    const formattedInputs = {
      ...input,
    };
    createOrderPayment(formattedInputs);
  }

  return {
    createOrderPayment: formatOrderInput,
    isLoading,
  };
}

export function useSavePaymentMethod() {
  const {
    mutate: savePaymentMethod,
    isLoading,
    error,
    data,
  } = useMutation(client.orders.savePaymentMethod);

  return {
    savePaymentMethod,
    data,
    isLoading,
    error,
  };
}

export function useGetPaymentIntentOriginal({
  tracking_number,
}: {
  tracking_number: string;
}) {
  const router = useRouter();
  const { openModal } = useModalAction();

  const { data, isLoading, error, refetch } = useQuery(
    [API_ENDPOINTS.PAYMENT_INTENT, { tracking_number }],
    () => client.orders.getPaymentIntent({ tracking_number }),
    // Make it dynamic for both gql and rest
    {
      enabled: false,
      onSuccess: (data) => {
        return data?.data
        // if (data?.payment_intent_info?.is_redirect) {
        //   return router.push(data?.payment_intent_info?.redirect_url as string);
        // } else {
        //   openModal('PAYMENT_MODAL', {
        //     paymentGateway: data?.payment_gateway,
        //     paymentIntentInfo: data?.payment_intent_info,
        //     trackingNumber: data?.tracking_number,
        //   });
        // }
      },
    }
  );

  return {
    data,
    getPaymentIntentQueryOriginal: refetch,
    isLoading,
    error,
  };
}

export function useGetPaymentIntent({
  tracking_number,
  payment_gateway,
  recall_gateway,
  form_change_gateway,
}: {
  tracking_number: string;
  payment_gateway: string;
  recall_gateway?: boolean;
  form_change_gateway?: boolean;
}) {
  const router = useRouter();
  const { openModal, closeModal } = useModalAction();

  const { data, isLoading, error, refetch, isFetching } = useQuery(
    [
      API_ENDPOINTS.PAYMENT_INTENT,
      { tracking_number, payment_gateway, recall_gateway },
    ],
    () =>
      client.orders.makePayment(tracking_number,),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          return          openModal('PAYMENT_MODAL', {
            paymentGateway: "stripe",
            paymentIntentInfo: data?.data,
            trackingNumber: data?.data?.payment_id,
            refresh_id:tracking_number,
          });
        } else {
          if (recall_gateway) window.location.reload();

        }
      },
    }
  );

  return {
    data,
    getPaymentIntentQuery: refetch,
    isLoading,
    fetchAgain: isFetching,
    error,
  };
}
