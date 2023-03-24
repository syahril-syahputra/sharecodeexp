import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { useSession } from "next-auth/react";
import Link from "next/link";

// components
import TableProduct from "components/Table/TableProduct"
import IncomingInquiry from "components/Table/Product/IncomingInquiry"

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct() {
  const session = useSession()
  const [user, setUser] = useState({
    accessToken: ''
  })
  useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

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
    if(!!user.accessToken){
      setIsLoading(true)
      const response = await axios.get(`/companyproduct?page=${page}`,
          {
            headers: {
              "Authorization" : `Bearer ${user.accessToken}`
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
  }
  const setPage = (item) => {
    searchData(search, item)
  }
  useEffect(() => {
    searchData(search)
  }, [user])

  return (
    <>
      <div className="">
        <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
            <input
              type="text"
            //   value={search} 
            //   onChange={({target}) => setSearch(target.value)}
            //   onKeyDown={searchComponent}
              className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              placeholder="Search"/>
            <Link
              href={`/product/search?q=${search}`}
              className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
              Search
            </Link>
          </div>
          <div className="mb-10">
            <IncomingInquiry
              title="Incoming Inquiry"
              setPage={setPage}
              isLoading={isLoading}
              data={data}
              links={links}
              metaData={metaData}
            ></IncomingInquiry>
          </div>
      </div>
    </>
  );
}

MyProduct.layout = Admin;
