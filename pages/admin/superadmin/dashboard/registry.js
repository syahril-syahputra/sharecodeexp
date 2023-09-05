import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

export default function AdminRegistry({session}){
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`/admin/dashboard/pending-companies`, {
                headers: {
                    "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
              }).catch((error) => {
                setData({})
                toast.error(error.data.message, toastOptions)
              }).finally(() => {
                setIsLoading(false)
              })
        }

        fetchData()        
    }, [])

    return (
        <>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <PrimaryWrapper className="border border-blue-500">
              <div className="p-4 mb-auto">
                <h1 className="font-semibold text-7xl mb-3">
                  {data}
                </h1>
                <span className="text-md italic">Verified / Reject New Inquiries</span>
              </div>
              <Link
                href="/admin/superadmin"
                className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
                <div className="">
                    <h1 className="text-md text-white">
                      Check Now
                    </h1>
                </div>
                <div className="">
                  <span className="text-md">
                    <i className="fas fa-chevron-right text-white"></i>
                  </span>
                </div>
              </Link>
            </PrimaryWrapper>     
          </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
  }