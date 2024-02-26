import Image from 'next/image'
import React from 'react'
import TitleHomePage from '../Interface/Title/TitleHomePage'

export default function HomeOperateFourth() {
  return (
    <section>
      <TitleHomePage
        number={4}
        className="w-full md:justify-end"
        text="Send / Receive inquiry"
      />
      <Image
        src={'/img/landing-pages/home/operate4.svg'}
        width={0}
        height={0}
        className="md:w-1/2 w-full mx-auto"
      />
    </section>
  )
}
