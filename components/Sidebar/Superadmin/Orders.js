import { useRouter } from "next/router";
import Link from "next/link";

export default function Orders(){

    const router = useRouter()

    return(
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Orders
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-truck-fast text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Active Orders
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-handshake text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Completed Orders
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-thumbs-down text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Rejected Orders
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-ban text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Cancelled Orders
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/asd") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-building text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Company Order List
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-credit-card text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Pending Payments
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-dolly text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Pending Shipments
                    </Link>
                </li>
            </ul>   

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/index"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/index") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-ship text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Completed Shipments
                    </Link>
                </li>
            </ul>

        </>
    )

}