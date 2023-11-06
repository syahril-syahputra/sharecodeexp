import React from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

import ProformaInvoicePDFComp from '@/components/PDF/Order/ProformaInvoiceSeller'

export default function ProformaInvoicePDF({ session, proformaInvoice }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ? (
        <div>
          <div className="h-screen bg-gray-300 w-full grid place-items-center">
            <PDFViewer width={1000} height={750}>
              <ProformaInvoicePDFComp proformaInvoice={proformaInvoice} />
            </PDFViewer>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard',
      },
    }
  }
  let proformaInvoice = {}

  try {
    const response = await axios.get(
      `/document/order/${context.query.orderSlug}/seller-proforma-invoice`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
    proformaInvoice = response.data.data
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      proformaInvoice,
      session,
    },
  }
}
