import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

import SellerPackingListPDFComp from '@/components/PDF/Order/SellerPackingList'

export default function SellerPackingListPDF({ sellerPackingList }) {
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
              <SellerPackingListPDFComp sellerPackingList={sellerPackingList} />
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
  let sellerPackingList = {}
  const response = await axios
    .get(`/document/order/${context.query.orderSlug}/seller-packing-list`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .then((response) => {
      let result = response.data.data
      sellerPackingList = result
    })
    .catch((error) => {
      sellerPackingList = null
    })

  return {
    props: {
      sellerPackingList,
    },
  }
}
