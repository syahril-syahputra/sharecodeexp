import Link from "next/link";
import moment from "moment";
//data
import Pagination from "@/components/Shared/Component/Pagination";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import BaseTable from "@/components/Interface/Table/BaseTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";
import MetaData from "@/components/Interface/Table/MetaData";
import NavigationViewButton from "./NavigationViewButton";

export default function CompletedShipment(props) {
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
                                Tracking Num. for Buyer
                            </th>  
                            <th scope="col" className="px-6 py-3">
                                Tracking Num. from Seller
                            </th>  
                            <th scope="col" className="px-6 py-3">
                                Arrival Date
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
                                            {item.trackingBuyer}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.trackingSeller}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.arrivalDate ? moment(item.arrivalDate).format("dddd, D MMMM YYYY") : '-'}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <NavigationViewButton navigationId={item.slug}/>
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