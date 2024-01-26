import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import ComponentList from '@/components/Table/Superadmin/Components/ComponentList'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import SelectInput from '@/components/Interface/Form/SelectInput'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import TextInput from '@/components/Interface/Form/TextInput'
import ProductSearch from '@/components/Shared/ProductSearch'

export default function ApprovedProduct({ session, routeParam }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [companyOptions, setCompanyOption] = useState([])
  const [manufacturerPartNumber, setManufacturerPartNumber] = useState('')
  const [stateCountry, setStateCountry] = useState('')
  const [companyStatus, setCompanyStatus] = useState({
    label: 'Select Company',
    value: '',
  })
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const [search, setSearch] = useState('')
  let companyFromRoute = routeParam
  const searchData = async (
    page = 1,
    companyParam = companyFromRoute ? companyFromRoute : '',
    manufacturerPartNumberParam = '',
    countryParam = ''
  ) => {
    setIsLoading(true)
    await axios
      .get(
        `/admin/product/list?page=${page}&status=approved&company_id=${companyParam}&stock_country=${countryParam}&manufacturer_part_number=${manufacturerPartNumberParam}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        let result = response.data.data
        setData(result.data)
        setLinks(result.links)
        setMetaData({
          total: result.total,
          perPage: result.per_page,
          lastPage: result.last_page,
          currentPage: result.current_page,
          nextPage: result.next_page_url ? true : false,
          prevPage: result.prev_page_url ? true : false,
        })
      })
      .catch((error) => {
        setData([])
        toast.error('Something went wrong. Cannot load product.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (pageNumber) => {
    searchData(
      pageNumber,
      companyStatus?.value,
      manufacturerPartNumber,
      stateCountry
    )
  }

  const loadCompanies = async () => {
    await axios
      .get(`/companies`)
      .then((response) => {
        let res = response.data.data
        setCompanyOption(res)
        res.filter((option) => {
          if (option.value === companyFromRoute) {
            setCompanyStatus({
              label: option.label,
              value: option.value,
            })
          }
        })
      })
      .catch(() => {
        toast.error('Cannot load company', toastOptions)
      })
  }

  useEffect(() => {
    searchData()
    loadCompanies()
  }, [])

  const handleSearch = () => {
    searchData(1, companyStatus?.value, manufacturerPartNumber, stateCountry)
  }
  const handleResetSearchFilter = () => {
    setCompanyStatus({
      label: 'Select Company',
      value: '',
    })
    setManufacturerPartNumber('')
    setStateCountry('')
    searchData()
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Product</h1>
        <ProductSearch
          title="Search Approved Registry"
          manufacturerPartNumber={[
            manufacturerPartNumber,
            setManufacturerPartNumber,
          ]}
          stateCountry={[stateCountry, setStateCountry]}
          companyStatus={[companyStatus, setCompanyStatus]}
          companyOptions={companyOptions}
          search={handleSearch}
          reset={handleResetSearchFilter}
          isLoading={isLoading}
        />
        {/* </div> */}
        <ComponentList
          title="Accepted Products"
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
        />
      </div>
    </>
  )
}

ApprovedProduct.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const companyStatus = context?.query?.company ? context?.query?.company : null
  return {
    props: {
      session,
      routeParam: companyStatus,
    },
  }
}
