import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

// components
import ComponentList from "@/components/Table/Superadmin/Components/ComponentList"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";

// layout for page
import Admin from "layouts/Admin.js";

export default function RejectedComponent({session}) {
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
    const searchData = async (srch, page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/product?page=${page}&status=rejected`,
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
        searchData(search, item)
    }
    useEffect(() => {
        searchData(search)
    }, [])

    const viewHandler = (componentid) => {
        router.push(`/admin/superadmin/components/details/${componentid}`)
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