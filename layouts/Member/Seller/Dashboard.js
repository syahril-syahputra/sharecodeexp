import Link from "next/link";
import classNames from "@/utils/classNames";

import {
    HomeIcon
} from '@heroicons/react/24/outline'
import { VendorUrl } from "@/route/route-url";

export default function Dashboard(){
    return (
        <>
            <li>
                <Link
                    href={VendorUrl.sellerDahsboard}
                    className={classNames(
                    false ? 'bg-gray-50' : 'hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                    )}
                >
                    <HomeIcon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                    Dashboard
                </Link>
            </li>
        </>
    )
}