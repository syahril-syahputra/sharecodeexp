import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// components
import ComponentList from "@/components/Table/Member/Components/ComponentsList"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct({session}) {
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
  const searchData = async (srch, page=1) =>{
    setIsLoading(true)
    const response = await axios.get(`/companyproduct/rejected?page=${page}`,
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
        // console.log(error.response)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (item) => {
    searchData(search, item)
  }
  useEffect(() => {
    searchData(search)
  }, [])

  return (
    <>
      <div className="">
        <div className="mb-10">
          <MiniSearchBar/>
            <ComponentList
              title="Rejected Components"
              setPage={setPage}
              isLoading={isLoading}
              data={data}
              links={links}
              metaData={metaData}
              addProduct
            ></ComponentList>
        </div>
      </div>
    </>
  );
}

MyProduct.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}