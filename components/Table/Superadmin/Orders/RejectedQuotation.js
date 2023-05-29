import Link from "next/link";
import moment from "moment";
//data
import Pagination from "@/components/Shared/Component/Pagination";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import BaseTable from "@/components/Interface/Table/BaseTable";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

export default function RejectedQuotation(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

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
                                Company Name (Buyer)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reason
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rejected Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Act.
                            </th>
                        </>
                    }
                    tableData={
                        <>
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="text-sm px-6 py-4">
                                            {item.buyer?.name}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.buyer?.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.reason}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.QuotationRejectedDate ? moment(item.QuotationRejectedDate).format('dddd, D MMMM YYYY') : '-'}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link href={`/admin/superadmin/orders/details/${item.id}`}>
                                                    <PrimaryButton
                                                        size="sm">
                                                        View
                                                    </PrimaryButton>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && metaData.total === 0 &&
                                <NoData colSpan={5}/>
                            }
                        </>
                    }
                ></BaseTable>
                {!props.isLoading && metaData.total > 0 ? 
                    <MetaData
                        total={metaData.total}
                        perPage={metaData.perPage}
                    />
                : null} 
            </PrimaryWrapper>
            <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            />
        </>
    );
}