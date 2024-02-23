import Image from 'next/image'
import React from 'react'
import TitleHomePage from '../Interface/Title/TitleHomePage'

export default function HomeOperateThird() {
  return (
    <section>
      <TitleHomePage
        number={3}
        className=""
        text="Buy/sell original stocks from fellow manufacturers around the world."
      />
      <Image
        src={'/img/landing-pages/home/operate3.svg'}
        width={0}
        height={0}
        className="md:w-1/3 w-1/2 mx-auto"
      />
    </section>
  )
}
