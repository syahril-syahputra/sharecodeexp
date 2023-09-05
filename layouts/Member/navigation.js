import * as routeUrl from '@/route/route-url'
import {
  HomeIcon,
  Cog8ToothIcon,
  ShoppingCartIcon,
  FolderIcon,
} from '@heroicons/react/24/outline'

export const dahsboard = [
  { name: 'Dashboard', href: routeUrl.VendorUrl.dahsboard, icon: HomeIcon, current: false },
]

export const sellerDahsboard = [
  { name: 'Dashboard', href: routeUrl.VendorUrl.sellerDahsboard, icon: HomeIcon, current: false },
]

export const sellerNavigation = [
  {
    name: 'My Products',
    icon: Cog8ToothIcon,
    current: false,
    href: routeUrl.VendorUrl.sellingProduct.product
  },
  {
    name: 'Incoming Inquiries',
    icon: Cog8ToothIcon,
    current: false,
    href: routeUrl.VendorUrl.sellingProduct.incomingInquiries.index
  },
]

export const buyerDahsboard = [
  { name: 'Dashboard', href: routeUrl.VendorUrl.buyerDahsboard, icon: HomeIcon, current: false },
]

export const buyerNavigation = [
  {
    name: 'Inquired Products',
    icon: Cog8ToothIcon,
    current: false,
    href: routeUrl.VendorUrl.buyingProduct.inquiredProduct.index
  },
]

export const vendorsNavigation = [
  {
    name: 'Management',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'My Company', href: routeUrl.VendorUrl.management.myCompany.details },
      { name: 'Contributors', href: routeUrl.VendorUrl.management.contributors.index },
    ],
  },
];
