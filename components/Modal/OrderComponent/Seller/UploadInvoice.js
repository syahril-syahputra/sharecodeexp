import { useState } from "react"
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import FileInput from "@/components/Interface/Form/FileInput";
export default function UploadInvoice(props){
    const [invoice, setInvoice] = useState()
    const handleSubmit = () => {
        props.acceptance(
            invoice
        )
    }

    return (
        <BaseModalMedium
            title="Upload Invoice"
            onClick={() => props.closeModal()}
            body={
                <div>  
                    <div className="mb-6">
                        <FileInput
                            description="Input PDF (.pdf) only, max 10MB"
                            accept=".pdf"
                            name="File Upload"
                            required
                            onChange={(target) => setInvoice(target.files[0])}
                            errorMsg={props.errorInfo?.seller_invoice}
                        />
                    </div>
                </div>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        size="sm"
                        className="mr-2"
                        onClick={() => props.closeModal()}>
                        Close
                    </LightButton>
                    <PrimaryButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Upload
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    )
}