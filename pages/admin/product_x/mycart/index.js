import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import TableCart from "components/Table/TableCart"

// layout for page
import Admin from "layouts/Admin.js";

export default function MyCart() {
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
      const response = await axios.get(`/cartlist?page=${page}`,
          {
            headers: {
              "Authorization" : `Bearer ${user.accessToken}`
            }
          }
        )
        .then((response) => {
          // console.log(response)
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
        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
          {/* <CardLineChart /> */}
            <TableCart
              setPage={setPage}
              isLoading={isLoading}
              data={data}
              links={links}
              metaData={metaData}
            ></TableCart>
        {/* </div> */}
      </div>
    </>
  );
}

MyCart.layout = Admin;
