import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import CompanyList from "@/components/Table/Superadmin/Registry/CompanyList";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"


// layout for page
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";

export default function ApprovedCompany({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [metaData, setMetaData] = useState({
        total: 0,
        perPage: 0,
        lastPage: 0
    })
    
    useEffect(() => {
        searchData()
    }, [])
    const [search, setSearch] = useState('')
    const searchData = async (searchParam='', page=1) =>{
        setSearch(searchParam)
        setIsLoading(true)
        const response = await axios.get(`/admin/companies?page=${page}&status=accepted&search=${searchParam}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
            let result = response.data.data
            // console.log(result)
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
                toast.error("Something went wrong. Can not load companies", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (pageNumber) => {
        searchData(search, pageNumber)
    }

    const handleSearch = (searchResult) =>{
        searchData(searchResult)
    }

    const router = useRouter()
    const viewCompanyHandler = (companyId) => {
        router.push(`/admin/superadmin/registry/company/${companyId}`)
    }    

    return (
        <>
            <div className="mb-10">
                <div className="mb-5 w-full lg:w-1/2">
                    <MiniSearchBar searchItem={handleSearch}/>
                </div>
                <CompanyList 
                    title="Approved Company"
                    setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    links={links}
                    metaData={metaData}
                    viewHandler={viewCompanyHandler}
                />
            </div>
        </>
    );
}

ApprovedCompany.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}