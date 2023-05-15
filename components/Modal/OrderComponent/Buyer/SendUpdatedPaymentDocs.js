import { useState } from "react"
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import TextInput from "@/components/Interface/Form/TextInput"
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import AreaInput from "@/components/Interface/Form/AreaInput";
import SelectInput from "@/components/Interface/Form/SelectInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
export default function SendUpdatedPaymentDocs(props){
    const [couriers, setCouriers] = useState(props.couriers)
    const [paymentDocs, setPaymentDocs] = useState()
    const [buyerShipmentAddress, setBuyerShipmentAddress] = useState('')
    const [buyerAccountInformation, setBuyerAccountInformation] = useState()
    const [receiversName, setReceiversName] = useState('')

    const [courier, setCourier] = useState(null);
    const [selectedCourier, setSelectedCourier] = useState(null);
    const handleCourierChange = value => {
        setCourier(value);
        setSelectedCourier(value.value)
    };

    const handleSubmit = () => {
        props.acceptance(buyerShipmentAddress, paymentDocs, selectedCourier, buyerAccountInformation, receiversName)
    }

    return (
        <BaseModalLarge
            title="Update Payment"
            onClick={() => props.closeModal()}
            body={
                <>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full pr-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Payment Receipt Document
                            </label>
                            <div className="p-5 border-dashed border-2 border-indigo-200">
                                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                    <div className='text-center my-auto'>
                                        <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                    </div>
                                    <div className="text-xs ">
                                        <p>PDF file size no more than 10MB</p>
                                        <input 
                                            className="mt-3" 
                                            type="file"
                                            name='payment_docs'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setPaymentDocs(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo?.Payment_doc &&
                                <ErrorInput error={props.errorInfo?.Payment_doc}/>
                            }
                        </div>                       
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-1/2 pr-4">
                            <AreaInput
                                label="Buyer's Shipment Address"
                                value={buyerShipmentAddress}
                                rows={5}
                                onChange={(input) => 
                                    setBuyerShipmentAddress(input.value)
                                }
                                errorMsg={props.errorInfo?.addressBuyer}
                            ></AreaInput>
                        </div> 
                        <div className="w-1/2">
                            <AreaInput
                                label="Buyer’s Courier Account Information"
                                value={buyerAccountInformation}
                                rows={5}
                                onChange={(input) => 
                                    setBuyerAccountInformation(input.value)
                                }
                                errorMsg={props.errorInfo?.AccountInformation}
                            ></AreaInput>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-1/2 pr-4">
                            <TextInput
                                label="Receivers Name"
                                name="receiversName"
                                required
                                value={receiversName}
                                errorMsg={props.errorInfo?.fullnameReceiving}
                                onChange={(input) => setReceiversName(input.value)}
                            />
                        </div> 
                        <div className="w-1/2 pr-4">
                            <SelectInput
                                label="Courier"
                                value={courier}
                                onChange={handleCourierChange}
                                options={props.couriers}
                                errorMsg={props.errorInfo?.courier}
                            ></SelectInput>
                        </div> 
                    </div>                      
                </>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                    >
                        No, Close
                    </LightButton>

                    <WarningButton
                        disabled={props.isLoading}
                        className="font-bold uppercase "
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Update
                    </WarningButton>
                </>
            }
        ></BaseModalLarge>
    )
}