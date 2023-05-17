import { useState } from "react";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
export default function CompleteOrder(props){
    const [invoiceDocs, setInvoiceDocs] = useState()
    const handleSubmit = () => {
        props.acceptance(invoiceDocs)
    }

    return (
        <BaseModalMedium 
            title="Complete Order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">Complete</span> this Order?
                    </p>
                    <div className="w-full mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Input Invoice to Seller
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
                                            setInvoiceDocs(target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {props.errorInfo.PaymentProof &&
                            <ErrorInput error={props.errorInfo.PaymentProof}/>
                        }
                    </div>
                </>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                    >No, Close</LightButton>

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase "
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Complete Order
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    )
}