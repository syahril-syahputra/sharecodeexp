import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

// components
import CompanyList from "@/components/Table/Superadmin/Registry/CompanyList";
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

// layout for page
import Admin from "layouts/Admin.js";

export default function PendingCompany({session}) {
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

    useEffect(() => {
        searchData(search)
    }, [])
    const searchData = async (srch, page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/companies?page=${page}&status=pending`,
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
            }).finally(() => {
            setIsLoading(false)
            })
    }
    const setPage = (item) => {
        searchData(search, item)
    }
    
    const router = useRouter()
    const viewCompanyHandler = (companyId) => {
        console.log(companyId)
        router.push(`/admin/superadmin/registry/company/${companyId}`)
    }

    const handleSearch = (item) =>{
        setSearch(item)
        searchData()
    }

    return (
        <>
            <div className="mb-10">
                <div className="mb-5 w-full lg:w-1/2">
                    <MiniSearchBar searchItem={handleSearch}/>
                </div>
                <CompanyList 
                    title="Pending Company"
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

PendingCompany.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: {
        session
      }
    }
  }