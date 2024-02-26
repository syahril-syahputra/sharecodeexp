import Image from 'next/image'
import React from 'react'
import LightButton from '../Interface/Buttons/LightButton'

export default function HomeFeatures() {
  return (
    <div className="container space-y-8">
      <div className="border flex md:flex-row flex-col-reverse border-black rounded-lg p-8">
        <div className="flex flex-col md:w-1/3 justify-between items-center space-y-8 text-center md:items-end md:py-24">
          <span className="text-2xl">
            All products are tested before delivery.
          </span>
          <LightButton className={'border border-black rounded-full mx-auto'}>
            Learn more
          </LightButton>
        </div>
        <Image
          src={'/img/landing-pages/home/whitehouse.svg'}
          width={0}
          height={0}
          className="w-full flex-1"
        />
      </div>
      <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 md:space-x-8">
        <div className="border border-black rounded-lg p-8 md:w-1/3">
          <Image
            src={'/img/landing-pages/home/boxs.svg'}
            width={0}
            height={0}
            className="w-full"
          />
          <div className="flex flex-col justify-center items-center py-8 space-y-8">
            <span className="text-2xl text-center">
              Only manufacturer stocks are allowed
            </span>
            <LightButton className={'border border-black rounded-full'}>
              Learn more
            </LightButton>
          </div>
        </div>
        <div className="border items-center justify-around flex-1 flex border-black rounded-lg p-8">
          <Image
            src={'/img/landing-pages/home/padlock.svg'}
            width={0}
            height={0}
            className="h-96 w-72"
          />
          <div className="flex h-full space-y-8 text-right flex-col justify-start items-end text-2xl">
            <span>
              We don’t disclose your companies’ name in relation to your stocks.
            </span>
            <LightButton className={'border border-black rounded-full'}>
              Learn more
            </LightButton>
          </div>
        </div>
      </div>
    </div>
  )
}
