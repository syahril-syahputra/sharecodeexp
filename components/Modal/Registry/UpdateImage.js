import { useEffect, useState } from "react"
import Image from 'next/image';
import AcceptButton from "@/components/Buttons/AcceptButton";
import InputForm from "@/components/Shared/InputForm";
import ErrorInput from '@/components/Shared/ErrorInput';
export default function UpdateImage(props) {
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
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full h-full max-w-7xl md:h-auto">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200">
                  <h3 className="text-3xl font-semibold">
                    Send Email
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className=""> 
                  <div className="flex flex-wrap mb-6 mt-10">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                    <div className="w-full md:w-1/2 px-3">
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
                </form>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 ">
                  <button
                    className="text-blueGray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>

                  <AcceptButton
                      buttonTitle="Update"
                      isLoading={props.isLoading}
                      onClick={handleSend}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}