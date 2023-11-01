import React from 'react'
import { getSession } from 'next-auth/react'
import axios from 'lib/axios'
import { useState, useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import QuotationPDFComp from '@/components/PDF/Order/Quotation'

export default function QuotationPDF({ quotation }) {
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
              <QuotationPDFComp quotation={quotation} />
            </PDFViewer>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}

async function fetchData(context, accessToken) {
  try {
    const data = await axios.get(
      `/document/order/${context.query.orderSlug}/quotation`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return data
  } catch (error) {
    throw error
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const result = await fetchData(context, session.accessToken)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard',
      },
    }
  }
  // let quotation = {}
  // await axios
  //   .get(`/document/order/${context.query.orderSlug}/quotation`, {
  //     headers: {
  //       Authorization: `Bearer ${session.accessToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     let result = response.data.data
  //     quotation = result
  //   })
  //   .catch((error) => {
  //     quotation = null
  //   })

  return {
    props: {
      session,
      // quotation,
      // data: result?.data?.data,
      quotation: result?.data?.data,
    },
  }
}
