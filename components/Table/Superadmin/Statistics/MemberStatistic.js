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
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exepart Visit (last 30 days)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Component Orders
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Canceled Orders
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.country}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.visitors_count}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.total_completed}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.total_cancelled}
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