import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';

export const siteSettings = {
  name: 'VDG Fashion',
  description: '',
  logo: {
    url: '/logo.png',
    alt: 'VDG Fashion',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'VDG.',
    websiteUrl: 'https://vdg-fashion-teal.vercel.app/',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'INR',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
      },
      // {
      //   href: Routes.shop.list,
      //   label: 'sidebar-nav-item-shops',
      //   icon: 'ShopIcon',
      // },
      // {
      //   href: Routes.adminMyShops,
      //   label: 'sidebar-nav-item-my-shops',
      //   icon: 'MyShopIcon',
      // },
      {
        href: Routes.product.list,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
      },
      // {
      //   href: Routes.attribute.list,
      //   label: 'sidebar-nav-item-attributes',
      //   icon: 'AttributeIcon',
      // },
      {
        href: Routes.type.list,
        label: 'sidebar-nav-item-groups',
        icon: 'TypesIcon',
      },
      {
        href: Routes.category.list,
        label: 'sidebar-nav-item-categories',
        icon: 'CategoriesIcon',
      },
      {
        href: Routes.tag.list,
        label: 'sidebar-nav-item-tags',
        icon: 'TagIcon',
      },
      // {
      //   href: Routes.manufacturer.list,
      //   label: 'sidebar-nav-item-manufacturers',
      //   icon: 'DiaryIcon',
      // },
      // {
      //   href: Routes.author.list,
      //   label: 'sidebar-nav-item-authors',
      //   icon: 'FountainPenIcon',
      // },
      {
        href: Routes.sliders.list,
        label: 'sidebar-nav-item-sliders',
        icon: 'AttributeIcon',
      },
      {
        href: Routes.offers.list,
        label: 'sidebar-nav-item-offers',
        icon: 'CouponsIcon',
      },
      {
        href: Routes.order.list,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
      },
      // {
      //   href: Routes.order.create,
      //   label: 'sidebar-nav-item-create-order',
      //   icon: 'CalendarScheduleIcon',
      // },
      // {
      //   href: Routes.user.list,
      //   label: 'sidebar-nav-item-users',
      //   icon: 'UsersIcon',
      // },
      {
        href: Routes.coupon.list,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon',
      },
      // {
      //   href: Routes.tax.list,
      //   label: 'sidebar-nav-item-taxes',
      //   icon: 'TaxesIcon',
      // },
      {
        href: Routes.shipping.list,
        label: 'sidebar-nav-item-shippings',
        icon: 'ShippingsIcon',
      },
      // {
      //   href: Routes.withdraw.list,
      //   label: 'sidebar-nav-item-withdraws',
      //   icon: 'WithdrawIcon',
      // },
      // {
      //   href: Routes.message.list,
      //   label: 'sidebar-nav-item-message',
      //   icon: 'ChatIcon',
      // },
      // {
      //   href: Routes.refund.list,
      //   label: 'sidebar-nav-item-refunds',
      //   icon: 'RefundsIcon',
      // },
      // {
      //   href: Routes.question.list,
      //   label: 'sidebar-nav-item-questions',
      //   icon: 'QuestionIcon',
      // },
      // {
      //   href: Routes.storeNotice.list,
      //   label: 'sidebar-nav-item-store-notice',
      //   icon: 'StoreNoticeIcon',
      // },
      // {
      //   href: Routes.reviews.list,
      //   label: 'sidebar-nav-item-reviews',
      //   icon: 'ReviewIcon',
      // },
      {
        href: Routes.settings,
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon',
      },
    ],
    shop: [
      {
        href: (shop: string) => `${Routes.dashboard}${shop}`,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.attribute.list}`,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.product.list}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.author.list}`,
        label: 'sidebar-nav-item-authors',
        icon: 'FountainPenIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.manufacturer.list}`,
        label: 'sidebar-nav-item-manufacturers',
        icon: 'DiaryIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.order.list}`,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.refund.list}`,
        label: 'sidebar-nav-item-refunds',
        icon: 'RefundsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.staff.list}`,
        label: 'sidebar-nav-item-staffs',
        icon: 'UsersIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
        label: 'sidebar-nav-item-withdraws',
        icon: 'AttributeIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.reviews.list}`,
        label: 'sidebar-nav-item-reviews',
        icon: 'ReviewIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.question.list}`,
        label: 'sidebar-nav-item-questions',
        icon: 'QuestionIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.storeNotice.list}`,
        label: 'sidebar-nav-item-store-notice',
        icon: 'StoreNoticeIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
