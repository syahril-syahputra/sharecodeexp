import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function InquiryDetails({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async (page=1) =>{
        setIsLoading(true)
        // const response = await axios.get(`/cartlist?page=${page}`,
        //     {
        //     headers: {
        //         "Authorization" : `Bearer ${session.accessToken}`
        //     }
        //     })
        //     .then((response) => {
        //         // console.log(response)
        //         let result = response.data.data
        //         setData(result.data)
        //     }).catch((error) => {
        //         // console.log(error.response)
        //     }).finally(() => {
        //         setIsLoading(false)
        //     })
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
          <div className="relative">

          </div>
        </>
      );
    }
    
InquiryDetails.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}