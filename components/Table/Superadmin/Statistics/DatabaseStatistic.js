// components
// import Pagination from "@/components/Shared/Component/Pagination";
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import MetaData from "@/components/Interface/Table/MetaData";
import NoData from "@/components/Interface/Table/NoData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import Pagination from "@/components/Shared/Component/Pagination";

export default function DatabaseStatistic(props) {
    return (
        <>
            <PrimaryWrapper>
                <HeaderTable
                    title={props.title}
                ></HeaderTable>
                <BaseTable
                    isBusy={props.isLoading}
                    header={
                        <>
                            <th scope="col" className="px-6 py-3">
                                Manufacture Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Members (has product)
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
                            {props.data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
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
                            {!props.isLoading && props.data.length === 0 &&
                                <NoData colSpan={5}/>
                            }
                        </>
                    }
                ></BaseTable>
                {!props.isLoading && props.metaData.total > 0 ? 
                    <MetaData
                        total={props.metaData.total}
                        perPage={props.metaData.perPage}
                    />
                : null} 
            </PrimaryWrapper>
            <Pagination 
                links={props.links}
                metaData={props.metaData}
                setPage={props.setPage}
            />
        </>
    );
}