import { getSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import Admin from 'layouts/Admin.js'
import ComponentList from '@/components/Table/Member/Components/ComponentsList'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import axios from 'lib/axios'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import TextInput from '@/components/Interface/Form/TextInput'

export default function OutofStock({ session }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [pageNumber, setPageNumber] = useState('')

  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const [country, setCountry] = useState('')
  const [manufacturerPartNumber, setManufacturerPartNumber] = useState('')

  const loadData = async (
    page = 1,
    countryParam = '',
    manufacturerPartNumberParam = ''
  ) => {
    setPageNumber(page)
    setIsLoading(true)
    await axios
      .get(
        `/seller/product/list?country=${countryParam}&manufacturer_part_number=${manufacturerPartNumberParam}&sort_by=updated_at&sort_type=Desc`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
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
      .catch(() => {
        toast.error('Something went wrong. Cannot load order.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSearchData = () => {
    loadData(1, country, manufacturerPartNumber)
  }

  const handleResetSearchFilter = () => {
    setManufacturerPartNumber('')
    setCountry('')
    loadData()
  }

  const setPage = (pageNumber) => {
    loadData(pageNumber)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="mb-10">
      <h1 className="font-semibold text-2xl">Out of Stock</h1>
      <PrimaryWrapper className={`mt-5 p-5`}>
        <h2 className="text-xl text-center">Search Out of Stock</h2>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="text-center">
            <TextInput
              value={country}
              onChange={(target) => setCountry(target.value)}
              placeholder="Country"
            ></TextInput>
          </div>
          <div className="text-center">
            <TextInput
              value={manufacturerPartNumber}
              onChange={(target) => setManufacturerPartNumber(target.value)}
              placeholder="Manufacturer Part Number"
            ></TextInput>
          </div>
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
      <ComponentList
        isOutOfStock={true}
        title="Out of Stock"
        setPage={setPage}
        isLoading={isLoading}
        data={data}
        links={links}
        metaData={metaData}
      />
    </div>
  )
}

OutofStock.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
