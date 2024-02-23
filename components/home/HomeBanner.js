import React, { useState } from 'react'
import SearchInput from '../Interface/Form/SearchInput'
import { useRouter } from 'next/router'

export default function HomeBanner() {
  const [search, setSearch] = useState('')

  const router = useRouter()
  function searchComponent(event) {
    if (event.key === 'Enter' && !!search) {
      searchComponentClick()
    }
  }
  function searchComponentClick() {
    router.replace(`/product/search?q=${search}`)
  }
  return (
    <section className=" container relative overflow-hidden">
      <video
        className="w-full md:w-9/12 -right-10 relative md:absolute md:float-right md:-mr-32"
        autoPlay
        muted
        loop
        src="/videos/banner.mp4"
      />
      <div className="md:py-36 z-10 relative md:w-1/2 text-center md:text-left -mt-32 md:mt-0">
        <div className="text-6xl whitespace-nowrap mb-8 ">
          M2M excess
          <br />
          stock platform.
        </div>
        <SearchInput
          value={search}
          onChange={(target) => setSearch(target.value)}
          onKeyDown={searchComponent}
          onButtnClick={searchComponentClick}
          type="text"
        />
      </div>
    </section>
  )
}
