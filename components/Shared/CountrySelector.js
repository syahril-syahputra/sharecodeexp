import ErrorInput from '@/components/Shared/ErrorInput';
import Select from 'react-tailwindcss-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';
export default function CountrySelector(props){
    const options = useMemo(() => countryList().getData(), [])
    let inputData = props.value

    if(props.setInisiate){
        let countryCode = countryList().getValue(props.value)
        inputData = {value: countryCode, label: props.value}
    }

    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {props.label}
            </label>
            <Select 
                isSearchable
                name="country"
                value={inputData}
                onChange={(target) => props.countryHandleChange(target)}
                options={options}
                classNames={{
                    menuButton: () => (
                        `h-12 flex p-1 text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none`
                    ),
                    menu: "absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700",
                    listItem: ({ isSelected }) => (
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                            isSelected
                                ? `text-white bg-blue-500`
                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                        }`
                    ),
                    searchBox: "rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500"
                }}
                />
            {props.errorMsg &&
                <ErrorInput error={props.errorMsg}/>
            }
        </>
    )
}