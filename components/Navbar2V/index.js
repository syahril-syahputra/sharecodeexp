import React from 'react'
import TopNavBar from '@/components/Navbar2V/TopNavbar'
import BottomNavbar from './BottomNavbar'

const Navbar = () => {
  return (
    <div className="w-full fixed overflow-auto z-10">
      <TopNavBar />
      <BottomNavbar />
    </div>
  )
}

export default Navbar
