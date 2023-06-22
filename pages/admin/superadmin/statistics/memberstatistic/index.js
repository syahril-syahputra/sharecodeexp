import React, {useState, useEffect} from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import MemberStatistic from "@/components/Table/Superadmin/Statistics/MemberStatistic";

// layout for page
import Admin from "layouts/Admin.js";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

export default function Product({session, }) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [metaData, setMetaData] = useState({
            total: 0,
            perPage: 0,
            lastPage: 0
        })
    const [search, setSearch] = useState('')
    const loadData = async (searchParam='', page=1) =>{
        setIsLoading(true)
        setSearch(searchParam)
        const response = await axios.get(`/admin/visitor?page=${page}&search=${searchParam}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
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
            toast.error("Something went wrong. Can not load statistic", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (pageNumber) => {
        loadData(search, pageNumber)
    }
    useEffect(() => {
        loadData()
    }, [])

    const handleSearch = (searchResult) =>{
        loadData(searchResult)
    }

    return (
        <>
            <div className="mb-10">
                <div className="mb-5 w-full lg:w-1/2">
                    <MiniSearchBar searchItem={handleSearch}/>
                </div> 
                <MemberStatistic 
                    title="Members Statistic"
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