import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Admin from "layouts/Admin.js";
import { getSession } from "next-auth/react";
import axios from "lib/axios"
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import PageHeader from '@/components/Interface/Page/PageHeader';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

DetailUploadedExcel.layout = Admin;
export default function DetailUploadedExcel({ session, data }) {
    return (
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
                                Excel Status
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

            </div>
        </PrimaryWrapper>
    )
}
async function fetchData(context, accessToken) {
    try {
        const data = await axios.get(`/seller/product/excel/${context.query.id}/details`, {

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