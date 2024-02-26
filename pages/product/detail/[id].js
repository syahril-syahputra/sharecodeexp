import React, { Fragment, useState } from 'react'
import axios from 'lib/axios'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from '@/components/Footers/Footer'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import Link from 'next/link'
import LightButton from '@/components/Interface/Buttons/LightButton'
import { checkValue } from '@/utils/general'
import LayoutLandingPage from '@/layouts/LandingPage'
import DarkButton from '@/components/Interface/Buttons/DarkButton'
import { useSession } from 'next-auth/react'
const Items = ({ title, value }) => {
  return (
    <div className="text-lg space-y-4">
      <div className="font-semibold">{title} : </div>
      <span className="text-sm">{value}</span>
    </div>
  )
}

function DetailProduct({ data, ...props }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [dataArr, setDataArr] = useState(data)
  const { data: session, status } = useSession()

  return (
    <Fragment>
      <PageSEO title={siteMetadata?.title} />
      <div className="font-semibold max-w-2xl px-4 mx-auto text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        Component Details
      </div>
      <div className="py-8 container flex justify-center items-center ">
        <div className="space-y-4 md:space-y-6 w-full max-w-2xl border border-black rounded-2xl p-8">
          <Link href={`/product/search?q=${dataArr?.part_number}`}>
            <LightButton size="md" className="">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
          {!dataArr ? (
            <LoadingState className={'pb-40'} />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold">{data.slug}</h1>
              <div>
                <div className="text-lg py-2">Description</div>
                <span>{data.description}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-8">
                <Items title="Part Number" value={dataArr?.part_number} />
                <Items title="MOQ" value={dataArr?.moq} />
                <Items
                  title="Sector"
                  value={checkValue(dataArr?.company_sector)}
                />
                <Items title="Country" value={dataArr?.stock_location} />
                <Items title="Manufacturer" value={dataArr?.manufacturer} />
                <Items title="Date Code" value={dataArr?.datecode} />
                <Items
                  title="Available Quantity"
                  value={dataArr?.available_quantity}
                />
                <Items title="Packaging" value={dataArr?.packaging} />
              </div>
            </div>
          )}
        </div>
      </div>
      {status === 'authenticated' && (
        <div className="text-center  px-4">
          <Link href={`/admin/member/buyer/product/details/${data.slug}`}>
            <DarkButton className="md:w-1/4 w-full mx-auto">Inquiry</DarkButton>
          </Link>
        </div>
      )}
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

DetailProduct.layout = LayoutLandingPage
export default DetailProduct
