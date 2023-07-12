import countryList from 'react-select-country-list';
import { useMemo } from 'react';
import SelectInput from '../Interface/Form/SelectInput';
export default function CountrySelector(props){
    const options = useMemo(() => countryList().native().nativeData, [])
    let inputData = props.value

    if(props.setInisiate){
        let countryCode = countryList().native().getValue(props.value)
        inputData = {value: countryCode, label: props.value}
    }

    return (
        <>
            <SelectInput
                searchable  
                disabled={props.disabled}
                label="Country"
                name={props.name}
                value={inputData}
                options={options}
                errorMsg={props.errorMsg}
                onChange={(target) => props.countryHandleChange(target)}
            />
        </>
    )
}