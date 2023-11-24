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
import RegistrySearch from '@/components/Shared/RegistrySearch'

export default function ApprovedCompany({ session }) {
  //data search

  const [name, setname] = useState('')
  const [sector, setsector] = useState('')
  const [country, setcountry] = useState('')
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
        `/admin/company/allowed?` +
          `page=${page}` +
          `&status=accepted` +
          `&name=${name}` +
          `&country=${country.value || ''}` +
          `&sector=${sector.value || ''}`,
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
    searchData(pageNumber, name, country, sector)
  }

  return (
    <>
      <div className="mb-10">
        <RegistrySearch
          title="Search Approved Company"
          registryName={[name, setname]}
          registryCountry={[country, setcountry]}
          registrySector={[sector, setsector]}
          search={() => searchData(pageNumber, name, country, sector)}
          reset={() => searchData()}
          isLoading={isLoading}
        />
        <CompanyList
          title="Approved Company"
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
