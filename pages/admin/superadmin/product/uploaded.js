import React, {useEffect, useState} from 'react'
import Admin from 'layouts/Admin.js'
import {getSession} from 'next-auth/react'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import TableExcel from '@/components/Table/Superadmin/Excel/ExcelUploadedList'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import TextInput from '@/components/Interface/Form/TextInput'
import InfoButton from '@/components/Interface/Buttons/InfoButton'

Uploaded.layout = Admin

export default function Uploaded({session}) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [isOpenDetail, setisOpenDetail] = useState(false)
  const [selectedData, setselectedData] = useState({})
  const [stateStatus, setStateStatus] = useState('')
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const [stateActionRequired, setStateActionRequired] = useState(false)

  const fetchdata = async (page = 1, statusParam = '',
    orderActionRequiredParam = false) => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        `/admin/product/excel?paginate=10&page=${page}&status=${statusParam
        }&action_required=${orderActionRequiredParam}`,
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
  const setPage = (pageNumber, stateActionRequired) => {
    fetchdata(pageNumber, stateActionRequired)
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const showDetailHandler = (data) => {
    setisOpenDetail(true)
    setselectedData(data)
  }

  const handleSearchData = () => {
    fetchdata(1, stateStatus, stateActionRequired)
  }

  const handleResetSearchFilter = () => {
    setStateStatus('')
    setStateActionRequired(false)
    fetchdata()
  }

  useEffect(() => {
    handleSearchData()
  }, [stateActionRequired])
  return (
    <>
      <h1 className="font-semibold text-2xl">Upload Excel</h1>
      <PrimaryWrapper className={'mt-5 p-5'}>
        <h2 className="text-xl text-center">Search Upload Excel</h2>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="text-center">
            <TextInput
              value={stateStatus}
              onChange={(target) => setStateStatus(target.value)}
              placeholder="Input Excel File Status"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="text-center items-center flex space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={stateActionRequired}
                className="sr-only peer"
                id="stateActionRequired"
                onChange={(e) => {
                  setStateActionRequired(!stateActionRequired)
                  // handleSearchData()
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Action Required{' '}
              </span>
            </label>
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
      <div className="mb-10">
        <TableExcel
          title="Uploaded Excel File"
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
          view={(data) => showDetailHandler(data)}
        />
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
