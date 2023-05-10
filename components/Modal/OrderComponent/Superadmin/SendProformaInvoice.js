import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function SendProformaInvoice(props){
    const [proformaDocs, setProformaDocs] = useState()

    return (
        <>
            <BaseModalLarge
                title="Send Proforma Invoice"
                onClick={() => props.closeModal()}
                body={
                    <>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Proforma Invoice Document
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
                                            name='proformaDocs'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setProformaDocs(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo.proforma_doc &&
                                <ErrorInput error={props.errorInfo.proforma_doc}/>
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
                            >
                            No, Close
                        </LightButton>

                        <PrimaryButton
                            disabled={props.isLoading}
                            className="font-bold uppercase"
                            onClick={() => props.acceptance(proformaDocs)}>
                            {props.isLoading &&
                                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                            }
                            Send Proforma Invoice
                        </PrimaryButton>
                    </>
                }
            ></BaseModalLarge>
        </>
    )
}