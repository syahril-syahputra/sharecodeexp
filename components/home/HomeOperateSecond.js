import Image from 'next/image'
import React from 'react'
import TitleHomePage from '../Interface/Title/TitleHomePage'

export default function HomeOperateSecond() {
  return (
    <section>
      <TitleHomePage
        number={2}
        className="w-full md:justify-end"
        text="Search the inventory of other manufacturers."
      />
      <div className="flex items-end justify-end">
        <Image
          src={'/img/landing-pages/home/operate2.svg'}
          width={0}
          height={0}
          className="w-5/6"
        />
      </div>
    </section>
  )
}
