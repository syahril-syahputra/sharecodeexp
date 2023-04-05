import React, {useEffect, useState} from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import TableComponent from "@/components/Table/TableComponent";
import axios from "lib/axios";
// import axios from "axios";

export default function Index() {
  const router = useRouter()
  const [search, setSearch] = useState(router.query.q ? router.query.q : '')
  const [category, setCategory] = useState(router.query.category ? router.query.category : '')
  const [subcategory, setSubcategory] = useState(router.query.subcategory ? router.query.subcategory : '')
  
  function searchComponent(event){
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`)
      // searchData(search)
    }
  }

  //data search
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
    const response = await axios.get(`/search?query=${srch}&page=${page}&cat=${category}&sub=${subcategory}`)
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
  const setPage = (page) => {
    searchData(search, page)
  }
  useEffect(() => {
    searchData(search)
  }, [])

  //search suggestion
  const [suggestion, setSuggestion] = useState([])
  const [isSuggestionLoading, setSuggestionLoading] = useState(false)
  useEffect(() => {
    if(search){
      setSuggestionLoading(true)
      const getData = setTimeout(() => {
        axios
        .get(`/search/suggest/${search}`)
        .then((response) => {
          setSuggestion(response.data.data)
        })
        .finally(() => setSuggestionLoading(false));
      }, 2000)

      return () => clearTimeout(getData)
    }
  }, [search])


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
          <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
            <input
              type="text"
              value={search} 
              onChange={({target}) => setSearch(target.value)}
              onKeyDown={searchComponent}
              className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              placeholder="Search for the components"/>
            <Link
              href={`/product/search?q=${search}`}
              className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
              Search
            </Link>
          </div>

          <div>
            {suggestion && suggestion.length > 0 &&
              <div>
                {isSuggestionLoading && 
                  <div className="text-blueGray-700">
                    Suggestion : 
                    <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                  </div>
                }
                {!isSuggestionLoading && 
                  <div className="">Suggestion : {suggestion.map(name => (  
                    <Link key={name} href={`/product/search?q=${name}`} className="mx-1 underline">  
                      {name}  
                    </Link>  
                  ))}</div>
                }
              </div>
            }
            {isSuggestionLoading && suggestion.length === 0 && 
              <i className="ml-2 fas fa-circle-notch fa-spin"></i>
            }
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