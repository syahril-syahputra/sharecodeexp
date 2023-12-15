import React from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

import ReturnIvoice from '@/components/PDF/Order/ReturnInvoice'

export default function BuyerInvoicePDF({ data }) {
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
              <ReturnIvoice data={data} />
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
  let data = {}
  const response = await axios
    .get(`/document/order/${context.query.orderSlug}/return-invoice`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .then((response) => {
      let result = response.data.data
      data = result
    })
    .catch((error) => {
      data = null
    })

  return {
    props: {
      data,
    },
  }
}
