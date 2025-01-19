import mongoose from 'mongoose';

const SeoSchema = new mongoose.Schema({
  ogImage: String,
  ogTitle: String,
  metaTags: String,
  metaTitle: String,
  canonicalUrl: String,
  ogDescription: String,
  twitterHandle: String,
  metaDescription: String,
  twitterCardType: String,
});

const LogoSchema = new mongoose.Schema({
  id: String,
  file: String,
  uuid: String,
});

const ContactSchema = new mongoose.Schema({
  contact: String,
  socials: [
    {
      url: String,
      icon: String,
    },
  ],
  website: String,
  location: {
    lat: Number,
    lng: Number,
    zip: String,
    city: String,
    state: String,
    country: String,
    formattedAddress: String,
  },
});

const PaymentGatewaySchema = new mongoose.Schema({
  name: String,
  title: String,
});

const DeliveryTimeSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const SettingsSchema = new mongoose.Schema({
  siteTitle: String,
  siteSubtitle: String,
  minimumOrderAmount: Number,
  currencyToWalletRatio: Number,
  signupPoints: Number,
  maximumQuestionLimit: Number,
  seo: SeoSchema,
  logo: LogoSchema,
  useAi: Boolean,
  useOtp: Boolean,
  currency: String,
  smsEvent: Object,
  taxClass: Number,
  defaultAi: String,
  emailEvent: Object,
  server_info: Object,
  deliveryTime: [DeliveryTimeSchema],
  freeShipping: Boolean,
  useGoogleMap: Boolean,
  guestCheckout: Boolean,
  shippingClass: Number,
  StripeCardOnly: Boolean,
  contactDetails: ContactSchema,
  paymentGateway: [PaymentGatewaySchema],
  currencyOptions: Object,
  isProductReview: Boolean,
  maxShopDistance: Number,
  useEnableGateway: Boolean,
  useCashOnDelivery: Boolean,
  freeShippingAmount: Number,
  useMustVerifyEmail: Boolean,
  defaultPaymentGateway: String,
  language: String,
}, { timestamps: true });

const Settings = mongoose.model('Settings', SettingsSchema);

export default Settings
