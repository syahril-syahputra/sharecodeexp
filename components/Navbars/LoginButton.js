import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import IndexUserDropdown from "components/Dropdowns/IndexUserDropdown.js";
import UserPopover from "components/Shared/Popover/UserPopover"

export default function Component() {
    const {data, status} = useSession();
    if (status === 'authenticated') {
        return (
        <>
            <li className="flex items-center mr-5">
                <Link href="/admin/dashboard">
                    <i className="text-blueGray-400 fas fa-home text-lg leading-lg " />
                    <span className="lg:hidden inline-block ml-2">Dashboard</span>
                </Link>
            </li>
            <li>
                <IndexUserDropdown />
            </li>
            <li>
            <button title="Logout"
                className="bg-indigo-900 text-white active:bg-blueGray-600 text-xs font-bold px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 ease-linear transition-all duration-150"
            type="button"
            >
            <i className="fas fa-right-from-bracket"></i> 
                
            </button>
            </li>
            
        </>
        )
    }
    return (
        <>
            <li>
                <button
                    onClick={() => {
                        signIn();
                    }}
                    className="bg-blue-900 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    >
                    <i className="fas fa-user mr-2"></i> 
                    Sign In
                </button>
            </li>
        </>
    )
}