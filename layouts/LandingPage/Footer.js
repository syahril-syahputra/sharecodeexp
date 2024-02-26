import Image from 'next/image'
import React from 'react'
import { PublicUrl } from '@/route/route-url'
import Link from 'next/link'

const ItemLink = ({ title, href }) => {
  return (
    <li className="text-gray-300 text-sm hover:text-white cursor-pointer">
      <Link href={href}>{title}</Link>
    </li>
  )
}
export default function LandingPageFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-top-navbar">
      <div className="container  flex md:flex-row items-center flex-col justify-start py-9 md:text-left md:space-y-0 md:items-start text-center space-y-8 md:space-x-24 text-white">
        <div className="space-y-4 flex flex-col">
          <Image
            src={'/img/landing-pages/exepart-white.png'}
            width={0}
            height={0}
            className="h-auto w-[200px]"
          />
          <span className="text-gray-50 text-sm">
            © {year} EXEpart, Inc. <br></br>All rights reserved
          </span>
        </div>

        <ul className="space-y-4">
          <span>Resources</span>
          <ItemLink title="Terms of Use" href={PublicUrl.termOfUse} />
          <ItemLink title="Cookies" href={PublicUrl.cookiePolicy} />
          <ItemLink title="Privacy Policy" href={PublicUrl.privacyPolicy} />
          <ItemLink title="Terms of Sale" href={PublicUrl.conditionOfSale} />
          <ItemLink
            title="Terms of Export"
            href={PublicUrl.conditionOfExport}
          />
        </ul>
        <ul className="space-y-4">
          <span>Navigation</span>
          <ItemLink title="Home" href="" />
          <ItemLink title="Register" href="/auth/register" />
          <ItemLink title="Sign In" href="/auth/login" />
        </ul>
      </div>
    </footer>
  )
}
