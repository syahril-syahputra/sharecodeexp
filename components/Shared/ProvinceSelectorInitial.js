import React from 'react'
import SelectInput from '../Interface/Form/SelectInput'
import useDataProvince from '@/hooks/useProvince'
import useDataCountry from '@/hooks/useCountry'

export default function ProvinceSelectorInitial(props) {
  const countryId = props?.countryId
  const countries = useDataCountry() || []
  const countryIdFilter = countries?.filter((e) => e?.name === countryId)
  const provinces = useDataProvince(countryIdFilter[0]?.id)
  let inputData = props.value
  const options =
    provinces?.map((e) => {
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
        label="Province"
        name={props.name}
        value={inputData}
        options={options}
        errorMsg={props.errorMsg}
        onChange={(target) => props.provinceHandleChange(target)}
      />
    </>
  )
}
