import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react"

import GlobalContext from "@/store/global-context";

import Registry from "@/layouts/Superadmin/Registry";
import ProductManagement from "@/layouts/Superadmin/ProductManagement";
import Order from "@/layouts/Superadmin/Order";

export default function MainSidebar(){
  const session = useSession()

    const {
        adminSidebarCounter,
        loadAdminSidebarCounter
    } = useContext(GlobalContext)

    useEffect(() => {
        loadAdminSidebarCounter(session.data.accessToken)
    }, [session])

    return(
      <>
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
                <ul role="list" className="-mx-2 space-y-1">
                    <Registry registry={adminSidebarCounter.registry}/>
                    <ProductManagement product={adminSidebarCounter.product}/>
                    <Order order={adminSidebarCounter.order}/>
                </ul>
                </li>
            </ul>
        {/* Divider */}
        <hr className="md:min-w-full my-5" />
      </>
    )
}