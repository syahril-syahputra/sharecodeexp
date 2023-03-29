/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'
import axios from "lib/axios";
import Image from "next/image"

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import ManufacturerCard from "@/components/LandingPage/ManufacturerCard";

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

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const searchData = async (page=1) =>{
    setIsLoading(true)
    const response = await axios.get(`/search?page=${page}`)
      .then((response) => {
        let result = response.data.data
        setData(result.data)
      }).catch((error) => {
        // console.log(error.response)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    searchData(search)
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto">
          
          <div className="w-full px-12 md:px-4 mt-40">
            <div className="justify-center text-center flex flex-wrap mb-20">
              <div className="w-full md:w-6/12 px-12 md:px-4">
                <h2 className="font-semibold text-4xl text-indigo-900">Our Member</h2>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 place-content-center">
              <ManufacturerCard
                imageSrc='/img/manufacturer/bluespacelogo_blue.png'
                label='BlueSpace'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/HESA_LOGO.png'
                label='HESA'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/Hitit_Defense.png'
                label='Hitit Defense'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/RFLOGY-Logo.png'
                label='RFLOGY'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/bluespacelogo_blue.png'
                label='BlueSpace'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/HESA_LOGO.png'
                label='HESA'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/Hitit_Defense.png'
                label='Hitit Defense'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/RFLOGY-Logo.png'
                label='RFLOGY'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/bluespacelogo_blue.png'
                label='BlueSpace'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/HESA_LOGO.png'
                label='HESA'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/Hitit_Defense.png'
                label='Hitit Defense'
              />
              <ManufacturerCard
                imageSrc='/img/manufacturer/RFLOGY-Logo.png'
                label='RFLOGY'
              />
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
