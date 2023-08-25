import * as routeUrl from '@/route/route-url'
import {
  HomeIcon,
  Cog8ToothIcon,
  ShoppingCartIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline'

export const dahsboard = [
  { name: 'Dashboard', href: routeUrl.VendorUrl.dahsboard, icon: HomeIcon, current: false },
]

export const protectedNavigation = [
  {
    name: 'Selling Components',
    icon: Cog8ToothIcon,
    current: false,
    children: [
      { name: 'My Stocks', href: routeUrl.VendorUrl.sellingComponent.stocks.approved },
      { name: 'Incoming Inquiries', href: routeUrl.VendorUrl.sellingComponent.incomingInquiries.index },
    ],
  },
  {
    name: 'Buying Components',
    icon: ShoppingCartIcon,
    current: false,
    children: [
      { name: 'Inquiry List', href: routeUrl.VendorUrl.buyingComponent.inquiryList.index },
      { name: 'Inquired Components', href: routeUrl.VendorUrl.buyingComponent.inquiredComponents.index },
    ],
  },
]

export const vendorsNavigation = [
    {
      name: 'Settings',
      icon: WrenchIcon,
      current: false,
      children: [
        { name: 'My Company', href: routeUrl.VendorUrl.settings.myCompany.details },
        { name: 'Contributors', href: routeUrl.VendorUrl.settings.contributors.index },
      ],
    },
  ];
