import React from 'react'
import countryList from 'react-select-country-list'
import {useMemo} from 'react'
import SelectInput from '../Interface/Form/SelectInput'
import useDataCountry from '@/hooks/useCountry'

export default function CountrySelectorInitial(props) {
  const countries = useDataCountry()
  let inputData = props.value
  const options =
    countries?.map((e) => {
      return {
        value: e?.name || '',
        label: e?.name || '',
      }
    }) || []

  if (props.setInisiate) {
    let countyCode = countries
      .filter((obj) => obj.name == props.value)
      .map((x) => x.id)
    inputData = {value: countyCode[0], label: props.value}
  }

  return (
    <>
      <SelectInput
        searchable
        disabled={props.disabled}
        label={props?.label}
        name={props.name}
        value={inputData}
        options={options}
        errorMsg={props.errorMsg}
        onChange={(target) => props.countryHandleChange(target)}
      />
    </>
  )
}
