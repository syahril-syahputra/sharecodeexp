import React, {useState} from "react";

// components
import CompanyStatus from "./CompanyStatus";
import Pagination from "@/components/Shared/Component/Pagination";

// components
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

export default function CompanyList(props) {
    const tableType = props.tableType
    const data = props.data
    const links = props.links
    const metaData = props.metaData

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
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sector
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                *
                            </th>
                        </>
                    }
                    tableData={
                    <>
                        {data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.country}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.sector}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <CompanyStatus status={item.is_confirmed} title={`stock status ${item.is_confirmed}`} label={item.is_confirmed}/>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {!props.isLoading && 
                                            <div className="inline-flex">
                                                <PrimaryButton 
                                                    size="sm"
                                                    onClick={()=> props.viewHandler(item.id)}>
                                                View</PrimaryButton>
                                            </div>
                                        }
                                        {props.isLoading &&<div>
                                            <div className='text-center p-2'>
                                                <i className="fas fa-circle-notch fa-spin text-blue-600 fa-2xl"></i>
                                            </div>
                                        </div>}
                                    </td>
                                </tr>
                            )
                        })}
                        {!props.isLoading && metaData.total === 0 &&
                            <NoData colSpan={11}/>
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