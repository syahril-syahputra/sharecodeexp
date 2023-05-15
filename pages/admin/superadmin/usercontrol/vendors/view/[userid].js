import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function MasterAccount({session, dataUser}) {

    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/users/${dataUser.userid}`,
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
                        Master Account
                        </h3>
                    </div>
                    <div className="px-4 my-2">
                        <Link href={`/admin/superadmin/usercontrol/master/update/${data.id}`} className="relative bg-orange-500 p-2 text-white">
                            <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                            Update Master
                        </Link>
                    </div>
                </div>
                <div className="p-10">
                <h2 className="text-md text-blueGray-700 font-bold">Master Account</h2>
                <h3 className="text-md text-blueGray-700">{data.name}</h3>
                <h3 className="text-md text-blueGray-700">{data.email}</h3>
            </div>
            </div>
        </div>
        </>
    );
}

MasterAccount.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session,
            dataUser: context.query
        }
    }
}
