import Link from "next/link";
//data
import Pagination from "@/components/Shared/Component/Pagination";

export default function PendingShipment(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    return (
        <>  
            <div className="relative">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                {props.title}
                            </h3>
                        </div>
                        <div className="px-4 flex-initial w-64">

                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto ">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Expected Shipment Date
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
                                            {item.buyer?.name}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.id}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link 
                                                    href={`/admin/superadmin/orders/details/${item.id}`}
                                                    className="mr-2 font-medium text-blue-600 text-white bg-indigo-500 p-2">View</Link>
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