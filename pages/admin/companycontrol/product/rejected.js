import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";


// components
import ProductList from "@/components/Table/CompanyControl/ProductList";

// layout for page
import Admin from "layouts/Admin.js";

export default function RejectedProduct() {
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
        console.log(1)
        setIsLoading(true)
        const response = await axios.get(`/admin/product/rejected?page=${page}`,
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            }
            )
            .then((response) => {
            let result = response.data.data
            // console.log(result)
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

    const viewHandler = (productId) => {
        console.log(productId)
    }

  return (
    <>
    <div className="relative">
      <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
          <input
              type="text"
              // value={search} 
              // onChange={({target}) => setSearch(target.value)}
              // onKeyDown={searchComponent}
              className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              placeholder="Search..."/>
              <Link
                  href={`/product/search`}
                  className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
              Search
          </Link>
      </div>
      <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Rejected Product
                  </h3>
              </div>
              <div className="px-4 my-2">
                  <Link href="/admin/companycontrol/product/pending" className="m-1 relative bg-orange-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                      Pending Product</Link>
                  <Link href="/admin/companycontrol/product/rejected" className="m-1 relative bg-red-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-times text-white"></i>
                      Rejected Product</Link>
              </div>
          </div>
      </div>

      <ProductList 
        tableType="rejected"
        setPage={setPage}
        isLoading={isLoading}
        data={data}
        links={links}
        metaData={metaData}
        viewHandler={viewHandler}
      />
    </div>
    </>
  );
}

RejectedProduct.layout = Admin;
