import React, {useState, useEffect} from 'react'
import Admin from 'layouts/Admin.js'
import axios from '@/lib/axios'
import {getSession} from 'next-auth/react'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import HelpTable from '@/components/Table/Help/index'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'

export default function InquiredProduct({session}) {
  const [isLoading, setIsLoading] = useState(true)
  const placeholder = "Search by Subject"
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })

  const [search, setSearch] = useState('')
  async function searchData(searchParam = '', page = 1) {
    setSearch(searchParam)
    setIsLoading(true)
    await axios
      .get(`/member/help-request?page=${page}&search=${searchParam}&sort_by=updated_at&sort_type=DESC&start_date&end_date`,
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
        setData([])
        toast.error(
          error?.message || 'Something went wrong. Cannot load component.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (pageNumber) => {
    searchData(search, pageNumber)
  }
  useEffect(() => {
    searchData()
  }, [])
  const handleSearch = (searchResult) => {
    searchData(searchResult)
  }

  return (
    <>
      <div className="mb-10">
        <div className='mb-5 w-full lg:w-1/2'>
          <MiniSearchBar placeholder={placeholder} searchItem={handleSearch} />
        </div>
        <HelpTable
          title={'Help Request'}
          filterStatus
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          search={search}
          session={session}
          links={links}
          loadData={searchData}
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
