import {useState} from "react";
import Link from "next/link";

// components
import Select from 'react-tailwindcss-select';
import Pagination from "@/components/Shared/Component/Pagination";

//data
import {orderStatusesOptions} from "data/optionData"

export default function InquiryComponents(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    const [orderStatuses, setOrderStatuses] = useState(orderStatusesOptions)
    const [status, setStatus] = useState({value: 'inquired', label: 'Order Inquiry'});
    const handleStatusChange = value => {
        setStatus(value)
        props.statusChange(value)
    };
    return (
        <>  
            <div className="relative">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="mt-2">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                {props.title}
                            </h3>
                        </div>
                        <div className="px-4 flex-initial w-64">
                            {/* <div className="w-full px-3"> */}
                                <Select 
                                    name="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    options={orderStatuses}
                                    classNames={{
                                        menuButton: () => (
                                            `h-12 flex p-1 text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none`
                                        ),
                                        menu: "absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700",
                                        listItem: ({ isSelected }) => (
                                            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                                                isSelected
                                                    ? `text-white bg-blue-500`
                                                    : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                            }`
                                        ),
                                        searchBox: "rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500"
                                    }}
                                    />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto ">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Manufacturer Part Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Manufacturer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Packaging
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Available Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    MOQ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order QTY
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    *
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="text-sm px-6 py-4">
                                            {item.companies_products.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.Manufacture}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.packaging}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.AvailableQuantity}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.moq}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.order_status_id}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link 
                                                    href={`/admin/member/buycomponents/inquirylist/detail/${item.id}`}
                                                    className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">View</Link>
                                                {/* <button className="font-medium text-blue-600 text-white bg-red-400 p-2">Delete</button> */}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && metaData.total === 0 && <>
                                <tr className='text-center my-auto mt-10 text-lg p-5'>
                                    <td colSpan={11} className="p-5 italic ">
                                        You have no data to show
                                    </td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                    {metaData.total > 0 ? 
                        <div className="mt-2">
                            <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                        </div>
                    : null}
                </div>
            </div>
            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}

            <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            />
            

        </>
    );
}