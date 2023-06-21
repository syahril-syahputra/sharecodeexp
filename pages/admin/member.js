import React, {useEffect }from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// member
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import { CompanyStatusesIcon } from "@/components/Shared/Company/Statuses";
import Link from "next/link";

export default function MemberDashboard({company, message}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  useEffect(() => {
    if(!!message){
      toast.warning(message, toastOptions)
    }
  }, [])


  return (
    <>
      <div>
        {company.is_confirmed == "rejected" && 
          <PrimaryWrapper>
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i title="Member Rejected" className="mr-2 ml-1 fas fa-times text-orange-500"></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                <p>Your membership was rejected by Exepart registration expert</p>
              </h3>
              <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
                <i>If something is not agreeable, please contact Exepart registration expert. You can also check on <Link href="/admin/member/company/mycompany" className="underline text-black">My Company</Link></i>
              </h3>
            </div>
          </PrimaryWrapper> 
        }

        {company.is_confirmed == "pending" && 
          <PrimaryWrapper>
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                <p>Wait for your confirmation from Exepart registration expert</p>
              </h3>
              <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
                <i>Please refresh if Exepart registration expert is accepted your member status</i>
              </h3>
            </div>
          </PrimaryWrapper> 
        }

        {company.is_confirmed == "accepted" &&
          <PrimaryWrapper>
            <div className="text-center pb-10 pt-10">
              <img className="object-contain mb-3 h-40 mx-auto" 
                alt={company.name}
                src={publicDir + "/companies_images/" + company.img}/>
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                {company.name}
                <CompanyStatusesIcon status={company.is_confirmed}/>                
              </h3>
            </div>
          </PrimaryWrapper>
        }
      </div>
    </>
  )
}
  
MemberDashboard.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const loadCompany = await axios.get(`/company`, {
    headers: {
    "Authorization" : `Bearer ${session.accessToken}`
    }
  })
  const company = loadCompany.data.data

  let redirectedMessage = ''
  if(!!context.query.redirect) {
    redirectedMessage = 'Waiting for your company approval'
  }

  return {
      props: {
          session,
          company,
          message: redirectedMessage
      }
  }
}
