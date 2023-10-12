import React, { useEffect, useState } from 'react'

import Admin from "layouts/Admin.js";
import { getSession } from "next-auth/react";
import axios from "lib/axios"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import ExcelComponent from '@/components/Modal/Component/ExcelComponent';
import TableExcel from '@/components/Table/Superadmin/Excel/ExcelUploadedList';
import ExcelDetail from '@/components/Modal/Component/ExcelDetail';
Uploaded.layout = Admin;

export default function Uploaded({ session }) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [isOpenDetail, setisOpenDetail] = useState(false)
    const [isOpenConfirmDelete, setisOpenConfirmDelete] = useState(false)
    const [selectedData, setselectedData] = useState({})
    const [isDetailLoading, setisDetailLoading] = useState(false)
    const [metaData, setMetaData] = useState({
        total: 0,
        perPage: 0,
        lastPage: 0
    })
    const fetchdata = async (page = 1) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/admin/product/excel?paginate=10&page=${page}`,
                {
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                }
            )
            let result = response.data.data;
            setData(result.data);
            setLinks(result.links);
            setMetaData({
                total: result.total,
                perPage: result.per_page,
                lastPage: result.last_page,
                currentPage: result.current_page,
                nextPage: result.next_page_url ? true : false,
                prevPage: result.prev_page_url ? true : false
            });
        } catch (error) {
            setData([]);
            toast.error("Something went wrong. Cannot load component.", toastOptions);
        } finally {
            setIsLoading(false);
        }
    }
    const setPage = (pageNumber) => {
        fetchdata(pageNumber)
    }
    useEffect(() => {
        fetchdata()
    }, [])



    const showDetailHandler = (data) => {
        setisOpenDetail(true)
        setselectedData(data)
    }
    const downloadHandler = async () => {
        setisDetailLoading(true)
        try {
            if (selectedData.status_id === "1") {
                await axios.post(`/admin/product/excel/download`,
                    {

                        id: selectedData.id,
                        company_id: selectedData.company.id
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${session.accessToken}`
                        }
                    }
                )
                toast.success("Status Update", toastOptions);

            }
            setisOpenDetail(false)
            window.location.href = process.env.NEXT_PUBLIC_DIR + selectedData.path_dirty_file

            setPage(metaData.currentPage)
        } catch (error) {
            toast.error("Something went wrong. Cannot load component.", toastOptions);
        } finally {
            setisDetailLoading(false)
        }
    }
    const deleteHandler = async () => {
        setisDetailLoading(true)
        try {

            await axios.delete(`/admin/product/excel/delete-excel`,

                {
                    data: {
                        id: selectedData.id,
                        company_id: selectedData.company.id
                    },
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                }
            )
            setPage(metaData.currentPage)
            setisOpenDetail(false)
            toast.success("Delete Success", toastOptions);
        } catch (error) {
            toast.error("Something went wrong. Cannot Delete File", toastOptions);
        } finally {
            setisDetailLoading(false)
        }
    }
    const rejectHandler = async () => {
        setisDetailLoading(true)
        try {

            await axios.post(`admin/product/excel/reject`,
                {

                    id: selectedData.id,
                    company_id: selectedData.company.id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                }
            )
            setisOpenDetail(false)
            toast.success("Status Update", toastOptions);
            setPage(metaData.currentPage)
        } catch (error) {
            toast.error("Something went wrong. Cannot load component.", toastOptions);
        } finally {
            setisDetailLoading(false)
        }
    }

    const uploadHandler = async (file) => {
        setisDetailLoading(true)
        const formData = new FormData();
        formData.append('id', selectedData.id);
        formData.append('company_id', selectedData.company.id);
        formData.append('excel_file', file);
        try {
            setisDetailLoading(true)
            const response = await axios.post('/admin/product/excel/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${session.accessToken}`
                },
            });

            // Handle the response from the server as needed
            setisOpenDetail(false)
            toast.success("Status Update", toastOptions);
            setPage(metaData.currentPage)
        } catch (error) {
            // Handle errors
            toast.error("Something went wrong.", toastOptions);
        } finally {
            setisDetailLoading(false)
        }
    }
    return (
        <>
            <ExcelDetail
                show={[isOpenDetail, setisOpenDetail]}
                loading={[isDetailLoading, setisDetailLoading]}
                session={session}
                data={selectedData}
                download={downloadHandler}
                delete={deleteHandler}
                reject={rejectHandler}
                upload={file => uploadHandler(file)}
            />
            <div className="mb-10">
                <TableExcel
                    title="Uploaded File Excel"
                    setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    links={links}
                    metaData={metaData}
                    view={data => showDetailHandler(data)}
                ></TableExcel>
            </div>
        </>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}