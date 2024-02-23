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

function Homepage() {
  return (
    <div className="">
      <HomeBanner />
      <section className="space-y-12">
        <HomeOperateFirst />
        <HomeOperateSecond />
        <HomeOperateThird />
        <HomeOperateFourth />
      </section>
      <section className="bg-[#40A2E3] my-24  py-32">
        <HomeMembersProducts />
      </section>
      <section>
        <HomeFeatures />
      </section>
    </div>
  )
}
Homepage.layout = LayoutLandingPage

export default Homepage
