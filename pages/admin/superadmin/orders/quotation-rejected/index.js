import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// layout for page
import Admin from "layouts/Admin.js";

// components
import OrderList from "@/components/Table/Superadmin/Orders/OrderList"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import TextInput from "@/components/Interface/Form/TextInput";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import InfoButton from "@/components/Interface/Buttons/InfoButton";
import SelectInput from "@/components/Interface/Form/SelectInput";

export default function QuotationRejected({session}) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0
  })


  const [pageNumber, setPageNumber] = useState('')
  const orderStatus = {
    'label': 'Quotation Rejected',
    'value': ''
  }
  const [orderNumber, setOrderNumber] = useState('')
  const [manufacturerPartNumber, setManufacturerPartNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const loadData = async (
      page=1,       
      orderNumberParam='', 
      manufacturerPartNumberParam='', 
      orderDateParam=''
    ) =>{
    setPageNumber(page)
    setIsLoading(true)
    const response = await axios.get('/admin/orders/list'
      +`?page=${page}`
      +`&status=quotation-rejected`
      +`&order_number=${orderNumberParam}`
      +`&manufacturer_part_number=${manufacturerPartNumberParam}`
      +`&order_date=${orderDateParam}`,
        {
          headers: {
            "Authorization" : `Bearer ${session.accessToken}`
          }
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
          prevPage: result.prev_page_url ? true : false
        })
      }).catch((error) => {
          toast.error("Something went wrong. Cannot load order.", toastOptions)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  const handleSearchData = () => {
    loadData(1, orderNumber, manufacturerPartNumber, orderDate)
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

  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">
          Orders
        </h1>
        <PrimaryWrapper className={`mt-5 p-5`}>
          <h2 className="text-xl text-center">
            Search Rejected Quotation
          </h2>
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
                disabled
                value={orderStatus}
                options={[]}
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
            <PrimaryButton 
              onClick={handleSearchData}
              className="w-1/2 mr-2">
              Search
            </PrimaryButton>
            <InfoButton 
              onClick={handleResetSearchFilter}
              className="w-1/6">
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
  );
}

QuotationRejected.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session
      }
  }
}