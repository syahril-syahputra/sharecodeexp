import React from "react";
import Link from "next/link";

// components

export default function TableAccount(props) {
    const data = props.data

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
                            List of Account
                            </h3>
                        </div>
                        <div className="px-4 my-2">
                            <Link href="/admin/settings/masteraccount/add" className="relative bg-blueGray-700 p-2 text-white">
                                <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                                Add Account</Link>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto ">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email Verified At
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    *
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email_verified_at}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <button className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">Edit</button>
                                                <button className="font-medium text-blue-600 text-white bg-red-400 p-2">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}
        </>
    );
}