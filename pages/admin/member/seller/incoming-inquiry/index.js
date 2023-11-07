import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { VendorUrl } from '@/route/route-url'
import Admin from 'layouts/Admin.js'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import TextInput from '@/components/Interface/Form/TextInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import IncomingInquiryTable from '@/components/Table/Member/Seller/Order/IncomingInquiry'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

export default function IncomingInquiry({ session, routeParam }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })

  let orderStatusFromRoute = routeParam
  const [orderStatusOptions, setOrderStatusOption] = useState([])
  const loadOrderStatusOption = async () => {
    await axios
      .get(`/allstatus?is_closed=0&reimbursement=0&return_product=0`)
      .then((response) => {
        let res = response.data.data
        setOrderStatusOption(res)
        res.filter((option) => {
          if (option.value === orderStatusFromRoute) {
            setOrderStatus({
              label: option.label,
              value: option.value,
            })
          }
        })
      })
      .catch(() => {
        toast.error('Cannot load order status.', toastOptions)
      })
  }

  const [pageNumber, setPageNumber] = useState('')
  const [orderStatus, setOrderStatus] = useState({
    label: 'Select Order Status',
    value: '',
  })
  const [orderNumber, setOrderNumber] = useState('')
  const [manufacturerPartNumber, setManufacturerPartNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const loadData = async (
    page = 1,
    orderStatusParam = orderStatusFromRoute ? orderStatusFromRoute : '',
    orderNumberParam = '',
    manufacturerPartNumberParam = '',
    orderDateParam = ''
  ) => {
    setPageNumber(page)
    setIsLoading(true)
    const response = await axios
      .get(
        '/seller/order/list' +
          `?page=${page}` +
          `&status=${orderStatusParam}` +
          `&order_number=${orderNumberParam}` +
          `&manufacturer_part_number=${manufacturerPartNumberParam}` +
          `&order_date=${orderDateParam}` +
          `&active=1`,
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
      orderStatus?.value,
      orderNumber,
      manufacturerPartNumber,
      orderDate
    )
  }
  const router = useRouter()
  const handleResetSearchFilter = () => {
    if (orderStatusFromRoute) {
      orderStatusFromRoute = ''
      router.push(`${VendorUrl.sellingProduct.incomingInquiries.index}`)
    }
    setOrderStatus({
      label: 'Select Order Status',
      value: '',
    })
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
    loadOrderStatusOption()
  }, [])

  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Orders</h1>
        <PrimaryWrapper className={`mt-5 p-5`}>
          <h2 className="text-xl text-center">Search Active Order</h2>
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
              <SelectInput
                value={orderStatus}
                options={orderStatusOptions}
                onChange={(input) => setOrderStatus(input)}
              />
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

          <div className="mt-10 text-center">
            <PrimaryButton onClick={handleSearchData} className="w-1/2 mr-2">
              Search
            </PrimaryButton>
            <InfoButton onClick={handleResetSearchFilter} className="w-1/6">
              Reset
            </InfoButton>
          </div>
        </PrimaryWrapper>
        <IncomingInquiryTable
          filterStatus
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
        ></IncomingInquiryTable>
      </div>
    </>
  )
}

IncomingInquiry.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const orderStatus = context.query.orderStatus
    ? context.query.orderStatus
    : null

  return {
    props: {
      session,
      routeParam: orderStatus,
    },
  }
}
