import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'

// components
import CompanyList from '@/components/Table/Superadmin/Registry/CompanyList'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'
import { useRouter } from 'next/router'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import TextInput from '@/components/Interface/Form/TextInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import CountrySelector from '@/components/Shared/CountrySelector'

export default function ApprovedCompany({ session }) {
  //data search
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })

  useEffect(() => {
    searchData()
  }, [])

  const [pageNumber, setPageNumber] = useState('')
  const searchData = async (page = 1, name = '', country = '', sector = '') => {
    setPageNumber(page)
    setIsLoading(true)
    const response = await axios
      .get(
        `/admin/company/restricted?` +
          `page=${page}` +
          `&status=accepted` +
          `&name=${name}` +
          `&country=${country}` +
          `&sector=${sector}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        let result = response.data.data
        // console.log(result)
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
        // console.log(error.response)
        toast.error(
          'Something went wrong. Cannot load companies.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (pageNumber) => {
    searchData(pageNumber, name, sector, country)
  }

  const [name, setname] = useState('')
  const [sector, setsector] = useState('')
  const [country, setcountry] = useState('')

  const handleSearchData = () => {
    searchData(pageNumber, name, country.value, sector)
  }
  const handleResetSearchFilter = () => {
    setname('')
    setsector('')
    setcountry('')
    searchData()
  }

  return (
    <>
      <div className="mb-10">
        <PrimaryWrapper className={`mt-5 p-5`}>
          <h2 className="text-xl text-center">Search Restricted Registry</h2>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="text-center">
              <TextInput
                title="Nam"
                value={name}
                onChange={(target) => setname(target.value)}
                placeholder="Order Number"
              ></TextInput>
            </div>
            <div className="text-center">
              <TextInput
                value={sector}
                onChange={(target) => setsector(target.value)}
                placeholder="Insert Sector"
              ></TextInput>
            </div>
          </div>
          <div className="text-center  mt-4">
            <CountrySelector
              setInisiate
              disabled={isLoading}
              name="country"
              placeholder="Select Country"
              value={country}
              onChange={(value) => setcountry(value)}
              // errorMsg={errorInfo.country}
            />
          </div>

          <div className="mt-10 text-center">
            <PrimaryButton onClick={handleSearchData} className="w-1/2 mr-2">
              Search
            </PrimaryButton>
            <InfoButton onClick={handleResetSearchFilter} className="w-1/6">
              Reset
            </InfoButton>
          </div>
        </PrimaryWrapper>
        <CompanyList
          title="Restricted Company"
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

ApprovedCompany.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
