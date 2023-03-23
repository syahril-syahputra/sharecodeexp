import { useRouter } from "next/router";
import Link from "next/link";

export default function Registry(){

    const router = useRouter()

    return(
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Registry
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-1">
                <li className="items-center">
                    <Link href="/admin/superadmin/registry/pendingcompany"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/registry/pendingcompany") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-clock text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Pending Company 
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-1">
                <li className="items-center">
                    <Link href="/admin/superadmin/registry/approvedcompany"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/registry/approvedcompany") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-check text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Approved Company
                    </Link>
                </li>
            </ul>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-1">
                <li className="items-center">
                    <Link href="/admin/superadmin/registry/rejectedcompany"
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/registry/rejectedcompany") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-times text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Rejected Company 
                    </Link>
                </li>
            </ul>

        </>
    )

}