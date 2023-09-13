import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import ToSellerPackingListPDFComp from "@/components/PDF/Order/ToSellerPackingList"
export default function ToSellerPackingListPDF({labPackingList}){
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
              <ToSellerPackingListPDFComp labPackingList={labPackingList}/>
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
    let labPackingList = {}
    const response = await axios.get(`/document/order/${context.query.orderSlug}/to-seller-packing-list`,
    {
    headers: {
        "Authorization" : `Bearer ${session.accessToken}`
    }
    })
    .then((response) => {
        let result = response.data.data
        labPackingList = result
    }).catch((error) => {
        labPackingList = null
    })

    return {
        props: {
            labPackingList
        }
    }
}