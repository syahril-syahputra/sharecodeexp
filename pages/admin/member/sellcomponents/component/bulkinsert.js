import React, { useState } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// layout for page
import Admin from "layouts/Admin.js";

// components
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function BulkInsert({session}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [excelFile, setExcelFile] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
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
        toast.success("Your components have been added successfully", toastOptions)
      }).catch((error) => {
        toast.success("Something went wrong.", toastOptions)
        setErrorMessage("Excel can not be processed")
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3 className="font-semibold text-lg text-blueGray-700">
            Insert by Template
          </h3>
        }
        rightTop={
          <>
            <Link target="_blank" href={publicDir + "/template/exepart_template.xlsx"}>
              <SecondaryButton size="sm" className="mr-2">
                <i className="mr-2 ml-1 fas fa-file"></i>
                Download Product Template
              </SecondaryButton>
            </Link>
            <Link href="/admin/member/sellcomponents/component/add">
              <LightButton
                size="sm"
              >
                <i className="mr-2 ml-1 fas fa-plus"></i>
                Single Insert
              </LightButton>
            </Link>
          </>
        }
      ></PageHeader>
      {errorMessage && 
          <DangerNotification 
              message={errorMessage}
          />
      }
      <form className="ml-2" onSubmit={handleSubmit}>
        <div className="w-full lg:w-1/2 px-3 mb-16">
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
                        />
                    </div>
                </div>
            </div>
            {errorInfo.excel_file &&
                <ErrorInput error={errorInfo.excel_file}/>
            }
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <PrimaryButton
              className="w-full font-bold uppercase"
              disabled={isLoading}
              type="submit"
          >
              {isLoading &&
                  <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
              }
              Insert
          </PrimaryButton> 
        </div>
      </form>
    </PrimaryWrapper>
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
