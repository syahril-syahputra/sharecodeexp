import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// layout for page
import Admin from "layouts/Admin.js";

// components
import ContributorList from "@/components/Table/Superadmin/UserControl/ContributorList" 

import { useRouter } from "next/router";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

export default function Contributors({session}) {
    const router = useRouter()

    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [metaData, setMetaData] = useState({
        total: 0,
        perPage: 0,
        lastPage: 0
    })
    const loadData = async (srch, page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/members?page=${page}`,
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
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (item) => {
        loadData(search, item)
    }
    useEffect(() => {
        loadData(search)
    }, [])

    const handleSearch = (item) =>{
        setSearch(item)
        loadData()
    }

  return (
    <>
        <div className="relative">
            <div className="mb-5 w-full lg:w-1/2">
                <MiniSearchBar searchItem={handleSearch}/>
            </div> 
            <ContributorList 
                title="Contributor Users"
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

Contributors.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}