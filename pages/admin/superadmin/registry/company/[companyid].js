import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components
import SendEmailModal from "@/components/Modal/Registry/SendEmail"
import UpdateImageModal from "@/components/Modal/Registry/UpdateImage"
import AcceptMembership from "@/components/Modal/Registry/AcceptMembership"
import RejectMembership from "@/components/Modal/Registry/RejectMembership"
import PendingMembership from "@/components/Modal/Registry/PendingMembership"

// layout for page
import Admin from "layouts/Admin.js";

//toast
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

export default function CompanyList({session, routeParam}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

  //data search
  const [isLoading, setIsLoading] = useState(false)
  const [companyData, setCompanyData] = useState({})
  const getData = async () => {
      setIsLoading(true)
      const response = await axios.get(`admin/companies?id=${routeParam.companyid}`,
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

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const handleAcceptCompany = async () => {
    setShowAcceptModal(false)
    setIsLoading(true)
    const request = await axios.post(`admin/companies/${routeParam.companyid}/update`, {}, {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
    .then(() => {
      toast.success("Company Accepted")
    })
    .catch((error) => {
      console.log(error)
      toast.error("Something went wrong")
    })
    .finally(() => {
      getData()
    })
  }

  const [showRejectModal, setShowRejectModal] = useState(false)
  const handleRejectCompany = async (text) => {
    setShowRejectModal(false)
    setIsLoading(true)
    const request = await axios.post(`admin/companies/${routeParam.companyid}/reject`, 
    {
      id: routeParam.companyid,
      reason: text
    },
    {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
    .then(() => {
      toast.success("Company Rejected")
    })
    .catch((error) => {
      console.log(error)
      toast.error("Something went wrong")
    })
    .finally(() => {
      getData()
    })
  }

  const [showPendingModal, setShowPendingModal] = useState(false)
  const handlePendingCompany = async (text) => {
    setShowPendingModal(false)
    setIsLoading(true)
    const request = await axios.post(`admin/companies/${routeParam.companyid}/pending`, 
    {
      id: routeParam.companyid,
      reason: text
    },
    {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
    .then(() => {
      toast.success("Company set to pending")
    })
    .catch((error) => {
      console.log(error)
      toast.error("Something went wrong")
    })
    .finally(() => {
      getData()
    })
  }

  const [showSendEmailModal, setShowSendEmailModal] = useState(false)
  const handleSendEmail = async (email, subject, messages) => {
    setShowSendEmailModal(false)
    // setIsLoading(true)
    alert("not ready yet :(")
    console.log(email, subject, messages)
    // const request = await axios.post(`admin/companies/${routeParam.companyid}/pending`, 
    // {
    //   id: routeParam.companyid,
    //   subject: subject,
    //   messages: messages
    // },
    // {
    //   headers: {
    //     "Authorization" : `Bearer ${session.accessToken}`
    //   }
    // })
    // .then(() => {
    //   toast.success("Company set to pending")
    // })
    // .catch((error) => {
    //   console.log(error)
    //   toast.error("Something went wrong")
    // })
    // .finally(() => {
    //   getData()
    // })
  }

  const [showUpdateImageModal, setShowUpdateImageModal] = useState()
  const handleUpdateImage = async (image) => {
    console.log(image)
    // setIsLoading(true)
    alert("not ready yet :(")
    let formData = new FormData();
    formData.append("image", image);
    formData.append("id", routeParam.companyid)
    // const request = await axios.post(`admin/companies/${routeParam.companyid}/pending`, 
    // {
    //   id: routeParam.companyid,
    //   subject: subject,
    //   messages: messages
    // },
    // {
    //   headers: {
    //     "Authorization" : `Bearer ${session.accessToken}`
    //   }
    // })
    // .then(() => {
    //   toast.success("Company set to pending")
    // })
    // .catch((error) => {
    //   console.log(error)
    //   toast.error("Something went wrong")
    // })
    // .finally(() => {
    //   getData()
    // })
  }



  return (
    <>
      <div className="relative">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4 ">

              </div>
              <div className="px-4 my-2">
                  <Link href="/admin/superadmin/registry/approvedcompany">
                    <button  className="relative bg-blueGray-700 p-2 text-white mr-2">
                        Back
                    </button>
                  </Link>
                  <button onClick={() => setShowSendEmailModal(true) } className="relative bg-blueGray-700 p-2 text-white mr-2">
                    <i className="mr-2 ml-1 fas fa-envelope text-white"></i>
                      Send Email
                  </button>
                  {(companyData.is_confirmed == "pending" || companyData.is_confirmed == "rejected") && 
                  <button onClick={() => setShowAcceptModal(true) } className="relative bg-blue-500 p-2 text-white mr-2">
                      <i className="mr-2 ml-1 fas fa-check text-white"></i>
                      Accept
                  </button>
                  }
                  {(companyData.is_confirmed == "accepted" || companyData.is_confirmed == "rejected") && 
                  <button onClick={() => setShowPendingModal(true) } className="relative bg-orange-500 p-2 text-white mr-2">
                      <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                      Pending
                  </button>
                  }
                  {(companyData.is_confirmed == "accepted" || companyData.is_confirmed == "pending") && 
                  <button onClick={() => setShowRejectModal(true) } className="relative bg-red-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-times text-white"></i>
                      Reject
                  </button>
                  }
              </div>
          </div>
          {!isLoading ? 
            <> 
              <div className="text-center pb-10">
                <img className="object-contain mb-3 h-40 mx-auto" 
                  alt={companyData.name}
                  src={publicDir + "/companies_images/" + companyData.img}/>
                <button onClick={() => setShowUpdateImageModal(true) } className="relative bg-orange-500 py-1 px-2 text-white">
                    <i className="mr-2 ml-1 fas fa-image text-white"></i>
                    Update Image
                </button>
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {companyData.name}
                  {companyData.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                  {companyData.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                  {companyData.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}
                </h3>
                {companyData.is_confirmed == "pending" && <i className="text-orange-500">Member Status is Pending</i>}
                {companyData.is_confirmed == "accepted" && <i className="text-blue-700">Member Status is Accepted</i>}
                {companyData.is_confirmed == "rejected" && <i className="text-red-700">Member Status is Rejected</i>}
                <div>
                  {companyData.is_confirmed == "rejected" && <i className="text-red-700">{companyData.reason}</i>}
                </div>
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
                    <div className="w-full lg:w-9/12 px-4 mb-5">
                      <Link target="_blank" href={publicDir + "/companies_RegistrationDocument/" + companyData.RegistrationDocument}>
                        <button className="py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                          View Company Registration Document
                        </button>
                      </Link>
                    </div>
                    <div className="w-full lg:w-9/12 px-4">
                      <Link target="_blank" href={publicDir + "/companies_CertificationofActivity/" + companyData.CertificationofActivity}>
                        <button className="py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                          View Certification of Activity
                        </button>
                      </Link>
                    </div>
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
          
          {showSendEmailModal ? (
            <SendEmailModal
                isLoading={isLoading}
                setShowModal={setShowSendEmailModal}
                companyName={companyData.name}
                acceptModal={handleSendEmail}
            />
          ) : null}

          {showUpdateImageModal ? (
            <UpdateImageModal
                isLoading={isLoading}
                setShowModal={setShowUpdateImageModal}
                companyName={companyData.name}
                acceptModal={handleUpdateImage}
            />
          ) : null}

          {showAcceptModal ? (
            <AcceptMembership
                setShowModal={setShowAcceptModal}
                companyName={companyData.name}
                acceptModal={handleAcceptCompany}
            />
          ) : null}

          {showRejectModal ? (
            <RejectMembership
                setShowModal={setShowRejectModal}
                companyName={companyData.name}
                acceptModal={handleRejectCompany}
            />
          ) : null}

        {showPendingModal ? (
            <PendingMembership
                setShowModal={setShowPendingModal}
                companyName={companyData.name}
                acceptModal={handlePendingCompany}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

CompanyList.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session,
          routeParam: context.query
      }
  }
}

