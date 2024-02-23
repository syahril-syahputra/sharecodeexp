import Image from 'next/image'
import React from 'react'
import TitleHomePage from '../Interface/Title/TitleHomePage'

export default function HomeOperateFirst() {
  return (
    <section>
      <h1 className="container md:text-left text-center mt-24 md:mt-0  mb-8 text-5xl">
        How we operate:
      </h1>

      <TitleHomePage
        number={1}
        className="md:w-1/3"
        text="Upload the excess stocks from your production & turn them into money."
      />
      <div className="flex justify-end">
        <Image
          src={'/img/landing-pages/home/operate1.svg'}
          width={0}
          height={0}
          className="w-auto"
        />
      </div>
    </section>
  )
}
