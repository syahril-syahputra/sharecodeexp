
import Link from "next/link";
import classNames from "@/utils/classNames";

import {
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function SearchProduct(){
    return (
        <li>
            <Link
                href="/admin/member/buyer/product"
                className={classNames(
                false ? 'bg-gray-50' : 'hover:bg-gray-50',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                )}
            >
                <MagnifyingGlassIcon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                Search Product
            </Link>
        </li>
    )
}