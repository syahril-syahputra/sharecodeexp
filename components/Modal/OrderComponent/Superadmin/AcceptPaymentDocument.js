import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function AcceptPaymentDocument(props){
    const [shipInfoForSeller, setShipInfoForSeller] = useState()

    return (
        <BaseModalLarge
            title="Accept Payment"
            onClick={() => props.closeModal()}
            body={
                <>
                    <div className="">
                        <p className="text-blueGray-500 text-lg leading-relaxed">
                            Do you agree to <span className="text-blueGray-700 font-bold">accept</span> this payment?
                        </p>

                        <div className="w-full mb-6 mt-10">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Shipment Info Document
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
                                            name='shipInfoForSeller'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setShipInfoForSeller(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo?.shipinfoforseller &&
                                <ErrorInput error={props.errorInfo?.shipinfoforseller}/>
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
                        onClick={() => props.acceptance(shipInfoForSeller)}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Accept & Send Document
                    </PrimaryButton>
                    
                </>
            }
        ></BaseModalLarge>
    );
}