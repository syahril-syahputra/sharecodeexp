//button
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton"
import SuccessButton from "@/components/Interface/Buttons/SuccessButton"
import DangerButton from "@/components/Interface/Buttons/DangerButton"
import WarningButton from "@/components/Interface/Buttons/WarningButton"
import InfoButton from "@/components/Interface/Buttons/InfoButton"
import LightButton from "@/components/Interface/Buttons/LightButton"

//input
import TextInput from "@/components/Interface/Form/TextInput"
import NumberInput from "@/components/Interface/Form/NumberInput"
import AreaInput from "@/components/Interface/Form/AreaInput"
import SelectInput from "@/components/Interface/Form/SelectInput"

//base table
import BaseTable from "@/components/Interface/Table/BaseTable"

import { useRef, useState } from "react"

export default function ComponentList() {
    const [isDisabled, setIsDisabled] = useState(false)

    const [enteredUser, setEnteredUser] = useState("")
    const handleEnteredUser = (input) => {
        setEnteredUser(input.value)
    }
    const [enteredInput, setEnteredInput] = useState({
        textarea: '',
        number: ''
    })
    const handleEnteredInput = (input) => {
        setEnteredInput({...enteredInput, [input.name]:input.value})
    }

    const [category, setCategory] = useState({})
    const handleSelectInput = (input) => {
        setCategory(input)
    }

    const [isBusy, setIsBusy] = useState(true)
    const tableHeader = useRef([
        'First Name',
        'Last Name',
        'Age',
        'Action'
    ])
    const tableData = useRef([
        {
            firstName: 'Kadek',
            lastName: 'Cahya',
            age: '25',
            id: 1
        },
        {
            firstName: 'John',
            lastName: 'Doe',
            age: '25',
            id: 2
        },
        {
            firstName: 'Emilia',
            lastName: 'Clark',
            age: '18',
            id: 3
        }
    ])

    return (
        <div className="relative p-2 bg-white mb-20">
            <div className="text-center pb-10 mt-10">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 uppercase">
                    <p>Components List</p>
                </h3>
                {/* <h3 className="text-md font-semibold leading-normal mb-2 text-blue-700 mb-2">
                    <i>Please  before accesing this URL</i>
                </h3> */}
            </div>

            <div className="text-center pb-10 mt-10">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 uppercase">
                    <p>button</p>
                </h3>

                <div className="text-center pb-2">
                    <PrimaryButton 
                        className="m-1"
                        disabled={isDisabled}
                        type="button"
                        size=""
                        onClick={() => alert('click')}
                    > 
                        <i className="fas fa-envelope mr-2"></i>
                        Primary
                    </PrimaryButton>

                    <SecondaryButton className="m-1" size="" disabled={isDisabled}>Secondary</SecondaryButton>
                    <SuccessButton className="m-1" size="" disabled={isDisabled}>Success</SuccessButton>
                    <DangerButton className="m-1" size="" disabled={isDisabled}>Danger</DangerButton>
                    <WarningButton className="m-1" size="" disabled={isDisabled}>Warning</WarningButton>
                    <InfoButton className="m-1" size="" disabled={isDisabled}>Info</InfoButton>
                    <LightButton className="m-1" size="" disabled={isDisabled}>Light</LightButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton className="m-1" size="" disabled={isDisabled} outline><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <SecondaryButton className="m-1" size="" disabled={isDisabled} outline>Secondary</SecondaryButton>
                    <SuccessButton className="m-1" size="" disabled={isDisabled} outline>Success</SuccessButton>
                    <DangerButton className="m-1" size="" disabled={isDisabled} outline>Danger</DangerButton>
                    <WarningButton className="m-1" size="" disabled={isDisabled} outline>Warning</WarningButton>
                    <InfoButton className="m-1" size="" disabled={isDisabled} outline>Info</InfoButton>
                    <LightButton className="m-1" size="" disabled={isDisabled} outline>Light</LightButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton className="m-1" size="sm" disabled={isDisabled} outline><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <PrimaryButton className="m-1" size="md" disabled={isDisabled} outline>Primary</PrimaryButton>
                    <PrimaryButton className="m-1" size="lg" disabled={true} outline>Primary</PrimaryButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton className="m-1" size="sm" disabled={true}><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <PrimaryButton className="m-1" size="md" disabled={isDisabled}>Primary</PrimaryButton>
                    <PrimaryButton className="m-1" size="lg" disabled={isDisabled}>Primary</PrimaryButton>
                </div>

            </div>

            <div className="text-center pb-10 mt-10">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 uppercase">
                    <p>Input Field</p>
                </h3>

                <div className="w-1/2 px-3 mx-auto">
                    <div className="mb-5">
                        <TextInput
                            label="User Email"
                            name="email"
                            required
                            value={enteredUser}
                            onChange={(input) => handleEnteredUser(input)}
                        />
                        <PrimaryButton className="mt-2"><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    </div>
                    <div className="mb-5">
                        <TextInput
                            label="User Email"
                            name="email"
                            required
                            disabled
                            value={enteredUser}
                            onChange={(input) => handleEnteredUser(input)}
                            errorMsg={["disabled", "second error"]}
                        />
                    </div>
                    <div className="mb-5">
                        <AreaInput
                            label="Text Area"
                            name="textarea"
                            required
                            value={enteredInput?.textarea}
                            onChange={(input) => handleEnteredInput(input)}
                        />
                        {enteredInput?.textarea}
                    </div>
                    <div className="mb-5">
                        <NumberInput
                            label="Number"
                            name="number"
                            required
                            min={15}
                            step={2}
                            value={enteredInput?.number}
                            onChange={(input) => handleEnteredInput(input)}
                        />
                        {enteredInput?.number}
                    </div>
                    <div className="mb-5">
                        <SelectInput
                            searchable                                
                            label="Categories"
                            name="categories"
                            value={category}
                            onChange={(input) => handleSelectInput(input)}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center mx-auto w-1/2">
                {/* <BaseTable header={tableHeader.current} >
                    <div slot="headData">
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Act
                        </th>
                    </div>
                    <div slot="tableData">
                        {tableData.current.map((item) => {
                            return(
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.firstName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.age}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.id}
                                    </td>
                                </tr>
                            )
                        })}
                    </div>
                </BaseTable> */}
                <BaseTable                 
                    header={
                        <>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Act
                            </th>
                        </>
                    }
                    tableData={
                        <>
                            {tableData.current.map((item) => {
                                return(
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                            {item.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.age}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.id}
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    }                    
                />
            </div>
        </div> 
    )
}