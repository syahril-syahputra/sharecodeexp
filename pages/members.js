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
import ManufacturerCard from "@/components/LandingPage/ManufacturerCard";
import CompaniesGroup from "@/components/LandingPage/CompaniesGroup";

export default function Index() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  //load companies
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [companies, setCompanies] = useState([])
  const loadCompanies = async () => {
    const request = await axios.get(`/allcompany`)
      .then((res) => {
        let result = res.data
        setCompanies(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    loadCompanies()
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
                <h2 className="font-semibold text-4xl text-indigo-900">Our Members</h2>
              </div>
            </div>
              {companies.map((item, index) => {
                return(
                  <div className="pt-10" key={index}>
                    <CompaniesGroup
                        company={item}
                    />
                  </div>
                )
              })}
              {isLoading &&<div>
              <div className='text-center my-auto mt-10'>
                  <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
              </div>
          </div>}
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
