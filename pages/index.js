/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from "lib/axios";
import Image from "next/image"

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import MemberCard from "@/components/LandingPage/MemberCard";
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import CategoriesCard from "@/components/LandingPage/CategoriesCard";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import TextInput from "@/components/Interface/Form/TextInput";

export default function Index() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  function searchComponent(event){
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`)
    }
  }

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
      }, 1000)

      return () => clearTimeout(getData)
    }
  }, [search])


  const [statisticCounter, setStatisticCounter] = useState({
    memberCounter: 0,
    productCounter: 0
  })
  const loadStatisticCounter = async () => {
    const request = await axios.get(`/statistic-counter`)
      .then((respose) => {
        setStatisticCounter({
          memberCounter: respose.data.data.member,
          productCounter: respose.data.data.product
        })
      })
  }
  useEffect(() => {
    loadStatisticCounter()
  }, [])


  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-44 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-48">
          <div className="">
            <div className="relative object-center px-12 md:px-4 ml-auto mr-auto">
              <ImageLogo
                size={700}
                color="gradient"
              />
            </div>
            <h1 className="hidden">Search and find your components from top industry manufacturer's excess stocks.</h1>

            <div className="w-3/4 ml-auto mr-auto">
              <div className="text-center">
                <p className="text-xl font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  EXEpart is a closed sales platform that only allows verified industrial manufacturers to list their excess stocks and buy stocks from fellow manufacturers. 
                  It is a great tool to overcome the shortage crisis while enabling the manufacturers to capitalize their unused stocks. 
                  No brokers are allowed to register at EXEpart.
                </p>
              </div>
            </div>

            <div className="w-full px-12 md:px-4 ml-auto mr-auto">
              <div className="text-center items-stretch mb-3 mt-3">
                <TextInput
                    value={search}
                    onChange={(target) => setSearch(target.value)}
                    onKeyDown={searchComponent}
                    type="text" 
                    setIcon="fas fa-search"
                    className="md:w-8/12  border-2"
                    placeholder="Search for the components" 
                /> 
              </div>
              <div className="text-center">
                {suggestion && suggestion.length > 0 &&
                  <div>
                    {isSuggestionLoading && 
                      <div className="text-blueGray-500">
                        Suggestion : 
                        <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                      </div>
                    }
                    {!isSuggestionLoading && 
                      <div className="flex justify-center"><span className="text-blueGray-500">Suggestion :</span> 
                        {suggestion.map(name => (  
                          <Link key={name} href={`/product/search?q=${name}`} className="mx-1 underline text-blue-500 italic">  
                            {name}  
                          </Link>  
                        ))}
                      </div>
                    }
                  </div>
                }
                {isSuggestionLoading && suggestion.length === 0 && 
                  <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                }
              </div>
              <div className="text-center mt-8">
                <Link
                  href={!!search ? `/product/search?q=${search}`: ''}              
                >
                  <div className="w-full">
                    <PrimaryButton
                      className="uppercase font-bold w-6/12 md:w-4/12 lg:w-2/12">
                      Search
                    </PrimaryButton>
                  </div>
                </Link>                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 relative">
        <div className="bg-indigo-900 h-96">
          <div className="justify-center text-center flex flex-wrap">
            <div className="w-full md:w-6/12 px-12 md:px-4 mt-16 mb-16">
              <h2 className="font-semibold text-4xl text-white">How Exepart System Operates</h2>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="-mt-56 bg-white">
            <div className="w-full ml-auto mr-auto pb-10">
              <Image
                src='/img/landing-pages/how_exepart_operates.png'
                alt="how-exepart-system-operates"
                height={1500}
                width={1500}
                className="mx-auto shadow-lg"
              />
            </div>
            <div className="w-full ml-auto mr-auto pb-10">
              <Image
                src='/img/landing-pages/testing.png'
                alt="how-exepart-system-operates"
                height={1500}
                width={1500}
                className="mx-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-blue-200">
        <div className="container mx-auto pb-24">
          <div className="justify-center text-center flex flex-wrap">
            <div className="w-full md:w-6/12 px-12 md:px-4 mt-16 mb-8">
              <h2 className="font-semibold text-4xl lg:text-4xl xl:text-4xl text-indigo-900">Registered Members and Products</h2>
            </div>
          </div>

          <div className="w-full md:px-4">
            <div className="py-8 mx-auto sm:max-w-xl md:w-1/2 lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
              <div className="grid grid-cols-2 row-gap-2 md:grid-cols-2">
                <div className="text-center md:border-r">
                  <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{statisticCounter.memberCounter}</h6>
                  <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                    Members
                  </p>
                </div>
                <div className="text-center md:border-r">
                  <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">{statisticCounter.productCounter}</h6>
                  <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                    Products
                  </p>
                </div>
              </div>
            </div>                    

            {/* <div className="text-center">
              <Link href="/members" className="font-medium text-blueGray-700 underline">View all Members</Link>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
