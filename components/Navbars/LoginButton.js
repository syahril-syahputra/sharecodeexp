import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Component() {
    const {data, status} = useSession();
    if (status === 'authenticated') {
        return (
        <>
            <li className="flex items-center">
                <Link href="/admin/dashboard">
                    <i className="text-blueGray-400 fas fa-home text-lg leading-lg " />
                    <span className="lg:hidden inline-block ml-2">Dashboard</span>
                </Link>
            </li>

            <li>
                <button
                    onClick={() => {
                        signOut({
                            callbackUrl: `${window.location.origin}`
                          });
                    }}
                    className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    >
                    <i className="fas fa-arrow-right-from-bracket mr-2"></i> 
                    Sign Out
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
                    className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    >
                    <i className="fas fa-user mr-2"></i> 
                    Sign In
                </button>
            </li>
        </>
    )
}