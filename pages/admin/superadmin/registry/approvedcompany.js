import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import CompanyList from "@/components/Table/Superadmin/Registry/CompanyList";

// layout for page
import Admin from "layouts/Admin.js";

const usePrevious = (value) => {
    console.log(1)
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function Company() {
    // const session = useSession()
    // const [user, setUser] = useState({
    //     accessToken: ''
    // })

    // const accessToken = useRef('')
    // useEffect(() => { 
    //     if(session.status == 'authenticated') {
    //         accessToken.current = session.data?.accessToken
    //     }
    // }, [session])

    // useEffect(() => {
    //     searchData(search)
    // }, [accessToken, session])

    // if(session?.status == 'authenticated') {
    //     useEffect(() => {
    //         console.log('load data')
    //     }, [])
    // }

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

    // const [activePage, setActivePage] = 
    useEffect(() => {
        searchData(search)
    }, [])
    const searchData = async (srch, page=1) =>{
        // if(!!accessToken.current){
        //     console.log('loaddata')
            setIsLoading(true)
            const response = await axios.get(`/admin/companies?page=${page}`,
                // {
                //     headers: {
                //     "Authorization" : `Bearer ${accessToken.current}`
                //     }
                // }
                )
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
        // }
    }
    const setPage = (item) => {
        searchData(search, item)
    }
    



    const [screenIsLoading, setScreenIsLoading] = useState(true)
    const handleCompanyAcceptance = async (companyId) => {
        if(!!user.accessToken){
        setScreenIsLoading(true)
        const response = await axios.post(`/admin/companies/${companyId}/update`, {},
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            })
            .then((response) => {
                console.log(response.data)
                searchData(search)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <>
        <div className="relative">
        <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
            <input
                type="text"
                // value={search} 
                // onChange={({target}) => setSearch(target.value)}
                // onKeyDown={searchComponent}
                className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                placeholder="Search..."/>
                <Link
                    href={`/product/search`}
                    className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                >
                Search
            </Link>
        </div>
        <div className="mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex justify-between">
                <div className="px-4">
                    <h3
                    className={
                        "font-semibold text-lg text-blueGray-700"
                    }
                    >
                    Pending Company
                    </h3>
                </div>
                <div className="px-4 my-2">
                </div>
            </div>
        </div>

        <CompanyList 
            setPage={setPage}
            isLoading={isLoading}
            data={data}
            links={links}
            metaData={metaData}
            companyAcceptance={handleCompanyAcceptance}
        />
        </div>
        </>
    );
}


Company.layout = Admin;
