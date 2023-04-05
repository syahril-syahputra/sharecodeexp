// components
import moment from 'moment';
import Pagination from "@/components/Shared/Component/Pagination";

export default function UnfoundComponent(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

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
                                {props.title}
                            </h3>
                        </div>
                        <div className="px-4 my-2">
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Manufacture Part Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Search Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {item.company?.name}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.created_at).format('dddd, D MMMM YYYY')}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {metaData.total > 0 ? 
                    <div className="mt-2">
                        <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                    </div>
                : null}
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