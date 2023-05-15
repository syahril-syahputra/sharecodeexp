import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
export default function UploadAdditionalDocuments(props){
    const [additionalDocs, setAdditionalDocs] = useState()

    return (
        <BaseModalLarge
            title="Upload Additional Documents"
            onClick={() => props.closeModal()}
            body={
                <div className="">
                    <div className="w-full mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Upload Required Documents (Accept Multiple Document)
                        </label>
                        <div className="p-5 border-dashed border-2 border-indigo-200">
                            <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                <div className='text-center my-auto'>
                                    <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                </div>
                                <div className="text-xs ">
                                    <p>PDF file size no more than 10MB</p>
                                    <input 
                                        multiple
                                        className="mt-3" 
                                        type="file"
                                        name='shipInfoForSeller'
                                        accept='.pdf'
                                        onChange={({target}) => 
                                            setAdditionalDocs(target.files)
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
                        className="font-bold uppercase "
                        onClick={() => props.acceptance(additionalDocs)}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Upload
                    </PrimaryButton>
                </>
            }
        ></BaseModalLarge>
    )
}