// components
import moment from 'moment';
import Pagination from "@/components/Shared/Component/Pagination";
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import HeaderTable from '@/components/Interface/Table/HeaderTable';
import BaseTable from '@/components/Interface/Table/BaseTable';
import NoData from '@/components/Interface/Table/NoData';
import MetaData from '@/components/Interface/Table/MetaData';

export default function UnfoundComponent(props) {
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
                                Manufacture Part Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Search Date
                            </th>
                        </>
                    }
                    tableData={
                        <>
                            {props.data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {item.company?.name}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.created_at).format('dddd, D MMMM YYYY')}
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && props.metaData.total === 0 &&
                                <NoData colSpan={3}/>
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