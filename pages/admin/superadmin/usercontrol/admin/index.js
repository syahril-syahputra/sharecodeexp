import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";

// components

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import WarningButton from "@/components/Interface/Buttons/WarningButton";

export default function Account({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/profile`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                console.log(response)
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
                    <Link href={`/admin/superadmin/usercontrol/admin/update`}>
                        <WarningButton size="sm">
                            <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                            Update Account
                        </WarningButton>
                    </Link>
                }
            ></PageHeader>
            <div className="p-5">
                <h2 className="text-md text-blueGray-700 font-bold">Admin Account</h2>
                <h3 className="text-md text-blueGray-700">{data.name}</h3>
                <h3 className="text-md text-blueGray-700">{data.email}</h3>
            </div>
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
