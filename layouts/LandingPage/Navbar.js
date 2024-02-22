import DarkButton from '@/components/Interface/Buttons/DarkButton'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import LoginButton from '@/components/Navbars/LoginButton'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LandingPageLoginButton from './LoginButton'

export default function LandingPageNavbar() {
  return (
    <nav className="container pt-8 pb-4 flex justify-between items-center">
      <Link href={'/'}>
        <Image
          src={'/exepart.svg'}
          width={0}
          height={0}
          className="w-auto h-30"
        />
      </Link>

      <LandingPageLoginButton />
    </nav>
  )
}
