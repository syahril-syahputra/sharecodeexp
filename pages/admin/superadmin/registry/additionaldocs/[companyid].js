import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// components
import LightButton from '@/components/Interface/Buttons/LightButton'
import AdditionalDocument from '@/components/Table/Superadmin/Registry/AdditionalDocument'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'

export default function MemberAdditionalDocument({ session, routeParam }) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [additionalDocs, setAdditionalDocs] = useState([])
  const [companyData, setCompanyData] = useState({})
  useEffect(() => {
    const getCompany = async () => {
      setIsLoading(true)
      const response = await axios
        .get(`admin/companies?id=${routeParam.companyid}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          let result = response.data.data
          setCompanyData(result)
        })
        .catch((error) => {
          // console.log(error.response)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    getCompany()
  }, [])

  const getData = async () => {
    setIsLoading(true)
    const request = await axios
      .get(
        `/admin/companies/AdditionalDoc?company_id=${routeParam.companyid}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        setAdditionalDocs(response.data.data)
      })
      .catch((error) => {
        setAdditionalDocs([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="mb-10">
        <AdditionalDocument
          isLoading={isLoading}
          title={`${
            companyData.name ? companyData.name : '...'
          }'s Additional Documents`}
          items={additionalDocs}
        ></AdditionalDocument>
      </div>
    </>
  )
}

MemberAdditionalDocument.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
      routeParam: context.query,
    },
  }
}
