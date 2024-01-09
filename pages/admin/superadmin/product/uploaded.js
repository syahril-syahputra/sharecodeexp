import React, {useEffect, useState} from 'react'
import Admin from 'layouts/Admin.js'
import {getSession} from 'next-auth/react'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import TableExcel from '@/components/Table/Superadmin/Excel/ExcelUploadedList'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'

Uploaded.layout = Admin

export default function Uploaded({session}) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [isOpenDetail, setisOpenDetail] = useState(false)
  const [selectedData, setselectedData] = useState({})
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const fetchdata = async (page = 1) => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `/admin/product/excel?paginate=10&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
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
    } catch (error) {
      setData([])
      toast.error('Something went wrong. Cannot load component.', toastOptions)
    } finally {
      setIsLoading(false)
    }
  }
  const setPage = (pageNumber) => {
    fetchdata(pageNumber)
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const showDetailHandler = (data) => {
    setisOpenDetail(true)
    setselectedData(data)
  }

  const handleSearch = () => { }

  return (
    <>
      <div className="mb-5 w-full lg:w-1/2">
        <MiniSearchBar searchItem={handleSearch} />
      </div>
      <div className="mb-10">
        <TableExcel
          title="Uploaded Excel File"
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
          view={(data) => showDetailHandler(data)}
        ></TableExcel>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
