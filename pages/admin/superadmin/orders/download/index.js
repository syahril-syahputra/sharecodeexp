import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// layout for page
import Admin from "layouts/Admin.js";
import LoadingState from "@/components/Interface/Loader/LoadingState";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import Link from "next/link";

// components

export default function DownloadOrdersData({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/orders/download`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                setData(response.data.data)
            }).catch((err) => {
                console.log(err)
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
                        Download Orders Data
                    </h3>
                }
            ></PageHeader>

            {isLoading ? 
                <LoadingState className="pb-10"/>
            :
                <div className="p-4">
                    <Link target="_blank" href={data}>
                        <PrimaryButton
                            
                        >Download</PrimaryButton>
                    </Link>
                </div>
            }

        </PrimaryWrapper>
    );
}
    
DownloadOrdersData.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session,   
        }
    }
}