import React, { useState, useEffect } from 'react'
import Admin from 'layouts/Admin.js'
import axios from '@/lib/axios'
import { getSession } from 'next-auth/react'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import TextInput from '@/components/Interface/Form/TextInput'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import HelpTable from '@/components/Table/Member/Help'

export default function InquiredProduct({ session }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })

  const [pageNumber, setPageNumber] = useState('')
  const [stateSearch, setStateSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const loadData = async (
    page = 1,
    searchState = '',
    startStateDate = '',
    endStateDate = ''
  ) => {
    setPageNumber(page)
    setIsLoading(true)
    await axios
      .get(`/admin/help-request?page=${page}&search=${searchState}&sort_by=updated_at&sort_type=DESC&start_date=${startStateDate}&end_date=${endStateDate}`,
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
      .catch((error) => {
        toast.error('Something went wrong. Cannot load order.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const handleSearchData = () => {
    loadData(
      1,
      stateSearch,
      startDate,
      endDate,
    )
  }

  const handleResetSearchFilter = () => {
    setStateSearch('')
    setStartDate('')
    setEndDate('')
    loadData()
  }
  const setPage = (pageNumber) => {
    loadData(pageNumber)
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Help Request</h1>
        <PrimaryWrapper className={`mt-5 p-5`}>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="text-center">
              <TextInput
                label="Subject"
                value={stateSearch}
                onChange={(target) => setStateSearch(target.value)}
                placeholder="Search By Subject"
              />
            </div>
            <div className="text-center">
              <TextInput
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(target) => setStartDate(target.value)}
                placeholder="Order Date"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="text-center">
              <TextInput
                type="date"
                label="End Date"
                value={endDate}
                onChange={(target) => setEndDate(target.value)}
                placeholder="Order Date"
              />
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
        <HelpTable
          filterStatus
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          session={session}
          links={links}
          loadData={loadData}
          metaData={metaData}
        />
      </div>
    </>
  )
}

InquiredProduct.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  return {
    props: {
      session,
    },
  }
}
