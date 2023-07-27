import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// components
import CompaniesBasedOrder from "@/components/Table/Superadmin/Orders/CompaniesBasedOrder"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";

export default function SellersOrders({session}) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0
  })

  let search = ''
  const searchData = async (page=1) =>{
    setIsLoading(true)
    const response = await axios.get(`/admin/orders/companiesSeller?page=${page}&company=${search}`,
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
        toast.error("Something went wrong. Cannot load company.", toastOptions)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  const setPage = (item) => {
    searchData(item)
  }
  useEffect(() => {
    searchData()
  }, [])

  const handleSearch = (item) =>{
    search = item
    searchData()
  }

  return (
    <>
        <div className="mb-10">
          <div className="mb-5 w-full lg:w-1/2">
              <MiniSearchBar searchItem={handleSearch}/>
          </div>
          <CompaniesBasedOrder
            filterStatus={false}
            title="Company Based Order List (Seller)"
            setPage={setPage}
            isLoading={isLoading}
            data={data}
            links={links}
            urlLink={`/admin/superadmin/orders/companyorderseller/orderlist`}
            metaData={metaData}
          ></CompaniesBasedOrder>
        </div>
    </>
  );
}

SellersOrders.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session
      }
  }
}