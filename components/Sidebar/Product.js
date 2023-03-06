import { useRouter } from "next/router"
import Link from "next/link";

export default function ProductBar(){
    const router = useRouter()

    return (
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Product
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/product/myproduct"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/product/myproduct") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-shop text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Product 
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/product/mycart"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/product/mycart") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-cart-shopping text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Cart
                    <span className="ml-5 text-xs font-semibold inline-block py-1 px-2 uppercase text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                      2
                    </span>
                </Link>

              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/product/myorder"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/product/myorder") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-truck text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Order 
                </Link>
              </li>
            </ul>
        </>
    )
}