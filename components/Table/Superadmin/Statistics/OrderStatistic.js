// components
// import Pagination from "@/components/Shared/Component/Pagination";

import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import MetaData from "@/components/Interface/Table/MetaData";
import NoData from "@/components/Interface/Table/NoData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import Pagination from "@/components/Shared/Component/Pagination";

export default function MemberStatistic(props) {
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
                        </>
                    }
                    tableData={
                        <>
                            {props.data.map((item, index) => {
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
                            {!props.isLoading && props.data.length === 0 &&
                                <NoData colSpan={6}/>
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