import React from 'react'
import SelectInput from '../Interface/Form/SelectInput'
import useDataProvince from '@/hooks/useProvince'
import useDataCountry from '@/hooks/useCountry'
import useDataCity from '@/hooks/useCity'

export default function CitySelectorInitial(props) {
  const countryId = props?.countryId
  const provinceId = props?.provinceId
  const countries = useDataCountry() || []
  const countryIdFilter = countries?.find((e) => e?.name == countryId)
  const provinces = useDataProvince(countryIdFilter?.id)
  const cityId = provinces?.find((e) => e?.name == provinceId)
  const cities = useDataCity(cityId?.id) || []
  let inputData = props.value
  const options =
    cities?.map((e) => {
      return {
        value: e?.name || '',
        label: e?.name || '',
      }
    }) || []

  if (props.setInisiate) {
    inputData = { value: props.value, label: props.value }
  }

  return (
    <>
      <SelectInput
        searchable
        disabled={props.disabled}
        label="City"
        name={props.name}
        value={inputData}
        options={options}
        errorMsg={props.errorMsg}
        onChange={(target) => props.cityHandleChange(target)}
      />
    </>
  )
}
