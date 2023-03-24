import React, { useState } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct() {
  const sessionData = useSession()
  const [inputData, setInputData] = useState({
    AvailableQuantity: '',
    moq: '',
    package: '',
    packaging: '',
    country: '',
    ManufacturerNumber: '',
    Manufacture: ''
  });

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setDataHandler = (item, inputName) => {
    setInputData({...inputData, [inputName]:item.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    const response = await axios.post(`/companyproduct/create`, inputData, {
      headers: {
        "Authorization" : `Bearer ${sessionData.data.accessToken}`
      }
    })
      .then((response) => {
        let result = response.data.data
        setSuccesMessage("Create Product Success")
        setInputData({
          AvailableQuantity: '',
          moq: '',
          package: '',
          packaging: '',
          country: '',
          ManufacturerNumber: '',
          Manufacture: ''
        }); 
      }).catch((error) => {
        setErrorMessage(error.response.data.message)
        setErrorInfo(error.response.data.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="relative shadow">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Add Raw Data
                  </h3>
              </div>
              <div className="px-4 mt-2">
                  <Link href="/admin/member/sellcomponents/component/add" className="relative bg-blueGray-700 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                      Single Insert</Link>
              </div>
          </div>
        </div>

        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="px-3 w-full lg:w-1/2">
            {errorMessage &&
              <div  className="w-50">
                  <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-red-500">
                      <span className="text-xl inline-block mr-5 align-middle">
                          <i className="fas fa-bell"></i>
                      </span>
                      <span className="inline-block align-middle mr-8">
                          <b className="capitalize">{errorMessage}</b>
                      </span>
                  </div>
              </div>
            }
            {succesMessage &&
              <div  className="w-50">
                  <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-emerald-500">
                      <span className="text-xl inline-block mr-5 align-middle">
                          <i className="fas fa-bell"></i>
                      </span>
                      <span className="inline-block align-middle mr-8">
                          <b className="capitalize">{succesMessage}</b>
                      </span>
                  </div>
              </div>
            }
          </div>
          <form onSubmit={handleSubmit}>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Excel
                  </label>
                  <div className="p-5 border-dashed border-2 border-indigo-200">
                      <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                          <div className='text-center my-auto'>
                              <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                          </div>
                          <div className="text-xs ">
                              <p>.xlsx, .xlsm, .xls file size no more than 10MB</p>
                              <input 
                                  className="mt-3" 
                                  type="file"
                                  name='company_RequiredDocuments'
                                  accept=".xlsx,.xlsm,.xls"
                                  // onChange={({target}) => 
                                  //     setRegistrationInfo({...registrationInfo, companyRequiredDocuments:target.files[0]})
                                  // }
                                  // onChange={({target}) => 
                                  //     setRegistrationInfo({...registrationInfo,company_RequiredDocuments:target.files[0]})
                                  // }
                              />
                          </div>
                      </div>
                  </div>
                  {/* {errorInfo.company_RequiredDocuments &&
                      <ErrorInput error={errorInfo.company_RequiredDocuments}/>
                  } */}
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6 mt-20">
                <div className="mb-6">
                    {!isLoading && 
                        <button
                            type="submit"

                            className="w-1/2 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                        >
                        Insert
                        </button>
                    }
                    {isLoading && 
                        <button
                            disabled
                            type="submit"
                            className="w-1/2 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-blueGray-400 uppercase text-sm shadow"
                        >
                            <i className="fas fa-circle-notch fa-spin"></i>
                        </button>
                    }
                </div>
              </div>

              
          </form>
        </div>
      </div>
    </>
  );
}

MyProduct.layout = Admin;
