import {useState} from "react";
import Link from "next/link";

// components
import Select from 'react-tailwindcss-select';

//data
import {orderStatusesOptions} from "@/utils/optionData"
import Pagination from "@/components/Shared/Component/Pagination";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import BaseTable from "@/components/Interface/Table/BaseTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import MetaData from "@/components/Interface/Table/MetaData";
import NoData from "@/components/Interface/Table/NoData";

export default function PendingPayment(props) {
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
                                Order Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PI Upload Date
                            </th>                               
                            <th scope="col" className="px-6 py-3">
                                Pi Upload Time
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
                                            {item.buyer?.name}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.id}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link href={`/admin/superadmin/orders/details/${item.id}`}>
                                                    <PrimaryButton
                                                        size="sm"
                                                    >
                                                        View
                                                    </PrimaryButton>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && props.metaData.total === 0 &&
                                <NoData colSpan={8}/>
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