import { useState } from "react"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import FileInput from "@/components/Interface/Form/FileInput";
import WarningButton from "@/components/Interface/Buttons/WarningButton";

export default function BadResult(props){
    const [badResult, setBadResult] = useState('')
    const [terminateOrder, setTerminateOrder] = useState('')

    const handleisTerminateOrder = () => {
        setTerminateOrder(prev => !prev)
    }

    const handlerUpload = () => {
        props.acceptance(badResult, terminateOrder)
    }

    return (
        <BaseModalMedium
            title="Upload Bad Result"
            onClick={() => props.closeModal()}
            body={
                <div>  
                    <div className="mb-6">
                        <FileInput
                            description="Input PDF (.pdf) only, max 10MB"
                            accept=".pdf"
                            name="File Upload"
                            required
                            onChange={(target) => setBadResult(target.files[0])}
                            errorMsg={props.errorInfo?.test_result}
                        />
                    </div>
                    <div className="w-full">
                        {props.errorInfo?.terminate_order &&
                            <div>
                                <span className="font-light text-sm">
                                    <i className="text-red-500">{props.errorInfo?.terminate_order}</i>
                                </span>
                            </div>
                        }
                        <input id="policy" type="checkbox" checked={terminateOrder} onChange={handleisTerminateOrder} className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                        <label htmlFor="policy" className="ml-2 text-sm font-medium text-gray-900 italic">Terminate order</label>
                    </div>

                </div>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        size="sm"
                        className="mr-2"
                        onClick={() => props.closeModal()}
                        >
                        Close
                    </LightButton>
                    <WarningButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={handlerUpload}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Upload Result
                    </WarningButton>
                </>
            }
        ></BaseModalMedium>
    )
}