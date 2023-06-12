import { useState, useMemo } from "react";
import Link from "next/link";
import moment from "moment";

// components
import SelectInput from "@/components/Interface/Form/SelectInput"
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import Pagination from "@/components/Shared/Component/Pagination";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

//data
import {orderStatusesOptions} from "@/utils/optionData"

export default function IncomingInquiry(props) {
    const orderStatuses = useMemo(() => orderStatusesOptions, [])
    const [status, setStatus] = useState({value: "all", label: "All Status"});
    const handleStatusChange = value => {
        setStatus(value)
        props.statusChange(value)
    };
    return (
        <>  
            <PrimaryWrapper>
                <HeaderTable
                    title={props.title}
                    action={
                        props.filterStatus && 
                        <div className="w-64">
                            <SelectInput
                                name="status"
                                value={status}
                                options={orderStatuses}
                                onChange={handleStatusChange}
                                />
                        </div>
                    }
                />
                <BaseTable  
                    isBusy={props.isLoading}
                    header={
                        <>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer Part Number (Country)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Buyer (Country)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Seller (Country)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Incoming Inquiry QTY
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Act.
                            </th>
                        </>
                    }
                    tableData={
                    <>
                        {props.data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="text-sm px-6 py-4">
                                        {item.companies_products.ManufacturerNumber} ({item.companies_products.country})
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.companies_products.Manufacture}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.companies_products.packaging}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.buyer.name} ({item.buyer.country})
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.companies_products.company.name} ({item.companies_products.company.country})
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.qty}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {item.order_status.name}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {moment(item.created_at).format('dddd, D MMMM YYYY')}
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
                        {!props.isLoading && props.metaData.total === 0 &&
                            <NoData colSpan={9}/>
                        }
                    </>
                    }                
                />
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