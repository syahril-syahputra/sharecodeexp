import React, { useState, useEffect } from 'react'
import SearchInput from '../Interface/Form/SearchInput'
import { useRouter } from 'next/router'
import axios from 'lib/axios'
import Link from 'next/link'

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

  // sugestion
  const [suggestion, setSuggestion] = useState([])
  const [isSuggestionLoading, setSuggestionLoading] = useState(false)
  useEffect(() => {
    if (!!search) {
      setSuggestionLoading(true)
      const getData = setTimeout(() => {
        axios
          .get(`/search/suggest/${search}`)
          .then((response) => {
            setSuggestion(response.data.data)
          })
          .finally(() => setSuggestionLoading(false))
      }, 1000)

      return () => clearTimeout(getData)
    }
    setSuggestionLoading(false)
  }, [search])

  return (
    <section className="pt-20 pb-40 container relative overflow-hidden">
      <video
        className="w-full md:w-9/12 -right-10 -top-8 relative md:absolute md:float-right md:-mr-32"
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

        <div className="text-left py-2">
          {suggestion && suggestion.length > 0 && (
            <div>
              {isSuggestionLoading && (
                <div className="text-blueGray-500 text-lg">
                  Suggestion :
                  <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                </div>
              )}
              {!isSuggestionLoading && (
                <div className="flex justify-start text-lg">
                  <span className="text-blueGray-500">Suggestion :</span>
                  {suggestion.map((name, index) => (
                    <Link
                      key={`${name}--${index}`}
                      href={`/product/search?q=${name}`}
                      className="mx-1 underline text-blue-500 italic"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          {isSuggestionLoading && suggestion.length === 0 && (
            <i className="ml-2 fas fa-circle-notch fa-spin"></i>
          )}
        </div>
      </div>
    </section>
  )
}
