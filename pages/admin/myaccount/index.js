import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LoadingState from "@/components/Interface/Loader/LoadingState";

export default function Account({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/my-account`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
            }).catch((error) => {
            // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3 className="font-semibold text-lg text-blueGray-700">
                        My Account
                    </h3>
                }
                rightTop={
                    <Link href={`/admin/myaccount/update`}>
                        <WarningButton size="sm">
                            <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                            Update Account
                        </WarningButton>
                    </Link>
                }
            ></PageHeader>

            {!isLoading ? 
                <div className="p-5">
                    <h2 className="text-md text-blueGray-700 font-bold uppercase">{data.roles?.role} : {data.status?.status}</h2>
                    <h3 className="text-md text-blueGray-700">{data.name}</h3>
                    <h3 className="text-md text-blueGray-700">{data.email}</h3>
                </div>
            :
                <LoadingState className="pb-10"/>
            }
            
        </PrimaryWrapper>
    )
}

Account.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}
