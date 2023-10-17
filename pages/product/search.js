import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from 'lib/axios'

//components
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import TableComponent from '@/components/Table/Public/Component'
import TextInputSearchComponent from '@/components/Interface/Form/TextInputForSearchComponent'
import { Router } from 'next/router'

export default function Index({ session }) {
  const router = useRouter()
  const [search, setSearch] = useState(router.query.q ? router.query.q : '')
  const [category, setCategory] = useState(
    router.query.category ? router.query.category : ''
  )
  const [subcategory, setSubcategory] = useState(
    router.query.subcategory ? router.query.subcategory : ''
  )

  function searchComponent(event) {
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`)
    }
  }

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const searchData = async (srch, page = 1) => {
    setIsLoading(true)
    await axios
      .get(`/search?query=${srch}&page=${page}`)
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
          prevPage: result.prev_page_url ? true : false,
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (page) => {
    searchData(search, page)
  }
  useEffect(() => {
    searchData(search)
  }, [search])

  //search suggestion
  const [suggestion, setSuggestion] = useState([])
  const [isSuggestionLoading, setSuggestionLoading] = useState(false)
  useEffect(() => {
    if (search) {
      setSuggestionLoading(true)
      const getData = setTimeout(() => {
        axios
          .get(`/search/suggest/${search}`)
          .then((response) => {
            setSuggestion(response.data.data)
          })
          .finally(() => setSuggestionLoading(false))
      }, 2000)

      return () => clearTimeout(getData)
    }
  }, [search])

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <IndexNavbar fixed />
      <section className=" container mx-auto  relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="mt-10 xs:pb-10 xs:pt-8 px-4 xl:px-0 lg:px-0 2xl:px-0">
          <div className="flex flex-wrap">
            <div className="w-full mt-16">
              <h2 className="font-semibold text-4xl">Search Components</h2>
            </div>
          </div>
          <div className="w-full mb-2 mt-4 pt-2 sm:pt-0 pb-4 md:pb-1 lg:px-3 md:px-[3px] lg:w-2/4 xl:w-2/4 2xl:w-2/4">
            <form className="flex items-center">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-footer-resources"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <TextInputSearchComponent
                  value={search}
                  onChange={(target) => setSearch(target.value)}
                  onKeyDown={searchComponent}
                  type="text"
                  placeholder="Search for the components"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center py-2.5 px-4 lg:px-30 sm:px-16 text-sm font-medium text-white bg-sub-header border-sub-header hover:bg-top-navbar focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <Link href={!!search ? `/product/search?q=${search}` : ''}>
                  SEARCH
                </Link>
              </button>
            </form>
            <div className="text-left py-2">
              {suggestion && suggestion.length > 0 && (
                <div>
                  {isSuggestionLoading && (
                    <div className="text-blueGray-500">
                      Suggestion :
                      <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                    </div>
                  )}
                  {!isSuggestionLoading && (
                    <div className="flex justify-start">
                      <span className="text-blueGray-500">Suggestion :</span>
                      {suggestion.map((name, index) => (
                        <Link
                          key={`${name}--${index}`}
                          href={`/product/search?q=${name}`}
                          className="mx-1 underline text-blue-500 italic"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {isSuggestionLoading && suggestion.length === 0 && (
                <i className="ml-2 fas fa-circle-notch fa-spin"></i>
              )}
            </div>
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
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
