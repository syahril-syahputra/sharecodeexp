import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components
import OrderList from "@/components/Table/Superadmin/Orders/OrderList"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";

export default function ActiveOrders({session}) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0
  })
  const [search, setSearch] = useState('')
  const searchData = async (searchParam='', page=1) =>{
    setSearch(searchParam)
    setIsLoading(true)
    const response = await axios.get(`/admin/orders/ongoing?page=${page}&status=${orderStatus}&search=${searchParam}`,
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
  const setPage = (pageNumber) => {
    searchData(search, pageNumber)
  }
  useEffect(() => {
    searchData()
  }, [])

  const [orderStatus, setOrderStatuses] = useState("Inquiry")
  const handleStatusChange = (status) => {
    setOrderStatuses(status.value)
  }
  useEffect(() => {
    searchData()
  }, [orderStatus])

  const handleSearch = (searchResult) =>{
    searchData(searchResult)
  }

  return (
    <>
        <div className="mb-10">
          <div className="mb-5 w-full lg:w-1/2">
              <MiniSearchBar searchItem={handleSearch}/>
          </div>
          <OrderList
            filterStatus={false}
            title="Active Orders"
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

ActiveOrders.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}