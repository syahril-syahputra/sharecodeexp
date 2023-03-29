import React, {useState, useEffect} from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import MemberStatistic from "@/components/Table/Superadmin/Statistics/MemberStatistic";

// layout for page
import Admin from "layouts/Admin.js";

export default function Product({session, }) {
    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    // const [links, setLinks] = useState([])
    // const [metaData, setMetaData] = useState({
    //     total: 0,
    //     perPage: 0,
    //     lastPage: 0
    // })
    const loadData = async (srch, page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/visitor`,
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
            // console.log(error.response)
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


    return (
        <>
            <div className="relative">
                <div className="mb-0 px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="px-4">
                            <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }
                            >
                                Member Statistic
                            </h3>
                        </div>
                        <div className="px-4 my-2">
                        </div>
                    </div>
                </div>

                <MemberStatistic 
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