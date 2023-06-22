import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

// components
import ComponentList from "@/components/Table/Superadmin/Components/ComponentList"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";

export default function RejectedComponent({session}) {
    const router = useRouter()

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
    const searchData = async (searchParam='', page=1) =>{
        setSearch(searchParam)
        setIsLoading(true)
        const response = await axios.get(`/admin/product?page=${page}&status=rejected&search=${searchParam}`,
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
                toast.error("Something went wrong. Can not load component", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (pageNumber) => {
        searchData(search, pageNumber)
    }
    useEffect(() => {
        searchData()
    }, [])
    
    const handleSearch = (searchResult) =>{
        searchData(searchResult)
    }

    const viewHandler = (componentid) => {
        router.push(`/admin/superadmin/components/details/${componentid}`)
    }

  return (
    <>
        <div className="mb-10">
            <div className="mb-5 w-full lg:w-1/2">
                <MiniSearchBar searchItem={handleSearch}/>
            </div>
            <ComponentList 
                title="Rejected Component"
                setPage={setPage}
                isLoading={isLoading}
                data={data}
                links={links}
                metaData={metaData}
                viewHandler={viewHandler}
            />
        </div>
    </>
  );
}

RejectedComponent.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}