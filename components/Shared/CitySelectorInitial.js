import React from 'react'
import SelectInput from '../Interface/Form/SelectInput'
import useDataProvince from '@/hooks/useProvince'
import useDataCountry from '@/hooks/useCountry'

export default function CitySelectorInitial(props) {
  const provinceId = props?.provinceId
  const countries = useDataCountry() || []
  const countryIdFilter = countries?.filter(
    (e) => e?.name === provinceId?.value
  )
  const provinces = useDataProvince(countryIdFilter[0]?.id)
  let inputData = props.value
  const options = []

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
