import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Admin from "layouts/Admin.js";
import { getSession } from "next-auth/react";
import axios from "lib/axios"
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import PageHeader from '@/components/Interface/Page/PageHeader';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import DangerButton from '@/components/Interface/Buttons/DangerButton';
import SuccessButton from '@/components/Interface/Buttons/SuccessButton';
import { FileInput, Spinner } from 'flowbite-react';
import ExcelComponent from '@/components/Modal/Component/ExcelComponent';

DetailUploadedExcel.layout = Admin;
export default function DetailUploadedExcel({ session, data }) {
    const [isDetailLoading, setisDetailLoading] = useState(false)
    const [uploadForm, setuploadForm] = useState(false)
    const [isOnUploading, setisOnUploading] = useState(false)
    const [file, setFile] = useState(null);
    const [isOpenConfirmDelete, setisOpenConfirmDelete] = useState(false)
    const [isDeleting, setisDeleting] = useState(false)
    const handleFileChange = (e) => {
        setFile(e);
    };

    const router = useRouter()
    const uploadHandler = async (file) => {
        setisOnUploading(true)
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('company_id', data.company.id);
        formData.append('excel_file', file);
        try {
            const response = await axios.post('/admin/product/excel/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${session.accessToken}`
                },
            });

            // Handle the response from the server as needed
            toast.success(response.data.message, toastOptions);
            setuploadForm(false)
            setisOnUploading(false)
            router.replace(router.asPath);
        } catch (error) {
            // Handle errors
            toast.error(error, toastOptions);
        } finally {
            setisOnUploading(false)
        }
    }

    const validate = () => {
        if (!file) {

            return
        }

        uploadHandler(file.target.files[0])
    }

    const downloadHandler = async () => {
        setisDetailLoading(true)
        try {
            if (data.status_id === "1") {
                await axios.post(`/admin/product/excel/download`,
                    {

                        id: data.id,
                        company_id: data.company.id
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${session.accessToken}`
                        }
                    }
                )
                toast.success("Status Update", toastOptions);
                router.replace(router.asPath);
            }
            window.location.href = process.env.NEXT_PUBLIC_DIR + data.path_dirty_file
        } catch (error) {
            console.log(error)
            toast.error(error, toastOptions);
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
                        id: data.id,
                        company_id: data.company.id
                    },
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                }
            )

            toast.success("Delete Success", toastOptions);
            router.push('/admin/superadmin/product/uploaded')
        } catch (error) {
            toast.error(error, toastOptions);
        } finally {
            setisOpenConfirmDelete(false)
            setisDetailLoading(false)
        }

    }
    const rejectHandler = async () => {
        setisDetailLoading(true)
        try {

            const response = await axios.post(`admin/product/excel/reject`,
                {

                    id: data.id,
                    company_id: data.company.id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                }
            )
            toast.success(response.data.message, toastOptions);
            router.replace(router.asPath);
        } catch (error) {
            toast.error(error, toastOptions);
        } finally {
            setisDetailLoading(false)
        }
    }


    return (
        <>
            <ExcelComponent
                show={[isOpenConfirmDelete, setisOpenConfirmDelete]}
                delete={[isDeleting, setisDeleting]}
                fileName={data.name}
                deleteHandler={deleteHandler} />

            <PrimaryWrapper>
                <PageHeader
                    leftTop={
                        <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }>
                            Detail File Excel
                        </h3>
                    }
                    rightTop={

                        <div className='flex justify-around py-8 space-x-4'>
                            <PrimaryButton onClick={() => downloadHandler()}>Download</PrimaryButton>
                            <DangerButton onClick={() => setisOpenConfirmDelete(true)}>Delete</DangerButton>
                            <DangerButton onClick={() => rejectHandler()}>Reject</DangerButton>
                        </div>
                    }

                ></PageHeader>
                <div>
                    <div className='flex items-center justify-center'>

                        <FontAwesomeIcon icon={faFileExcel}
                            className=" h-28 w-28 text-green-400 mx-auto"
                        />
                    </div>
                    <table className="w-50 text-sm text-left text-gray-500 bg-white">
                        <tbody>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    File Name
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.name}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Company Name
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.company.name}
                                </td>
                            </tr><tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.status}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Uploaded at
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {moment(data.created_at).format('dddd, D MMMM YYYY')}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Last Updated at
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {moment(data.updated_at).format('dddd, D MMMM YYYY')}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Log
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.log || '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {

                        uploadForm ? <div className='p-4'>
                            <FileInput
                                helperText="Select Excel File"
                                className='border border-gray-300'
                                id="file"
                                accept=".xls, .xlsx"
                                disabled={isOnUploading}
                                onChange={handleFileChange}
                            />
                            {
                                isOnUploading ? <div className='flex text-gray-600 space-x-4 justify-center items-center pt-8'>
                                    <Spinner color="info" /><span>Loading</span>
                                </div> : <div className='flex justify-center space-x-2 pt-4'>

                                    <DangerButton onClick={() => setuploadForm(false)}>Cancel</DangerButton>
                                    <SuccessButton onClick={() => validate()}>Upload</SuccessButton>
                                </div>
                            }

                        </div> :
                            <div className='p-8'>
                                <SuccessButton onClick={() => setuploadForm(true)}>Upload</SuccessButton>
                            </div>
                    }
                </div>
            </PrimaryWrapper>
        </>
    )
}
async function fetchData(context, accessToken) {
    try {
        const data = await axios.get(`/admin/product/excel/${context.query.id}/details`, {

            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    const result = await fetchData(context, session.accessToken)
    return {
        props: {
            session,
            data: result.data.data
        }
    }
}