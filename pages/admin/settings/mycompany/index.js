import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { useSession } from "next-auth/react";
import Link from "next/link";

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function MyCompany() {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const session = useSession()
  const [user, setUser] = useState({
      accessToken: ''
  })

  useEffect(() => { 
    setUser({accessToken: session.data?.accessToken})
  }, [session])

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [companyData, setCompanyData] = useState({})
  const [companyStatus, setCompanyStatus] = useState()
  const getData = async () =>{
      if(!!user.accessToken){
      setIsLoading(true)
      const response = await axios.get(`/company`,
          {
              headers: {
              "Authorization" : `Bearer ${user.accessToken}`
              }
          }
          )
          .then((response) => {
              let result = response.data.data
              let cmpStatus = result.is_confirmed == "false" ? "pending" : "accepted"
              setCompanyData(result)
              setCompanyStatus(cmpStatus) 
          }).catch((error) => {
              // console.log(error.response)
          }).finally(() => {
              setIsLoading(false)
          })
      }
  }
  useEffect(() => {
      getData()
  }, [user])

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
                  <Link href="/admin/settings/mycompany/edit" className="relative bg-orange-500 p-2 text-white">
                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                  Update Company</Link>
              </div>
          </div>
          {!isLoading ? 
            <> 
              <div className="text-center pb-10">
                <img className="object-contain mb-3 h-40 mx-auto" 
                  alt={companyData.name}
                  src={publicDir + "/companies_images/" + companyData.img}/>
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {companyData.name}
                  {companyStatus == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                  {companyStatus == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                  {companyStatus == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}
                </h3>
                {companyStatus == "pending" && <i className="text-orange-500">Your Member Status is Pending</i>}
                {companyStatus == "accepted" && <i className="text-blue-700">Your Member Status is Accepted</i>}
                {companyStatus == "rejected" && <i className="text-red-700">Your Member Status is Rejected</i>}
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
        </div>
      </div>

      {/* <section className="py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Friends
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Photos
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a
                      href="#pablo"
                      className="font-normal text-lightBlue-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

MyCompany.layout = Admin;
