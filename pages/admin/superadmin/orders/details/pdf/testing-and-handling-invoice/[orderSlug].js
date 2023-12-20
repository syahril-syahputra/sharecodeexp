import React from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

import TestingAndHandlingInvoice from '@/components/PDF/Order/TestingAndHandlingInvoice'

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
              <TestingAndHandlingInvoice data={data} />
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
    .get(
      `/document/order/${context.query.orderSlug}/testing-and-handling-service-invoice`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
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
