import React, {useState, useEffect} from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import UnfoundComponent from "@/components/Table/Superadmin/Statistics/UnfoundComponent";


// layout for page
import Admin from "layouts/Admin.js";

export default function Product({session, }) {
    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [metaData, setMetaData] = useState({
        total: 0,
        perPage: 0,
        lastPage: 0
    })
    const loadData = async (page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/search?unfound=20&page=${page}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                console.log(result)
                setData(result.data)
                setLinks(result.links)
                setMetaData({
                    total: result.total,
                    perPage: result.per_page,
                    lastPage: result.last_page,
                    currentPage: result.current_page,
                    nextPage: result.next_page_url ? true : false,
                    prevPage: result.prev_page_url ? true : false
                })
            }).catch((error) => {
            // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (item) => {
        loadData(item)
    }
    useEffect(() => {
        loadData()
    }, [])


    return (
        <>
            <div className="relative">            
                <UnfoundComponent 
                    title={"Unfound Components"}
                    setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    links={links}
                    metaData={metaData}
                />
            </div>
        </>
    );
}

Product.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}