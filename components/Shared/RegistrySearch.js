import React, { useState } from 'react'

import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import InfoButton from '@/components/Interface/Buttons/InfoButton'
import TextInput from '@/components/Interface/Form/TextInput'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import CountrySelector from '@/components/Shared/CountrySelector'
import SelectInputSector from '../Interface/Form/SelectInputSector'
import useSctor from '@/hooks/useSctor'

function RegistrySearch(props) {
  const [name, setname] = props.registryName
  const [sector, setsector] = props.registrySector
  const [country, setcountry] = props.registryCountry
  const sectors = useSctor()
  const handleResetSearchFilter = () => {
    setname('')
    setsector('')
    setcountry('')
    props.reset()
  }

  return (
    <PrimaryWrapper className={`mt-5 p-5`}>
      <h2 className="text-xl text-center">{props.title}</h2>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="text-center">
          <TextInput
            title="Nam"
            value={name}
            onChange={(target) => setname(target.value)}
            placeholder="Company Name"
          ></TextInput>
        </div>
        <div className="text-center">
          <SelectInputSector
            searchable
            value={sector}
            required
            placeholder="Select Sector"
            options={sectors}
            onChange={(value) => {
              setsector(value)
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="text-center  mt-4">
          <CountrySelector
            setInisiate
            disabled={props.isLoading}
            name="country"
            placeholder="Select Country"
            value={country}
            onChange={(value) => setcountry(value)}
            searchable
            // errorMsg={errorInfo.country}
          />
        </div>
      </div>

      <div className="mt-10 text-center">
        <PrimaryButton onClick={() => props.search()} className="w-1/2 mr-2">
          Search
        </PrimaryButton>
        <InfoButton onClick={handleResetSearchFilter} className="w-1/6">
          Reset
        </InfoButton>
      </div>
    </PrimaryWrapper>
  )
}

export default RegistrySearch
