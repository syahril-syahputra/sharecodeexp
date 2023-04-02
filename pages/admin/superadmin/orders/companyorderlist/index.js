import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components
import CompaniesBasedOrder from "@/components/Table/Superadmin/Orders/CompaniesBasedOrder"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

// layout for page
import Admin from "layouts/Admin.js";

export default function ActiveOrders({session}) {
  //data search
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0
  })
  const searchData = async (page=1) =>{
      setIsLoading(true)
      const response = await axios.get(`/admin/orders/order_completed?page=${page}&status=${orderStatus}&search=${search}`,
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
            console.log(error.response)
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

  const [orderStatus, setOrderStatuses] = useState("Inquiry")
  const handleStatusChange = (status) => {
    setOrderStatuses(status.value)
  }
  useEffect(() => {
    searchData()
  }, [orderStatus])

  const handleSearch = (item) =>{
    setSearch(item)
    searchData()
  }

  return (
    <>
      <div className="">
        <div className="mb-10">
          <MiniSearchBar searchItem={handleSearch}/>
          <CompaniesBasedOrder
            filterStatus={false}
            title="Company Based Order List"
            setPage={setPage}
            isLoading={isLoading}
            data={data}
            links={links}
            metaData={metaData}
          ></CompaniesBasedOrder>
        </div>
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