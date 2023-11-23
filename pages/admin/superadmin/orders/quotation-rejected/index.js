import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Admin from 'layouts/Admin.js'
import OrderList from '@/components/Table/Superadmin/Orders/OrderList'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import TextInput from '@/components/Interface/Form/TextInput'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import SelectInput from '@/components/Interface/Form/SelectInput'

export default function QuotationRejected({ session }) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })

  const [pageNumber, setPageNumber] = useState('')
  const orderStatus = {
    label: 'Quotation Rejected',
    value: '',
  }
  const [orderNumber, setOrderNumber] = useState('')
  const [manufacturerPartNumber, setManufacturerPartNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [stateActionRequired, setStateActionRequired] = useState(false)

  const loadData = async (
    page = 1,
    orderNumberParam = '',
    manufacturerPartNumberParam = '',
    orderDateParam = '',
    orderActionRequiredParam = false
  ) => {
    setPageNumber(page)
    setIsLoading(true)
    const actionRequired =
      orderActionRequiredParam === false
        ? '/admin/orders/list' +
          `?page=${page}` +
          `&status=quotation-rejected` +
          `&order_number=${orderNumberParam}` +
          `&manufacturer_part_number=${manufacturerPartNumberParam}` +
          `&order_date=${orderDateParam}` +
          `&action_required=${false}`
        : '/admin/orders/list' +
          `?page=${page}` +
          `&status=quotation-rejected` +
          `&order_number=${orderNumberParam}` +
          `&manufacturer_part_number=${manufacturerPartNumberParam}` +
          `&order_date=${orderDateParam}` +
          `&action_required=${true}`
    await axios
      .get(actionRequired, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
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
      orderNumber,
      manufacturerPartNumber,
      orderDate,
      stateActionRequired
    )
  }
  const handleResetSearchFilter = () => {
    setManufacturerPartNumber('')
    setOrderNumber('')
    setOrderDate('')
    loadData()
  }
  const setPage = (pageNumber) => {
    loadData(pageNumber)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    handleSearchData()
  }, [stateActionRequired])

  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Orders</h1>
        <PrimaryWrapper className={`mt-5 p-5`}>
          <h2 className="text-xl text-center">Search Rejected Quotation</h2>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="text-center">
              <TextInput
                value={orderNumber}
                onChange={(target) => setOrderNumber(target.value)}
                placeholder="Order Number"
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
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center">
              <SelectInput disabled value={orderStatus} options={[]} />
            </div>
            <div className="text-center">
              <TextInput
                type="date"
                value={orderDate}
                onChange={(target) => setOrderDate(target.value)}
                placeholder="Order Date"
              ></TextInput>
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
        <OrderList
          filterStatus
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
        ></OrderList>
      </div>
    </>
  )
}

QuotationRejected.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
