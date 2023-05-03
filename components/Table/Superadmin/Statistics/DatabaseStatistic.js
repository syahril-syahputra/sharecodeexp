// components
// import Pagination from "@/components/Shared/Component/Pagination";
import BaseTable from "@/components/Interface/Table/BaseTable";

export default function DatabaseStatistic(props) {
    const data = props.data
    // const links = props.links
    // const metaData = props.metaData

    return (
        <>  
            <BaseTable                 
                header={
                    <>
                        <th scope="col" className="px-6 py-3">
                            Manufacture Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Members
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Complete Orderss
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Sales Volume ($)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Stock
                        </th>
                    </>
                }
                tableData={
                    <>
                        {props.items.map((item) => {
                            return(
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.ManufacturerNumber}
                                    </td>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.total_members}
                                    </td>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.total_completed_order}
                                    </td>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        $ {item.total_sales_volume}
                                    </td>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.total_stock}
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                }                    
            />

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