import type {
  Attachment,
  Author,
  AuthorPaginator,
  AuthorQueryOptions,
  AuthResponse,
  CategoryPaginator,
  CategoryQueryOptions,
  ChangePasswordUserInput,
  CheckoutVerificationInput,
  CouponPaginator,
  CouponQueryOptions,
  CreateAbuseReportInput,
  CreateContactUsInput,
  CreateFeedbackInput,
  CreateOrderInput,
  CreateQuestionInput,
  CreateRefundInput,
  CreateReviewInput,
  DownloadableFilePaginator,
  Feedback,
  ForgotPasswordUserInput,
  LoginUserInput,
  Manufacturer,
  ManufacturerPaginator,
  ManufacturerQueryOptions,
  MyQuestionQueryOptions,
  MyReportsQueryOptions,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  OrderStatusPaginator,
  OtpLoginInputType,
  OTPResponse,
  PasswordChangeResponse,
  PopularProductQueryOptions,
  Product,
  ProductPaginator,
  ProductQueryOptions,
  QueryOptions,
  QuestionPaginator,
  QuestionQueryOptions,
  Refund,
  RefundPaginator,
  RegisterUserInput,
  ResetPasswordUserInput,
  Review,
  ReviewPaginator,
  ReviewQueryOptions,
  ReviewResponse,
  SendOtpCodeInputType,
  Settings,
  Shop,
  ShopPaginator,
  ShopQueryOptions,
  SocialLoginInputType,
  TagPaginator,
  TagQueryOptions,
  Type,
  TypeQueryOptions,
  UpdateReviewInput,
  UpdateUserInput,
  User,
  VerifiedCheckoutData,
  VerifyCouponInputType,
  VerifyCouponResponse,
  VerifyForgotPasswordUserInput,
  VerifyOtpInputType,
  Wishlist,
  WishlistPaginator,
  WishlistQueryOptions,
  GetParams,
  SettingsQueryOptions,
  CreateOrderPaymentInput,
  SetupIntentInfo,
  PaymentIntentCollection,
  Card,
  BestSellingProductQueryOptions,
  UpdateEmailUserInput,
  EmailChangeResponse,
  VerificationEmailUserInput,
  StoreNoticeQueryOptions,
  StoreNoticePaginator,
  StoreNotice,
  //@ts-ignore
  ShopMapLocation,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
//@ts-ignore
import { OTPVerifyResponse } from '@/types';
import { findAllTypesRoute } from '@/data/types/types.controller';
import { findAllSettings } from '@/data/settings/settings.service';
import { getTypeBySlug } from '@/data/types/types.service';
import { getProducts } from '@/data/products/products.service';
import { getCategoriesRoute } from '@/data/categories/categories.controller';
import { getPopularProductsRoute } from '@/data/products/products.controller';
import { getStoreNotices } from '@/data/store-notices/store-notices.service';
import { getProductsRoute } from '@/data/products/products.controller';

class Client {
  products = {
    all: ({
      pageSize,
      ...params
    }: Partial<ProductQueryOptions>) => 
      HttpClient.getProducts<ProductPaginator>(API_ENDPOINTS.PRODUCTS,{"page-size":pageSize,...params}),
      variantProducts: ({
        id,
        ...params
      }: any) => 
        HttpClient.getProductVariant<ProductPaginator>(API_ENDPOINTS.PRODUCTS,{"base_product":id}),
        MainProducts: ({
          id,
          ...params
        }: any) => 
          HttpClient.getProductVariant<ProductPaginator>(API_ENDPOINTS.PRODUCTS,{"id":id}),
  
    popular: (params: Partial<PopularProductQueryOptions>) =>getPopularProductsRoute(params),
      // HttpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_POPULAR, params),

    bestSelling: (params: Partial<BestSellingProductQueryOptions>) =>
      HttpClient.get<Product[]>(API_ENDPOINTS.BEST_SELLING_PRODUCTS, params),

    questions: ({ question, ...params }: QuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.PRODUCTS_QUESTIONS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          question,
        }),
      }),
    getCountry:()=>HttpClient.get(API_ENDPOINTS.COUNTRY),
    changeCountry:(data:any)=>HttpClient.post(API_ENDPOINTS.CHANGE_COUNTRY,data),
    get: ({ slug }: GetParams) => 
      HttpClient.getUniqueProduct<Product>(`${API_ENDPOINTS.PRODUCTS}${slug}/`),

    createFeedback: (input: CreateFeedbackInput) =>
      HttpClient.post<Feedback>(API_ENDPOINTS.FEEDBACK, input),
    createAbuseReport: (input: CreateAbuseReportInput) =>
      HttpClient.post<Review>(
        API_ENDPOINTS.PRODUCTS_REVIEWS_ABUSE_REPORT,
        input
      ),
    createQuestion: (input: CreateQuestionInput) =>
      HttpClient.post<Review>(API_ENDPOINTS.PRODUCTS_QUESTIONS, input),
  };
  cart={
    all:()=>HttpClient.get(API_ENDPOINTS.GET_CART),
    update:(data:any)=>HttpClient.Update(API_ENDPOINTS.ADD_CART,data),
    updateAddress:(data:any)=>HttpClient.Update(API_ENDPOINTS.ADD_ADDRESS_TO_CART,data),
    addNote:(data:any,uuid:any)=>HttpClient.Update(`${API_ENDPOINTS.NOTE}`,data)
  }
  myQuestions = {
    all: (params: MyQuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.MY_QUESTIONS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  myReports = {
    all: (params: MyReportsQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.MY_REPORTS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  reviews = {
    all: ({ rating, ...params }: ReviewQueryOptions) =>
      HttpClient.get<ReviewPaginator>(API_ENDPOINTS.PRODUCTS_REVIEWS, {
        searchJoin: 'and',
        with: 'user',
        ...params,
        search: HttpClient.formatSearchParams({
          rating,
        }),
      }),
    get: ({ id }: { id: string }) =>
      HttpClient.get<Review>(`${API_ENDPOINTS.PRODUCTS_REVIEWS}/${id}`),
    create: (input: CreateReviewInput) =>
      HttpClient.post<ReviewResponse>(API_ENDPOINTS.PRODUCTS_REVIEWS, input),
    update: (input: UpdateReviewInput) =>
      HttpClient.put<ReviewResponse>(
        `${API_ENDPOINTS.PRODUCTS_REVIEWS}/${input.id}`,
        input
      ),
  };
  categories = {
    all: ({ type, ...params }: Partial<CategoryQueryOptions>) =>
    // getCategoriesRoute(
    //   {
    //     searchJoin: 'and',
    //     ...params,
    //     ...(type && { search: HttpClient.formatSearchParams({ type }) }),
    //   }
    // ),
    HttpClient.get<CategoryPaginator>(API_ENDPOINTS.CATEGORIES,params),
  };
  groups = {
    all : () => HttpClient.get(API_ENDPOINTS.GROUPS)
  }
  tags = {
    all: (params: Partial<TagQueryOptions>) => 
      HttpClient.get<TagPaginator>(API_ENDPOINTS.TAGS, params),
  };
  types = {
    all: (params?: Partial<TypeQueryOptions>) => findAllTypesRoute(params),
      // HttpClient.get<Type[]>(API_ENDPOINTS.TYPES, params),
    get: ({ slug, language }: { slug: string; language: string }) =>findAllTypesRoute(`${API_ENDPOINTS.TYPES}/${slug}`, { language }),
      // HttpClient.get<Type>(`${API_ENDPOINTS.TYPES}/${slug}`, { language }),
  };
  sliders = {
    all: (params?: Partial<TypeQueryOptions>) => HttpClient.get(API_ENDPOINTS.SLIDERS+"/active"),
  };
  shops = {
    all: (params: Partial<ShopQueryOptions>) =>
      HttpClient.get<ShopPaginator>(API_ENDPOINTS.SHOPS, {
        search: HttpClient.formatSearchParams({
          is_active: '1',
        }),
        ...params,
      }),
    get: (slug: string) =>
      HttpClient.get<Shop>(`${API_ENDPOINTS.SHOPS}/${slug}`),

    searchNearShops: (input: ShopMapLocation) =>
      HttpClient.get<any>(API_ENDPOINTS.NEAR_SHOPS, input),

    getSearchNearShops: ({ lat, lng }: ShopMapLocation) =>
      HttpClient.get<any>(`${API_ENDPOINTS.NEAR_SHOPS}/${lat}/${lng}`),
  };
  storeNotice = {
    all: ({ shop_id, ...params }: Partial<StoreNoticeQueryOptions>) => {
      return getStoreNotices(
        {
          searchJoin: 'and',
          shop_id: shop_id,
          ...params,
          search: HttpClient.formatSearchParams({ shop_id }),
        }
      )
      // HttpClient.get<StoreNoticePaginator>(API_ENDPOINTS.STORE_NOTICES, {
      //   searchJoin: 'and',
      //   shop_id: shop_id,
      //   ...params,
      //   search: HttpClient.formatSearchParams({ shop_id }),
      // });
    },
  };
  authors = {
    all: ({ name, ...params }: Partial<AuthorQueryOptions>) => {
      return HttpClient.get<AuthorPaginator>(API_ENDPOINTS.AUTHORS, {
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      });
    },
    top: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<Author[]>(API_ENDPOINTS.AUTHORS_TOP, params),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Author>(`${API_ENDPOINTS.AUTHORS}/${slug}`, {
        language,
      }),
  };
  manufacturers = {
    all: ({ name, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClient.get<ManufacturerPaginator>(API_ENDPOINTS.MANUFACTURERS, {
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      }),
    top: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<Manufacturer[]>(API_ENDPOINTS.MANUFACTURERS_TOP, params),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Manufacturer>(`${API_ENDPOINTS.MANUFACTURERS}/${slug}`, {
        language,
      }),
  };
  coupons = {
    all: (params: Partial<CouponQueryOptions>) =>
      HttpClient.get<CouponPaginator>(API_ENDPOINTS.COUPONS, params),
    verify: (input: VerifyCouponInputType) =>
      HttpClient.post<VerifyCouponResponse>(
        API_ENDPOINTS.COUPONS_VERIFY,
        input
      ),
  };
  orders = {
    cancelOrder:(id:any,data:any)=>HttpClient.Update(`${API_ENDPOINTS.ORDERS}${id}/cancel/`,data),
    all: () =>
      HttpClient.get<OrderPaginator>(API_ENDPOINTS.USER_ORDER),
    get: (tracking_number: string) =>
      HttpClient.get<Order>(`${API_ENDPOINTS.ORDERS}${tracking_number}`),
    create: (input: CreateOrderInput) =>
      HttpClient.get<Order>(API_ENDPOINTS.PLACE_ORDER),
    refunds: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<RefundPaginator>(API_ENDPOINTS.ORDERS_REFUNDS, params),
    createRefund: (input: CreateRefundInput) =>
      HttpClient.post<Refund>(API_ENDPOINTS.ORDERS_REFUNDS, input),
    payment: (input: CreateOrderPaymentInput) =>
      HttpClient.post<any>(API_ENDPOINTS.ORDERS_PAYMENT, input),
    savePaymentMethod: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.SAVE_PAYMENT_METHOD, input),
    makePayment:(uuid:string)=>HttpClient.get(`${API_ENDPOINTS.PAYMENT}${uuid}${API_ENDPOINTS.ORDERS_PAYMENT}`),
    RefreshPayment:(id:string,data:any)=>HttpClient.post(`${API_ENDPOINTS.PAYMENT}${id}${API_ENDPOINTS.REFERESH_PAYMENTS}`,data,{}),
    downloadable: (query?: OrderQueryOptions) =>
      HttpClient.get<DownloadableFilePaginator>(
        API_ENDPOINTS.ORDERS_DOWNLOADS,
        query
      ),
    verify: (input: CheckoutVerificationInput) =>
      HttpClient.post<VerifiedCheckoutData>(
        API_ENDPOINTS.ORDERS_CHECKOUT_VERIFY,
        input
      ),
    generateDownloadLink: (input: { digital_file_id: string }) =>
      HttpClient.post<string>(
        API_ENDPOINTS.GENERATE_DOWNLOADABLE_PRODUCT_LINK,
        input
      ),
    getPaymentIntentOriginal: ({
      tracking_number,
    }: {
      tracking_number: string;
    }) =>
      HttpClient.get<PaymentIntentCollection>(API_ENDPOINTS.PAYMENT_INTENT, {
        tracking_number,
      }),
    getPaymentIntent: ({
      tracking_number,
      payment_gateway,
      recall_gateway,
    }: {
      tracking_number: string;
      payment_gateway?: string;
      recall_gateway?: boolean;
    }) =>
      HttpClient.get<PaymentIntentCollection>(API_ENDPOINTS.PAYMENT_INTENT, {
        tracking_number,
        payment_gateway,
        recall_gateway,
      }),
  };
  users = {
    me: () => HttpClient.getUserInfo<User>(API_ENDPOINTS.USERS_ME),
    update: (user: UpdateUserInput) =>
      HttpClient.Update<User>(`${API_ENDPOINTS.USERS_ME}`, user),
    address:(address:any)=>HttpClient.post(`${API_ENDPOINTS.ADDRESS}`,address),
    getAdrress:()=>HttpClient.get(API_ENDPOINTS.GET_ADDRESS),
    login: (input: LoginUserInput) =>
    HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
    socialLogin: (input: SocialLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.SOCIAL_LOGIN, input),
    sendOtpCode: (input: SendOtpCodeInputType) =>
      HttpClient.post<OTPResponse>(API_ENDPOINTS.SEND_OTP_CODE, input),
    verifyOtpCode: (input: VerifyOtpInputType) =>
      HttpClient.post<OTPVerifyResponse>(API_ENDPOINTS.VERIFY_OTP_CODE, input),
    OtpLogin: (input: OtpLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.OTP_LOGIN, input),
    register: (input: RegisterUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_REGISTER, input),
    forgotPassword: (input: ForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_FORGOT_PASSWORD,
        input
      ),
    verifyForgotPasswordToken: (input: VerifyForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_VERIFY_FORGOT_PASSWORD_TOKEN,
        input
      ),
    resetPassword: (input: ResetPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_RESET_PASSWORD,
        input
      ),
    changePassword: (input: ChangePasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_CHANGE_PASSWORD,
        input
      ),
    updateEmail: (input: UpdateEmailUserInput) =>
      HttpClient.post<EmailChangeResponse>(
        API_ENDPOINTS.USERS_UPDATE_EMAIL,
        input
      ),
    logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
    deleteAddress: ({ id }: { id: string }) =>
      HttpClient.delete<boolean>(`${API_ENDPOINTS.USERS_ADDRESS}/${id}`),
    subscribe: (input: { email: string }) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_SUBSCRIBE_TO_NEWSLETTER, input),
    contactUs: (input: CreateContactUsInput) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_CONTACT_US, input),
    resendVerificationEmail: () => {
      return HttpClient.post<VerificationEmailUserInput>(
        API_ENDPOINTS.SEND_VERIFICATION_EMAIL,
        {}
      );
    },
  };
  wishlist = {
    all: (params: WishlistQueryOptions) =>
      HttpClient.get<WishlistPaginator>(API_ENDPOINTS.USERS_WISHLIST, {
        with: 'shop',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
    toggle: (input: { product_id: string; language?: string }) =>
      HttpClient.post<{ in_wishlist: boolean }>(
        API_ENDPOINTS.USERS_WISHLIST_TOGGLE,
        input
      ),
    remove: (id: string) =>
      HttpClient.delete<Wishlist>(`${API_ENDPOINTS.WISHLIST}/${id}`),
    checkIsInWishlist: ({ product_id }: { product_id: string }) =>
      HttpClient.get<boolean>(
        `${API_ENDPOINTS.WISHLIST}/in_wishlist/${product_id}`
      ),
  };
  settings = {
    all: (params?: SettingsQueryOptions) =>
      // findAllSettings(),
      HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS, { ...params }),
    upload: (input: File[]) => {
      let formData = new FormData();
      input.forEach((attachment) => {
        formData.append('attachment[]', attachment);
      });
      return HttpClient.post<Attachment[]>(API_ENDPOINTS.UPLOADS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  };
  cards = {
    all: (params?: any) =>
      HttpClient.get<Card[]>(API_ENDPOINTS.CARDS, { ...params }),
    remove: ({ id }: { id: string }) =>
      HttpClient.delete<any>(`${API_ENDPOINTS.CARDS}/${id}`),
    addPaymentMethod: (method_key: any) =>
      HttpClient.post<any>(API_ENDPOINTS.CARDS, method_key),
    makeDefaultPaymentMethod: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.SET_DEFAULT_CARD, input),
  };
  faq={
    get:()=>HttpClient.get(API_ENDPOINTS?.FAQ)
  }
  offers = {
    all: ({ pageSize, ...params }: Partial<any>) =>
      HttpClient.get<any>(API_ENDPOINTS.OFFERS, { "page-size": pageSize, ...params }),
  
    active: ({ pageSize, ...params }: Partial<any>) =>
      HttpClient.get<any>(API_ENDPOINTS.OFFERS, { "page-size": pageSize, ...params }),
  
    expired: ({ pageSize, ...params }: Partial<any>) =>
      HttpClient.get<any>(API_ENDPOINTS.OFFERS, { "page-size": pageSize, ...params }),
  
    get: ({ id }: any) =>
      HttpClient.get<any>(`${API_ENDPOINTS.OFFERS}${id}/`),
  
    create: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.OFFERS, input),
  
    update: (id: string, input: any) =>
      HttpClient.put<any>(`${API_ENDPOINTS.OFFERS}${id}/`, input),
  
    delete: (id: string) =>
      HttpClient.delete(`${API_ENDPOINTS.OFFERS}${id}/`),
  
    apply: (offerId: string, data: any) =>
      HttpClient.post<any>(API_ENDPOINTS.OFFERS, { offerId, ...data }),
  
    getOfferQuestions: ({ offerId, ...params }: any) =>
      HttpClient.get<any>(API_ENDPOINTS.OFFERS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          offerId,
        }),
      }),
  
    createOfferFeedback: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.OFFERS, input),
  
    reportOfferAbuse: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.OFFERS, input),
  };
  
}

export default new Client();
