import React, { useState } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// components
import { toast } from 'react-toastify';
import toastOptions from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";

export default function BulkInsert({session}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [excelFile, setExcelFile] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // let inputData = {
    //   excel_file: excelFile
    // }
    let formData = new FormData();
    formData.append("excel_file", excelFile);
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    const response = await axios.post(`/upload`, formData, {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
      .then((response) => {
        let result = response.data.data
        router.replace('/admin/member/sellcomponents/component/pending')
        toast.success("Your components has been added succefully", toastOptions)
      }).catch((error) => {
        setErrorMessage("Please fill the form correctly")
        console.log(error)
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
                  <Link target="_blank" href={publicDir + "/template/exepart_template.xlsx"}>
                    <button className="relative bg-blueGray-700 p-2 text-white mr-2">
                      <i className="mr-2 ml-1 fas fa-file text-white"></i>
                      Download Bulk Template
                    </button>
                  </Link>
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
                                  name='excel'
                                  accept=".xlsx,.xlsm,.xls"
                                  onChange={({target}) => 
                                    setExcelFile(target.files[0])
                                  }
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

BulkInsert.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}
