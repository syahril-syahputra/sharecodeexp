import Link from "next/link";

//component
import Pagination from "@/components/Shared/Component/Pagination";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import BaseTable from "@/components/Interface/Table/BaseTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";

export default function CompleteOrder(props) {
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
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer Part Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exepart - Seller (/Pcs)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Amount ($) for Exepart
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Amount ($) for Seller
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
                                            {item.companies_products?.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            ${parseFloat(item.price_profite)} - ${parseFloat(item.price)}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            ${parseInt(item.qty) * parseFloat(item.price_profite)}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            ${parseInt(item.qty) * parseFloat(item.price)}
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
                                <NoData colSpan={7}/>
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