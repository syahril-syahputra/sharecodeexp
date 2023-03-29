import { useRouter } from "next/router";
import Link from "next/link";

export default function Statistics(){

    const router = useRouter()

    return(
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Statistics
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/companycontrol/company"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/companycontrol/company") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-heart-crack text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Unfound Components
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/superadmin/statistics/memberstatistic"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/statistics/memberstatistic") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-chart-line text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Member Statistics
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/superadmin/statistics/orderstatistic"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/statistics/orderstatistic") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-truck text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Order Statistics
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/companycontrol/company"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/companycontrol/company") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-database text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Database Statistics
                    </Link>
                </li>
            </ul>

        </>
    )

}