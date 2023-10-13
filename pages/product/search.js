import React, {useEffect, useState} from "react";
import {getSession} from 'next-auth/react';
import Link from "next/link";
import { useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from "lib/axios";

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import TableComponent from "@/components/Table/Public/Component";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import TextInput from "@/components/Interface/Form/TextInput";

export default function Index({session}) {
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
    const response = await axios.get(`/search?query=${srch}&page=${page}`, 
      {
        headers: {
        "Authorization" : `Bearer ${session?.accessToken}`
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
      <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-10">
          <div className="flex flex-wrap">
            <div className="w-full mt-16">
              <h2 className="font-semibold text-4xl">Search Components</h2>
            </div>
          </div>

          <div className="mb-2 w-full lg:w-1/2 mt-4">
            <div className="relative flex">
              <TextInput
                value={search} 
                onChange={(input) => setSearch(input.value)}
                onKeyDown={searchComponent}
                placeholder="Search for the components"
              ></TextInput>
              <Link href={`/product/search?q=${search}`}>
                <PrimaryButton
                  className="uppercase"
                >
                  Search
                </PrimaryButton>
              </Link>
            </div>
          </div>

          <div>
            {suggestion && suggestion.length > 0 &&
              <div>
                {isSuggestionLoading && 
                  <div className="text-slate-500">
                    Suggestion : 
                    <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                  </div>
                }
                {!isSuggestionLoading && 
                  <div className="text-slate-500">Suggestion : {suggestion.map(name => (  
                    <Link key={name} href={`/product/search?q=${name}`} className="mx-1 underline text-blue-500">  
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

          <div className="bg-white mb-14 mt-10">
            <TableComponent
              setPage={setPage}
              isLoading={isLoading}
              data={data}
              links={links}
              metaData={metaData}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
  }

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}