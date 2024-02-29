import { PageSEO } from '@/components/Utils/SEO'
import React, { Fragment } from 'react'
import LayoutLandingPage from '@/layouts/LandingPage'
import HomeBanner from '@/components/home/HomeBanner'
import HomeOperateFirst from '@/components/home/HomeOperateFirst'
import HomeOperateSecond from '@/components/home/HomeOperateSecond'
import HomeOperateThird from '@/components/home/HomeOperateThird'
import HomeOperateFourth from '@/components/home/HomeOperateFourth'
import HomeMembersProducts from '@/components/home/HomeMembersProducts'
import HomeFeatures from '@/components/home/HomeFeatures'
import siteMetadata from '@/utils/siteMetadata'
import axios from 'lib/axios'

function Homepage({ data }) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />

      <div className="">
        <HomeBanner />
        <section className="space-y-12 container">
          <HomeOperateFirst />
          <HomeOperateSecond />
          <HomeOperateThird />
          <HomeOperateFourth />
        </section>
        <section className="bg-[#40A2E3] my-24  py-32">
          <HomeMembersProducts
            product={data.product || 0}
            member={data.member || 0}
          />
        </section>
        <section className="md:px-64 container">
          <HomeFeatures />
        </section>
      </div>
    </>
  )
}
Homepage.layout = LayoutLandingPage

export default Homepage

export async function getServerSideProps(context) {
  let data = {}
  try {
    const response = await axios.get('/statistic-counter')
    data = response.data.data
  } catch (error) {}
  return {
    props: {
      data,
    },
  }
}
