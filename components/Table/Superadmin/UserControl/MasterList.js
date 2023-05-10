import React, {useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ChangeStatus from "@/components/Modal/CompanyControl/ChangeStatus"
import Pagination from "@/components/Shared/Component/Pagination";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import BaseTable from "@/components/Interface/Table/BaseTable";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function CompanyList(props) {
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
                                Master User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sector
                            </th>
                            {/* <th scope="col" className="px-6 py-3 text-right">
                                Act.
                            </th> */}
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
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.company.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.company.sector}
                                        </td>
                                        {/* <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link href={`/admin/superadmin/usercontrol/master/view/${item.id}`}>
                                                    <PrimaryButton
                                                        size="sm"
                                                    >View</PrimaryButton>
                                                </Link>
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            })}
                            {!props.isLoading && props.metaData.total === 0 &&
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