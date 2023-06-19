import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

//comp
import NeedLoginModal from "../Modal/NeedLogin";

export default function ComponentTable(props){
    const {status} = useSession();
    const router = useRouter()
    const data = props.data

    const [showModal, setShowModal] = useState(false);
    const inquiryItem = (item) => {
        if(status === 'unauthenticated'){
            setShowModal(true)
        } else {
            router.push(`/admin/product/mycart/${item}`)
        }
    }
    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Available Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                MOQ
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Manufacturer Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Date Code
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                *
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.country}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.moq}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.ManufacturerNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.Description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.dateCode}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => inquiryItem(item)} className="font-medium text-white bg-blueGray-700 p-2">Inquiry</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}

            {showModal ? (
                <NeedLoginModal
                    setShowModal={setShowModal}
                />
            ) : null}
        </div>
    )
}

