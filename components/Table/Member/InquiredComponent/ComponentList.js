import { useState, useMemo } from "react";
import Link from "next/link";
import moment from "moment";

// components
import Pagination from "@/components/Shared/Component/Pagination";

//data
import {orderStatusesOptions} from "@/utils/optionData"
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import SelectInput from "@/components/Interface/Form/SelectInput";
import BaseTable from "@/components/Interface/Table/BaseTable";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function InquiryComponents(props) {
    const orderStatuses = useMemo(() => orderStatusesOptions, [])
    const [status, setStatus] = useState({value: 'all', label: 'All Status'});
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
                        <div className="w-64">
                            <SelectInput
                                name="status"
                                value={status}
                                options={orderStatuses}
                                onChange={handleStatusChange}
                                />
                        </div>
                    }
                ></HeaderTable>
                <BaseTable
                    isBusy={props.isLoading}
                    header={
                        <>
                           <th scope="col" className="px-6 py-3">
                                Manufacturer Part Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MOQ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order QTY
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
                                            {item.companies_products.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.Manufacture}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.packaging}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.AvailableQuantity}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.moq}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.order_status?.name}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {moment(item.created_at).format('dddd, D MMMM YYYY')}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link href={`/admin/member/buycomponents/inquiredcomponents/detail/${item.id}`}>
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
                                <NoData colSpan={10}/>
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