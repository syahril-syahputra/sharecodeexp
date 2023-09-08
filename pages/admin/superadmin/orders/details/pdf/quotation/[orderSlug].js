import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import QuotationPDFComp from "@/components/PDF/Order/Quotation"
export default function QuotationPDF({quotation}){
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
              <QuotationPDFComp quotation={quotation}/>
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
  let quotation = {}
  const response = await axios.get(`/admin/orders/${context.query.orderSlug}/detail`,
    {
    headers: {
        "Authorization" : `Bearer ${session.accessToken}`
    }
    })
    .then((response) => {
        let result = response.data.data
        quotation = result
    }).catch((error) => {
        quotation = null
    })

  return {
      props: {
          quotation
      }
  }
}