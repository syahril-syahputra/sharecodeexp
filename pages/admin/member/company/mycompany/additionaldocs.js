import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components
import LightButton from "@/components/Interface/Buttons/LightButton";
import AdditionalDocument from "@/components/Table/Member/Company/AdditionalDocument"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"


// layout for page
import Admin from "layouts/Admin.js";

export default function ShowAdditionalDocument({session}) {
  
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [additionalDocs, setAdditionalDocs] = useState([])
  const getData = async () =>{
    setIsLoading(true)
    const request = await axios.get(`/master/company/RegistrationDocument/Additional`,
        {
            headers: {
              "Authorization" : `Bearer ${session.accessToken}`
            }
        }
        )
        .then((response) => {
            setAdditionalDocs(response.data.data)          
        }).catch((error) => {
            setAdditionalDocs([])
            console.log(error.response)            
        }).finally(() => {
            setIsLoading(false)
        })
  }
  useEffect(() => {
      getData()
  }, [])

  return (
    <>
      <div className="mb-10">
        <AdditionalDocument
          isLoading={isLoading}
          title="Aditional Document"
          items={additionalDocs}
        ></AdditionalDocument>
      </div>
    </>
  );
}

ShowAdditionalDocument.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}
