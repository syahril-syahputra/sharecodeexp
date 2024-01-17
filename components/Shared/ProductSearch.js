import React from 'react'
import PrimaryWrapper from '../Interface/Wrapper/PrimaryWrapper'
import TextInput from '../Interface/Form/TextInput'
import InfoButton from '../Interface/Buttons/InfoButton'
import PrimaryButton from '../Interface/Buttons/PrimaryButton'
import SelectInput from '../Interface/Form/SelectInput'
import CountrySelector from './CountrySelector'
import { useState } from 'react'

export default function ProductSearch(props) {
  const [manufacturerPartNumber, setManufacturerPartNumber] =
    props.manufacturerPartNumber
  const [selectedCountry, setselectedCountry] = useState()
  const [stateCountry, setStateCountry] = props.stateCountry
  const [companyStatus, setCompanyStatus] = props.companyStatus
  return (
    <PrimaryWrapper className={'mt-5 p-5'}>
      <h2 className="text-xl text-center">{props.title}</h2>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center">
          <TextInput
            value={manufacturerPartNumber}
            onChange={(target) => setManufacturerPartNumber(target.value)}
            placeholder="Manufacturer Part Number"
          />
        </div>
        <div className="text-center">
          <CountrySelector
            setInisiate
            disabled={props.isLoading}
            name="country"
            placeholder="Stock Location"
            value={selectedCountry}
            onChange={(target) => {
              setStateCountry(target.value)
              setselectedCountry(target)
            }}
            searchable
            // errorMsg={errorInfo.country}
          />
        </div>
        <div className="text-center">
          <SelectInput
            searchable
            value={companyStatus}
            options={props.companyOptions}
            onChange={(input) => setCompanyStatus(input)}
          />
        </div>
      </div>
      <div className="mt-10 text-center">
        <PrimaryButton onClick={props.search} className="w-1/2 mr-2">
          Search
        </PrimaryButton>
        <InfoButton onClick={props.reset} className="w-1/6">
          Reset
        </InfoButton>
      </div>
    </PrimaryWrapper>
  )
}
