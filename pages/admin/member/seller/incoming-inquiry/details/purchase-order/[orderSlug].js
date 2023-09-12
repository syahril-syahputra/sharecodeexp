import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import PurchaseOrderPDFComp from "@/components/PDF/Order/PurchaseOrder"
export default function PurchaseOrderPDF({purchaseOrder}){
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
      setIsClient(true)
    }, [])
  return(
      <>
      { isClient ?
        <div>
          <div className="h-screen bg-gray-300 w-full grid place-items-center">
            <PDFViewer width={1000} height={750}>
              <PurchaseOrderPDFComp purchaseOrder={purchaseOrder}/>
            </PDFViewer>
          </div>
        </div>
      : 'Loading...'}
    </>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
        return {
        redirect: {
            permanent: false,
            destination: '/admin/dashboard',
        },
        };
    }
    let purchaseOrder = {}
    const response = await axios.get(`/seller/order/${context.query.orderSlug}/detail`,
    {
    headers: {
        "Authorization" : `Bearer ${session.accessToken}`
    }
    })
    .then((response) => {
        let result = response.data.data
        purchaseOrder = result
    }).catch((error) => {
        purchaseOrder = null
    })

    return {
        props: {
            purchaseOrder
        }
    }
}