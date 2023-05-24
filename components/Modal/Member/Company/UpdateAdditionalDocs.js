import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function UpdateAdditionalDocs(props){
  const handleSend = () => {
    props.submitHandler(
        {
            id: props.item.id,
            document
        }
    )
  }
  const [document, setDocument] = useState(null)
  return (
    <>
      <BaseModalMedium
        title="Update Additional Docs"
        onClick={() => props.setShowModal(false)}
        body={
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Additional Docs
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
                            accept='.pdf'
                            name="AdditionalDocs"
                            onChange={({target}) => 
                              setDocument(target.files[0])
                            }
                        />
                    </div>
                </div>
            </div>
            {props.errorInfo?.AddtionalDoc &&
              <ErrorInput error={props.errorInfo?.AddtionalDoc}/>
            }
          </div>
        }
        action={
          <>
            <LightButton
                disabled={props.isLoading}
                className="font-bold uppercase mr-2"
                onClick={() => props.setShowModal(false)}
            >
              Close
            </LightButton>

            <WarningButton
                disabled={props.isLoading}
                className="font-bold uppercase"
                onClick={handleSend}>
                {props.isLoading &&
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                }
                Update
            </WarningButton>
          </>
        }
      />
    </>
  )
}