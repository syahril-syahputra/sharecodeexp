/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'


//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import MemberCard from "@/components/LandingPage/MemberCard";
import ComponentTable from "@/components/LandingPage/ComponentTable";
import ImageLogo from "@/components/ImageLogo/ImageLogo";

export default function Index() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  function searchComponent(event){
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`)
    }
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6">
        <div className="container mx-auto mt-48">
          <div className="">
            <div className="relative object-center px-12 md:px-4 ml-auto mr-auto">
              <ImageLogo
                size={700}
              />
            </div>
            <div className="w-full px-12 md:px-4 ml-auto mr-auto">
              <div className="text-center items-stretch mb-3 mt-3">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent text-lg items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search mt-2"></i>
                </span>
                <input
                  value={search}
                  onChange={({target}) => setSearch(target.value)}
                  onKeyDown={searchComponent}
                  type="text" 
                  placeholder="Search for the components" 
                  className="border-0 md:w-8/12 px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white text-base shadow outline-grey focus:outline-none focus:ring w-full pl-10"/>
              </div>  
              <div className="text-center mt-10">
                <Link
                  href={!!search ? `/product/search?q=${search}`: ''}
                  className="text-white font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40 relative bg-blueGray-100">
        <div className="container mx-auto">
          <div className="justify-center text-center flex flex-wrap">
            <div className="w-full md:w-6/12 px-12 md:px-4 mt-16">
              <h2 className="font-semibold text-4xl">List of Components</h2>
            </div>
          </div>
          <div className="mb-4 text-end  mt-14">
            <Link href="/product/search" className="font-medium text-blueGray-700 underline">View all Components</Link>
          </div>
          <div className="relative overflow-x-auto">
            <ComponentTable/>
          </div>
        </div>
      </section>

      <section className="mt-20 md:mt-20 pb-40 relative bg-white">
        <div className="container mx-auto">
          <div className="justify-center text-center flex flex-wrap mb-20">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl">Our Members</h2>
            </div>
          </div>

          <div className="w-full px-12 md:px-4">
            <div className="mb-4 text-end">
              <Link href="/" className="font-medium text-blueGray-700 underline">View all Members</Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
              <MemberCard/>
              <MemberCard/>
              <MemberCard/>
              <MemberCard/>
              <MemberCard/>
              <MemberCard/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
