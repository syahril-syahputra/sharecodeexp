import React from "react";
import Link from "next/link";
import moment from 'moment';

// components
import ComponentStatus from "@/components/Shared/Component/Statuses";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import DangerButton from "@/components/Interface/Buttons/DangerButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import BaseTable from "@/components/Interface/Table/BaseTable";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import Pagination from "@/components/Shared/Component/Pagination";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";

export default function TableProduct(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    return (
        <>
            <PrimaryWrapper>
                <HeaderTable
                    title={props.title}
                    action={
                        <>
                            <Link href="/admin/member/sellcomponents/component/pending">
                                <WarningButton
                                    size="sm"
                                    className="mr-2"
                                >
                                    <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                                    Pending Product
                                </WarningButton>
                            </Link>
                            <Link href="/admin/member/sellcomponents/component/rejected">
                                <DangerButton
                                    size="sm"
                                    className="mr-2"
                                >   
                                    <i className="mr-2 ml-1 fas fa-times text-white"></i>
                                    Rejected Product
                                </DangerButton>
                            </Link>
                            <Link href="/admin/member/sellcomponents/component/add">
                                <SecondaryButton
                                    size="sm"
                                >
                                    <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                                    Add Product
                                </SecondaryButton>
                            </Link>
                        </>
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
                                Available Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MOQ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3 w-36">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created On
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
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.Manufacture}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.AvailableQuantity}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.moq}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.dateCode}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.packaging}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            <ComponentStatus status={item.status} title={`stock status ${item.status}`} label={item.status}/>
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {moment(data.created_at).format('dddd, D MMMM YYYY')}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link href={`/admin/member/sellcomponents/component/view/${item.slug}`}>
                                                    <PrimaryButton
                                                        size="sm"
                                                    >View</PrimaryButton>
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
                        perPage={props.data.length}
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