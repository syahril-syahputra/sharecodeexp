import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import AreaInput from "@/components/Interface/Form/AreaInput";
export default function SendTracker(props){
    const [sellerTracker, setSellerTracker] = useState('')
    const [expectedShippingDateSeller, setExpectedShippingDateSeller] = useState('')
    const [paymentAccount, setPaymentAccount] = useState()
    const [shippingInformation, setshippingInformation] = useState('')

    const handleSubmit = () => {
        props.acceptance(sellerTracker, paymentAccount, expectedShippingDateSeller, shippingInformation)
    }
    return (
        <BaseModalLarge
            title="Payment Account Information & Invoice"
            onClick={() => props.closeModal()}
            body={
                <>
                    <div className=""> 
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3">
                                <TextInput
                                    label="Tracking Number"
                                    name="sellerTracker"
                                    value={sellerTracker}
                                    onChange={(input) => setSellerTracker(input.value)}
                                    errorMsg={props.errorInfo?.trackingSeller}
                                />
                            </div>
                            <div className="w-1/2 px-3">
                                <TextInput
                                    type="date"
                                    label="Expected Shipment Date"
                                    name="expectedShippingDateSeller"
                                    value={expectedShippingDateSeller}
                                    onChange={(input) => setExpectedShippingDateSeller(input.value)}
                                    errorMsg={props.errorInfo?.expectedShippingDateSeller}
                                />
                            </div>                            
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3">
                                <AreaInput
                                    label="Seller's Shipment Address"
                                    value={shippingInformation}
                                    rows={5}
                                    onChange={(input) => 
                                        setshippingInformation(input.value)
                                    }
                                    errorMsg={props.errorInfo?.shipping_information}
                                ></AreaInput>
                            </div>
                        </div>
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Payment Account & Invoice
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
                                            name='invoiceDocs'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setPaymentAccount(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo.PaymentDocSeller &&
                                <ErrorInput error={props.errorInfo.PaymentDocSeller}/>
                            }
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

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase"
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Send
                    </PrimaryButton>
                </>
            }
        ></BaseModalLarge>
    )
}


