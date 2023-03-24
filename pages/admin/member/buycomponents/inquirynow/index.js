import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import ComponentList from "components/Table/Member/InquiryNow/ComponentList"

// layout for page
import Admin from "layouts/Admin.js";

export default function InquiryNow({session}) {
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
    const searchData = async (page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/cartlist?page=${page}`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                // console.log(response)
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
        searchData(item)
    }
    useEffect(() => {
        searchData()
    }, [])

    const handleSearch = (item) =>{
        setSearch(item)
        searchData()
      }

    return (
        <>
            <div className="">
                <MiniSearchBar searchItem={handleSearch}/>
                <ComponentList
                    setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    links={links}
                    metaData={metaData}
                ></ComponentList>
            </div>
        </>
    );
}

InquiryNow.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}