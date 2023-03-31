/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'
import axios from "lib/axios";

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import CategoriesGroup from "@/components/LandingPage/CategoriesGroup";

export default function Index() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const loadCategories = async () => {
    setIsLoading(true)
    const request = await axios.get(`/categories?sub=1`)
      .then((res) => {
        let result = res.data.data
        console.log(result)
        setCategories(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    loadCategories()
  }, [])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-36">
          <div className="justify-center text-center flex flex-wrap mb-10">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl text-indigo-900">Categories</h2>
            </div>
          </div>
          {categories.map((item, index) => {
            return(
              <div className="pt-10" key={index}>
                <CategoriesGroup
                    category={item}
                />
              </div>
            )
          })}

        </div>
      </section>


      <Footer />
    </>
  );
}
