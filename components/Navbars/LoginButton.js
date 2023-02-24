import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const {data, status} = useSession();
    if (status === 'authenticated') {
        return (
        <>
            <li className="flex items-center">
                <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                    target="_blank"
                >
                    <i className="text-blueGray-400 fas fa-home text-lg leading-lg " />
                    <span className="lg:hidden inline-block ml-2">Dashboard</span>
                </a>
            </li>

            <li>
                <button
                    onClick={() => {
                        signOut();
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