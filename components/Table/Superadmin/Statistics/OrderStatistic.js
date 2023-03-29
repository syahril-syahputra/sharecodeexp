// components
// import Pagination from "@/components/Shared/Component/Pagination";

export default function MemberStatistic(props) {
    const data = props.data
    // const links = props.links
    // const metaData = props.metaData

    return (
        <>  
            <div className="relative">
                <div className="relative overflow-x-auto shadow">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                            <th scope="col" className="px-6 py-3">
                                    Manufacture Part Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Member has Component
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order Complete
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order Cancelled
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Sales Volume
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.member_count}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.order_complete}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.order_cancelled}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.total_profit}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.total_quantity}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {/* {metaData.total > 0 ? 
                    <div className="mt-2">
                        <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                    </div>
                : null} */}
            </div>

            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}
            
            {/* <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            /> */}
        </>
    );
}