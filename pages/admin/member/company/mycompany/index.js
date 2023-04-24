import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import UploadAdditionalDocsModal from "@/components/Modal/Member/Company/UploadAdditinalDocs";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"


// layout for page
import Admin from "layouts/Admin.js";

export default function MyCompany({session}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [companyData, setCompanyData] = useState()
  const getData = async () =>{
    setIsLoading(true)
    const response = await axios.get(`/company`,
        {
            headers: {
              "Authorization" : `Bearer ${session.accessToken}`
            }
        }
        )
        .then((response) => {
            let result = response.data.data
            setCompanyData(result)            
        }).catch((error) => {
            // console.log(error.response)            
        }).finally(() => {
            setIsLoading(false)
        })
  }
  useEffect(() => {
      getData()
  }, [])

  const [uploadAditionalDocsModal, setUploadAditionalDocsModal] = useState()
  const handleUploadAditionalDocsModal = async (file) => {
    setIsLoading(true)
    let formData = new FormData()
    for(const index in file) {
      formData.append('AddtionalDoc[]', file[index])
    }
    const request = await axios.post(`/master/company/RegistrationDocument/Additional`, formData,
        {
            headers: {
              "Authorization" : `Bearer ${session.accessToken}`
            }
        }
        )
        .then((response) => {
          console.log(response.data.data)
          setUploadAditionalDocsModal(false)
          toast.success(response.data.data, toastOptions)
        }).catch((error) => {
          console.log(error.response)
          toast.warning("Something went wrong!", toastOptions)
          toast.warning("Please upload again", toastOptions)
        }).finally(() => {
            setIsLoading(false)
        })
  }
  return (
    <>
      <div className="relative">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  {/* My Company */}
                  </h3>
              </div>
              <div className="px-4 my-2">
                  <WarningButton className="mr-2" onClick={() => setUploadAditionalDocsModal(true) } size="sm">
                    <i className="mr-2 ml-1 fas fa-folder text-white"></i>
                    Upload Aditional Documents
                  </WarningButton>
                  <Link href="/admin/member/company/mycompany/edit">
                    <WarningButton size="sm">
                      <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                      Update Company
                    </WarningButton>
                  </Link>
              </div>
          </div>

          {(companyData?.reason && companyData.is_confirmed == "rejected") &&
            <div className="bg-red-400 p-2 text-white">
                <h3 className={"ml-3 font-semibold text-lg"}>
                    Your Company is Rejected :
                </h3>
                <h3 className={"ml-3 text-md"}>
                    {companyData.reason}
                </h3>
            </div>
          }

          {(companyData?.notification && companyData.is_confirmed == "pending") &&
            <div className="p-2 text-orange-500 text-center">
                <h3 className="italic ml-3 font-semibold text-lg">
                    Update Needed
                </h3>
                <h3 className={"ml-3 text-md"}>
                    {companyData.notification}
                </h3>
            </div>
          }
          
          {!!companyData ? 
            <> 
              <div className="text-center pb-10">
                <img className="object-contain mb-3 h-40 mx-auto" 
                  alt={companyData.name}
                  src={publicDir + "/companies_images/" + companyData.img}/>
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {companyData.name}
                  {companyData.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                  {companyData.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                  {companyData.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}
                </h3>
                {companyData.is_confirmed == "pending" && <i className="text-orange-500">Your Member Status is Pending</i>}
                {companyData.is_confirmed == "accepted" && <i className="text-blue-700">Your Member Status is Accepted</i>}
                {companyData.is_confirmed == "rejected" && <i className="text-red-700">Your Member Status is Rejected</i>}
                {/* <div>
                  {companyData.is_confirmed == "rejected" && <i className="text-red-700">{companyData.reason}</i>}
                </div> */}
                <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                  {companyData.country}, {companyData.address}
                </div>
                <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>{" "}
                  {companyData.phone}
                </div>
                {/* <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
                  email@example.com
                </div> */}
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-circle-dot mr-2 text-lg text-blueGray-400"></i>
                  Sector - {companyData.sector}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                  Master Account - {companyData.master?.name}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  Master Email - {companyData.master?.email}
                </div>
                
                <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-9/12 px-4 mb-3">
                      <Link target="_blank" href={publicDir + "/companies_RegistrationDocument/" + companyData.RegistrationDocument}>
                        <SecondaryButton size="sm">
                          View Company Registration Document
                        </SecondaryButton>
                      </Link>
                    </div>
                    <div className="w-full lg:w-9/12 px-4 mb-3">
                      <Link target="_blank" href={publicDir + "/companies_CertificationofActivity/" + companyData.CertificationofActivity}>
                        <SecondaryButton size="sm">
                          View Certification of Activity
                        </SecondaryButton>
                      </Link>
                    </div>
                    {session.user.userDetail.status_id == 1 && 
                    <div className="w-full lg:w-9/12 px-4">
                      <Link href="/admin/member/company/mycompany/additionaldocs">
                        <SecondaryButton size="sm">
                          View Additional Documents
                        </SecondaryButton>
                      </Link>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </>
            : 
            <>
              <div className="pb-40">
                <div className='text-center my-auto mt-20'>
                    <i className="fas fa-circle-notch fa-spin text-indigo-900 my-auto mx-10 fa-2xl"></i>
                </div>
              </div>
            </>
          }
        </div>
      </div>

      {uploadAditionalDocsModal &&
        <UploadAdditionalDocsModal
          isLoading={isLoading}
          closeModal={() => setUploadAditionalDocsModal(false)}
          acceptance={handleUploadAditionalDocsModal}
        />
      }

    </>
  );
}

MyCompany.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}
