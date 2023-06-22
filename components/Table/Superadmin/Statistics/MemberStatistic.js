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
                        </>
                    }
                    tableData={
                        <>
                            {props.data.map((item, index) => {
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