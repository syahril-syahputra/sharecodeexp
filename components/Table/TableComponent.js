import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react"

export default function TableComponent(props){
    const {status} = useSession();
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => setIsLoading(props.isLoading), [])

    // const setPageChild = (page) =>{
    //     props.setPage(page)
    // }

    const inquiryItem = (item) => {
        if(status === 'unauthenticated'){
            console.log('show modal, login bos!', item)
            return 
        }

        console.log('redirect bos', item)
    }
    return (
        <>
            <div className="relative overflow-x-auto mt-14">
                <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Company Sector
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Manufacture Part Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Avaliable Quantity
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
                                        {item.AvailableQuantity}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                         {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                         {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${item.UnitPrice}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => inquiryItem(item.UnitPrice)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inquiry</button>
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

            <div className="flex justify-center mt-10 mx-auto justify-center">
                {links.map((item, index) => {
                    return(
                        <button 
                            onClick={() => props.setPage(item.label)}
                            key={index} 
                            className={`${item.active ? 'bg-blueGray-700 text-white' : 'border border-solid border-blueGray-500 text-blueGray-700'} text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
                        >
                            {item.label}
                        </button>

                    )
                })}
            </div>
        </>

        
    )
}

