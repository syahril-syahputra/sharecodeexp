import * as routeUrl from '@/route/route-url'
import { UserIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'My Account', href: routeUrl.MyAccountUrl.view, icon: UserIcon, current: false },
];

export default navigation;