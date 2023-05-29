import React from "react";
import moment from "moment";
// components
import ComponentStatus from "@/components/Shared/Component/Statuses";
import Pagination from "@/components/Shared/Component/Pagination";

import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

export default function ComponentList(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    return (
        <>  
            <PrimaryWrapper>
                <HeaderTable
                    title={props.title}
                />
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
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Action
                            </th>
                        </>
                    }
                    tableData={
                    <>
                        {data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.ManufacturerNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.Manufacture}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.moq}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.country}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.dateCode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.packaging}
                                    </td>                                    
                                    <td className="px-6 py-4 w-36">
                                        <ComponentStatus status={item.status} title={`stock status ${item.status}`} label={item.status}/>
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {moment(item.created_at).format('dddd, D MMMM YYYY')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex">
                                            <PrimaryButton 
                                                size="sm"
                                                onClick={()=> props.viewHandler(item.id)}>
                                            View</PrimaryButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {!props.isLoading && metaData.total === 0 &&
                            <NoData colSpan={10}/>
                        }
                    </>
                    }                
                />
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