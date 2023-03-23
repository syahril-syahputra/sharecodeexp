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
  const [isLoading, setIsLoading] = useState(false)
//   const [companyData, setCompanyData] = useState({})
  const [companyData, setCompanyData] = useState({
    name: "Dummy CMP",
    img: "1678851391.png",
    country: "Indonesia",
    address: "Indonesia",
    phone: "081",
    sector: "Aerospace",
    master: {
        name: "Master account",
        email: "Master@email.com"
    },
    CertificationofActivity: "1678851391.pdf",
    RegistrationDocument: "1678851391.pdf"
  })
  const [companyStatus, setCompanyStatus] = useState("pending")
  const getData = async () =>{
    //   if(!!user.accessToken){
    //   setIsLoading(true)
    //   const response = await axios.get(`/company`,
    //       {
    //           headers: {
    //           "Authorization" : `Bearer ${user.accessToken}`
    //           }
    //       }
    //       )
    //       .then((response) => {
    //           let result = response.data.data
    //           let cmpStatus = result.is_confirmed == "false" ? "pending" : "accepted"
    //           setCompanyData(result)
    //           setCompanyStatus(cmpStatus) 
    //       }).catch((error) => {
    //           // console.log(error.response)
    //       }).finally(() => {
    //           setIsLoading(false)
    //       })
    //   }
  }
//   useEffect(() => {
//       getData()
//   }, [user])

  return (
    <>
      <div className="relative">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4 bg-orange-400">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  THIS IS DUMMY VIEW
                  </h3>
              </div>
              <div className="px-4 my-2">
                  <Link href="/admin/companycontrol/company">
                    <button  className="relative bg-blueGray-700 p-2 text-white mr-2">
                        Back
                    </button>
                  </Link>
                  <Link href="/admin/settings/mycompany/edit">
                    <button  className="relative bg-orange-500 p-2 text-white">
                        <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                        Update Status
                    </button>
                  </Link>
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
    </>
  );
}

MyCompany.layout = Admin;
