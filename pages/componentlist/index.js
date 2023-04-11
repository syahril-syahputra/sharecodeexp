import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import SuccessButton from "@/components/Buttons/SuccessButton"
import DangerButton from "@/components/Buttons/DangerButton"
import WarningButton from "@/components/Buttons/WarningButton"
import InfoButton from "@/components/Buttons/InfoButton"
import LightButton from "@/components/Buttons/LightButton"

import { useState } from "react"

export default function ComponentList() {
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <div className="relative p-2 bg-white">
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

                
            </div>
        </div> 
    )
}