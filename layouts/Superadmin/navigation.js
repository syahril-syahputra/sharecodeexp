import * as routeUrl from '@/route/route-url'
import {
  HomeIcon,
  UsersIcon,
  BuildingOffice2Icon,
  Cog8ToothIcon,
  ShoppingCartIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline'

export const dahsboard = [
  { name: 'Dashboard', href: routeUrl.AdminUrl.dahsboard, icon: HomeIcon, current: false },
]
export const navigation = [    
    {
      name: 'Registry',
      icon: BuildingOffice2Icon,
      current: false,
      children: [
        { name: 'Pending Companies', href: routeUrl.AdminUrl.registry.pending },
        { name: 'Accepted Companies', href: routeUrl.AdminUrl.registry.approved },
        { name: 'Rejected Companies', href: routeUrl.AdminUrl.registry.rejected },
      ],
    },
    {
      name: 'Components',
      icon: Cog8ToothIcon,
      current: false,
      children: [
        { name: 'Pending Components', href: routeUrl.AdminUrl.componentManagement.pending },
        { name: 'Accepted Components', href: routeUrl.AdminUrl.componentManagement.accepted },
        { name: 'Rejected Components', href: routeUrl.AdminUrl.componentManagement.rejected },
      ],
    },
    {
      name: 'Orders',
      icon: ShoppingCartIcon,
      current: false,
      children: [
        { name: 'Find by Status', href: routeUrl.AdminUrl.orderComponent.allOrders },
        { name: 'Active Orders', href: routeUrl.AdminUrl.orderComponent.activeOrders },
        { name: 'Completed Orders', href: routeUrl.AdminUrl.orderComponent.completedOrder },
        { name: 'Rejected Quotations', href: routeUrl.AdminUrl.orderComponent.rejectedQuotation },
        { name: 'Rejected Orders', href: routeUrl.AdminUrl.orderComponent.rejectedOrders },
        { name: 'Cancelled Orders', href: routeUrl.AdminUrl.orderComponent.cancelledOrders },
        { name: 'Buyer Orders', href: routeUrl.AdminUrl.orderComponent.companyOrderBuyer },
        { name: 'Seller Orders', href: routeUrl.AdminUrl.orderComponent.companyOrderSeller },
        { name: 'Pending Payments', href: routeUrl.AdminUrl.orderComponent.pendingPayment },
        { name: 'Pending Shipments', href: routeUrl.AdminUrl.orderComponent.pendingShipment },
        { name: 'Completed Shipments', href: routeUrl.AdminUrl.orderComponent.completedShipment },
      ],
    },
    {
      name: 'Statistics',
      icon: ChartPieIcon,
      current: false,
      children: [
        { name: 'Unfound Components', href: routeUrl.AdminUrl.statistic.unfoundComponents },
        { name: 'Member Statistic', href: routeUrl.AdminUrl.statistic.memberStatistics },
        { name: 'Order Statistic', href: routeUrl.AdminUrl.statistic.orderStatistics },
        { name: 'Database Statistic', href: routeUrl.AdminUrl.statistic.databaseStatistics },
      ],
    },
    {
      name: 'User Control',
      icon: UsersIcon,
      current: false,
      children: [
        { name: 'Vendors', href: routeUrl.AdminUrl.userControl.vendors },
        { name: 'Contributors', href: routeUrl.AdminUrl.userControl.contributors },
      ],
    },
  ];

  export default navigation;