import React, {useEffect, useState} from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import TableComponent from "@/components/Table/TableComponent";
import axios from "axios";

export default function Index() {
  const router = useRouter()
  const [search, setSearch] = useState(router.query.q)
  
  function searchComponent(event){
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`)
      // searchData(search)
    }
  }

  

  const [isLoading, setIsLoading] = useState(true)
  // const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0
  })
  const searchData = async (srch, page=1) =>{
    setIsLoading(true)
    const response = await axios.get(`http://127.0.0.1:8000/v1/search?q=${srch}&page=${page}`)
      .then((response) => {
        let result = response.data.data
        setData(result.data)
        setLinks(result.links)
        setMetaData({
          total: result.total,
          perPage: result.per_page,
          lastPage: result.last_page
        })
      }).catch((error) => {
        console.log(error.response)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (item) => {
    searchData(search, item)
  }

  // 
  useEffect(() => {
    searchData(search)
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="pb-40 relative bg-blueGray-100">
        <div className="container mx-auto mt-10">
          <div className="flex flex-wrap">
            <div className="w-full mt-16">
              <h2 className="font-semibold text-4xl">Search Components</h2>
            </div>
          </div>
          <div className="items-stretch mb-3 mt-3">
            <input 
              type="text" 
              value={search} 
              onChange={({target}) => setSearch(target.value)}
              onKeyDown={searchComponent}
              placeholder="Search for the components" className="border-0 md:w-8/12 px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white text-base shadow outline-grey focus:outline-none focus:ring w-full"/>
              <Link
                // onClick={searchData}
                href={`/product/search?q=${search}`}
                className="text-white font-bold px-6 py-4 outline-none focus:outline-none ml-5 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Search
              </Link>
          </div>
          <div className="">
            <TableComponent
              setPage={setPage}
              isLoading={isLoading}
              data={data}
              links={links}
              metaData={metaData}
              customClass="shadow"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
  }