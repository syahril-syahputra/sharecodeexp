import React from 'react'
import LandingPageNavbar from './Navbar'
import SearchInput from '@/components/Interface/Form/SearchInput'
import LandingPageFooter from './Footer'
import TopNavBar from '@/components/Navbar2V/TopNavbar'

export default function LayoutLandingPage(props) {
  return (
    <div className="min-h-screen flex  flex-col ">
      <TopNavBar/>
      <LandingPageNavbar />
      <main className="flex-1 py-8">{props.children}</main>
      <LandingPageFooter />
    </div>
  )
}
