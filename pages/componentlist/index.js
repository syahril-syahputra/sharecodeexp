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

import { useState } from "react"

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
                        disabled={isDisabled}
                        type="button"
                        size=""
                        onClick={() => alert('click')}
                    > 
                        <i className="fas fa-envelope mr-2"></i>
                        Primary
                    </PrimaryButton>

                    <SecondaryButton size="" disabled={isDisabled}>Secondary</SecondaryButton>
                    <SuccessButton size="" disabled={isDisabled}>Success</SuccessButton>
                    <DangerButton size="" disabled={isDisabled}>Danger</DangerButton>
                    <WarningButton size="" disabled={isDisabled}>Warning</WarningButton>
                    <InfoButton size="" disabled={isDisabled}>Info</InfoButton>
                    <LightButton size="" disabled={isDisabled}>Light</LightButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton size="" disabled={isDisabled} outline><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <SecondaryButton size="" disabled={isDisabled} outline>Secondary</SecondaryButton>
                    <SuccessButton size="" disabled={isDisabled} outline>Success</SuccessButton>
                    <DangerButton size="" disabled={isDisabled} outline>Danger</DangerButton>
                    <WarningButton size="" disabled={isDisabled} outline>Warning</WarningButton>
                    <InfoButton size="" disabled={isDisabled} outline>Info</InfoButton>
                    <LightButton size="" disabled={isDisabled} outline>Light</LightButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton size="sm" disabled={isDisabled} outline><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <PrimaryButton size="md" disabled={isDisabled} outline>Primary</PrimaryButton>
                    <PrimaryButton size="lg" disabled={true} outline>Primary</PrimaryButton>
                </div>
                <div className="text-center pb-2">
                    <PrimaryButton size="sm" disabled={true}><i className="fas fa-envelope mr-2"></i>Primary</PrimaryButton>
                    <PrimaryButton size="md" disabled={isDisabled}>Primary</PrimaryButton>
                    <PrimaryButton size="lg" disabled={isDisabled}>Primary</PrimaryButton>
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
                            disabled    
                            label="Categories"
                            name="categories"
                            value={category}
                            onChange={(input) => handleSelectInput(input)}
                        />
                        
                    </div>
                </div>

                
            </div>
        </div> 
    )
}