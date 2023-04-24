import React, {useEffect }from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// member
import NewInquiriesMember from "@/components/Dashboard/Member/NewInquiries";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";

export default function Dashboard({session, company, message}) {
  // const [companyStatus, setCompanyStatus] = useState(company.is_confirmed)
  useEffect(() => {
    if(!!message){
      toast.warning(message, toastOptions)
    }
  }, [])


  return (
    <>
      <div>
        {company.is_confirmed == "pending" && 
          <div className="relative p-2 bg-white shadow-lg">
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                <p>Wait for your confirmation from Exepart registration expert</p>
              </h3>
              <h3 className="text-md font-semibold leading-normal mb-2 text-blue-700 mb-2">
                <i>Please refresh if Exepart registration expert is accepted your member status</i>
              </h3>
            </div>
          </div> 
        }

        {company.is_confirmed == "accepted" &&
          <div className="flex flex-wrap mt-4">
            <div className="w-full px-4">
              <div className="relative bg-white p-5 h-24 shadow-md">
                Company Name & Company Logo
              </div>
            </div>        
          </div>
        }

      </div>
    </>
  )
}
  

Dashboard.layout = Admin;

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
          session: session,
          company: company,
          message: redirectedMessage
      }
  }
}
