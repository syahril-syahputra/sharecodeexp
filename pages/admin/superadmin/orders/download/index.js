import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// layout for page
import Admin from "layouts/Admin.js";
import LoadingState from "@/components/Interface/Loader/LoadingState";

// components

export default function OrderDetails({session}) {
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
                console.log(response)
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
        <>
            {isLoading ? 
                <LoadingState className="pb-10"/>
            :
                <>
                    your data is downloading if it is not, click here
                </>
            }
        </>
    );
}
    
OrderDetails.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session,
            routeParam: context.query
        }
    }
}