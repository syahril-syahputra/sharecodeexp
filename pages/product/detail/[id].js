import React, { Fragment, useEffect, useState } from 'react'
import axios from 'lib/axios'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from '@/components/Footers/Footer'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import Link from 'next/link'
import { AdminUrl } from '@/route/route-url'
import LightButton from '@/components/Interface/Buttons/LightButton'
import { Router } from 'next/router'

export default function DetailProduct({ data, ...props }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [dataArr, setDataArr] = useState(data)
  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   const start = () => {
  //     setLoading(true)
  //   }
  //   const end = () => {
  //     setLoading(false)
  //   }
  //   Router.events.on('beforeHistoryChange', start)
  //   Router.events.on('routeChangeStart', start)
  //   Router.events.on('routeChangeComplete', end)
  //   Router.events.on('routeChangeError', end)

  //   return () => {
  //     Router.events.off('routeChangeStart', start)
  //     Router.events.off('beforeHistoryChange', start)
  //     Router.events.off('routeChangeComplete', end)
  //     Router.events.off('routeChangeError', end)
  //   }
  // }, [])

  return (
    <Fragment>
      <PageSEO title={siteMetadata?.title} />
      <IndexNavbar fixed />
      <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
          <div className="flex flex-wrap items-center justify-between pt-16">
            <h2 className="font-semibold text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
              Detail Component
            </h2>
            <Link href={`/product/search?q=${dataArr?.part_number}`}>
              <LightButton size="sm" className="">
                <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                Back
              </LightButton>
            </Link>
          </div>
          <PrimaryWrapper className={'mt-6'}>
            {!dataArr ? (
              <LoadingState className={'pb-40'} />
            ) : (
              <>
                <div className="w-full">
                  <div className="px-3 my-6 md:mb-0 text-center">
                    {dataArr?.img ? (
                      <div className="p-16 border mx-2 my-4">
                        <img
                          className="object-contain mb-3 h-40 mx-auto"
                          alt={dataArr?.Manufacturer}
                          src={publicDir + '/product_images/' + dataArr?.img}
                        />
                      </div>
                    ) : (
                      <div className="px-3 mb-6 md:mb-0 text-center">
                        <div className="p-24 border mx-2 my-4">
                          product image {dataArr?.Manufacturer}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-25 mt-5">
                    <div></div>
                  </div>
                </div>
                <div className="overflow-x-auto pb-10">
                  <table className="w-50 text-sm text-left text-gray-500 bg-white">
                    <tbody>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Manufacturer Part Number
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.part_number}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Manufacturer
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.manufacturer}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Available Quantity
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.available_quantity}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          MOQ
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">{dataArr?.moq}</td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Country
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.stock_location}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.description}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Date Code
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.datecode}
                        </td>
                      </tr>
                      <tr className="text-black hover:bg-slate-100">
                        <th scope="col" className="px-6 py-3">
                          Packaging
                        </th>
                        <td scope="row" className="text-sm px-6 py-4">
                          :
                        </td>
                        <td className="text-sm px-2 py-4">
                          {dataArr?.packaging}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </PrimaryWrapper>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}

async function fetchData(context) {
  try {
    const data = await axios.get(
      `product/details/${encodeURIComponent(context?.query?.id)}`
    )

    return data
  } catch (error) {
    throw error
  }
}

export async function getServerSideProps(context) {
  const result = await fetchData(context)

  return {
    props: {
      data: result?.data?.data,
    },
  }
}
