import { useRouter } from "next/router";
import Link from "next/link";

export default function CompanyControl(){

    const router = useRouter()

    return(
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Company Control
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                    <Link href="/admin/companycontrol/company"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/companycontrol/company") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-building text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Company List
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                    <Link href="/admin/companycontrol/product"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/companycontrol/product") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-shop text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Product List
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                    <Link href="/admin/companycontrol/order"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/companycontrol/order") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-truck text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Order List
                    </Link>
                </li>
            </ul>
        </>
    )

}