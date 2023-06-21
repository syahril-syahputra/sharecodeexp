import React, {useState} from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

//comp
import NeedLoginModal from "@/components/Modal/NeedLogin/NeedLogin"
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import BaseTable from "@/components/Interface/Table/BaseTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import Pagination from "@/components/Shared/Component/Pagination";

export default function TableComponent(props){
    const {status} = useSession();
    const router = useRouter()

    const [isInquiryClicked, setIsInquiryClicked] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const inquiryItem = (item) => {
        setIsInquiryClicked(true)
        if(status === 'unauthenticated'){
            setShowModal(true)
            setIsInquiryClicked(false)
        } else {
            router.push(`/admin/member/buycomponents/inquirylist/details/${item}`)
        }
    }

    return (
        <>
            <PrimaryWrapper>
                <BaseTable
                    isBusy={props.isLoading}
                    header={
                        <>
                            <th scope="col" className="px-6 py-3">
                                Part Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Stocks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MOQ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
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
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.ManufacturerNumber}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.Manufacture}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.Description}
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
                                        <td className="px-6 py-4 text-right">
                                            <PrimaryButton
                                                disabled={isInquiryClicked}
                                                size="sm"
                                                onClick={() => inquiryItem(item.id)}
                                            >
                                            {isInquiryClicked && <i className="px-3 fas fa-hourglass fa-spin"></i>}    
                                            {!isInquiryClicked && 'Inquiry'}    
                                            </PrimaryButton>                                            
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && props.metaData.total === 0 &&
                                <NoData colSpan={7}>Component not found</NoData>
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
            {showModal ? (
                <NeedLoginModal
                    setShowModal={setShowModal}
                />
            ) : null}
        </>
    );
}

