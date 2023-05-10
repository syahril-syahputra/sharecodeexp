import React, {useState, useEffect} from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import DatabaseStatistic from "@/components/Table/Superadmin/Statistics/DatabaseStatistic";

// layout for page
import Admin from "layouts/Admin.js";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

export default function Product({session}) {
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
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/DatabaseStatistic`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                // setLinks(result.links)
                // setMetaData({
                //     total: result.total,
                //     perPage: result.per_page,
                //     lastPage: result.last_page,
                //     currentPage: result.current_page,
                //     nextPage: result.next_page_url ? true : false,
                //     prevPage: result.prev_page_url ? true : false
                // })
            }).catch((error) => {
                console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    // const setPage = (item) => {
    //     searchData(search, item)
    // }
    useEffect(() => {
        loadData(search)
    }, [])

    const handleSearch = (item) =>{
        setSearch(item)
        loadData()
    }

    return (
        <>
            <div className="mb-10">
                <div className="mb-5 w-full lg:w-1/2">
                    <MiniSearchBar searchItem={handleSearch}/>
                </div> 
                <DatabaseStatistic 
                    title="Database Statistic"
                    // setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    // links={links}
                    // metaData={metaData}
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