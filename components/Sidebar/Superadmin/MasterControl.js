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
            User Control
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/superadmin/usercontrol/vendors"
                    className={
                        "text-xs uppercase py-2 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/usercontrol/vendors") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-users text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Vendors
                    </Link>
                </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link href="/admin/superadmin/usercontrol/contributors"
                    className={
                        "text-xs uppercase py-2 font-bold block " +
                        (router.pathname.indexOf("/admin/superadmin/usercontrol/contributors") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }>
                        <i className="fas fa-users text-blueGray-400 mr-2 text-sm"></i>{" "}
                        Contributors
                    </Link>
                </li>
            </ul>
        </>
    )

}