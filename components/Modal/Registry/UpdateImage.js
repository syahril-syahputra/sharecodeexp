import { useState } from "react"
import Image from 'next/image';
import ErrorInput from '@/components/Shared/ErrorInput';
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalXLarge } from "@/components/Interface/Modal/BaseModal";

export default function UpdateImage(props){
  const handleSend = () => {
    props.acceptModal(newImage)
  }

  const [image, setImage] = useState(null)
  const [newImage, setNewImage] = useState()
  const companyImageHandler = (e) =>{
    let file = e.target.files[0]
    setNewImage(e.target.files[0])
    const fileReader = new FileReader();
    fileReader.onload = function(e){
        setImage(e.target.result) 
    }
    fileReader.readAsDataURL(file)
  }
  return (
    <>
      <BaseModalXLarge
        title="Update Company Logo"
        onClick={() => props.setShowModal(false)}
        body={
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Company Logo
              </label>
              <div className="p-10 border-dashed border-2 border-indigo-200">
                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                  <div className='text-center my-auto'>
                    <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                  </div>
                  <div className="text-xs ">
                    <p>JPG, JPEG, PNG file size no more than 10MB</p>
                      <input 
                          className="mt-3" 
                          type="file"
                          name="image"
                          accept='.png, .jpeg, .jpg'
                          onChange={companyImageHandler}
                      />
                  </div>
                </div>
              </div>
              {props.errorInfo?.image &&
                  <ErrorInput error={props.errorInfo?.image}/>
              }
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Result
              </label>
              {image &&
              <div className="p-2 border-dashed border-2 border-indigo-200">
                  <div className='text-center grid gap-4 lg:grid-cols-1 md:grid-cols-1'>
                      <Image src={image}
                          alt="newLogo"
                          className="mx-auto"
                          height={180}
                          width={180}>
                      </Image>
                  </div>
              </div>}
            </div>
        </div>
        }
        action={
          <>
            <LightButton
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
                Upload
            </WarningButton>
          </>
        }
      />
    </>
  )
}