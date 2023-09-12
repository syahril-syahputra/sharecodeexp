import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import ProformaInvoicePDFComp from "@/components/PDF/Order/ProformaInvoice"
export default function ProformaInvoicePDF({proformaInvoice}){
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
              <ProformaInvoicePDFComp proformaInvoice={proformaInvoice}/>
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
    let proformaInvoice = {}
    const response = await axios.get(`/buyer/order/${context.query.orderSlug}/detail`,
    {
    headers: {
        "Authorization" : `Bearer ${session.accessToken}`
    }
    })
    .then((response) => {
        let result = response.data.data
        proformaInvoice = result
    }).catch((error) => {
        proformaInvoice = null
    })

    return {
        props: {
            proformaInvoice
        }
    }
}