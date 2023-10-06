import * as routeUrl from '@/route/route-url';
import {HomeIcon, UsersIcon, ChartPieIcon} from '@heroicons/react/24/outline';

export const dahsboard = [
  {
    name: 'Dashboard',
    href: routeUrl.AdminUrl.dahsboard,
    icon: HomeIcon,
    current: false,
  },
];
export const navigation = [
  {
    name: 'Statistics',
    icon: ChartPieIcon,
    current: false,
    children: [
      {
        name: 'Unfound Components',
        href: routeUrl.AdminUrl.statistic.unfoundComponents,
      },
      {
        name: 'Member Statistic',
        href: routeUrl.AdminUrl.statistic.memberStatistics,
      },
      {
        name: 'Order Statistic',
        href: routeUrl.AdminUrl.statistic.orderStatistics,
      },
      {
        name: 'Database Statistic',
        href: routeUrl.AdminUrl.statistic.databaseStatistics,
      },
    ],
  },
  {
    name: 'User Control',
    icon: UsersIcon,
    current: false,
    children: [
      {name: 'Vendors', href: routeUrl.AdminUrl.userControl.vendors},
      {name: 'Subscribers', href: routeUrl.AdminUrl.userControl.contributors},
    ],
  },
];

export default navigation;
