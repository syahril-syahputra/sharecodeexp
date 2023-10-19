import Link from 'next/link'
import moment from 'moment'

//data
import Pagination from '@/components/Shared/Component/Pagination'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import BaseTable from '@/components/Interface/Table/BaseTable'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import NavigationViewButton from './NavigationViewButton'

export default function RejectedOrder(props) {
  return (
    <>
      <PrimaryWrapper>
        <HeaderTable title={props.title}></HeaderTable>

        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Company Name (Buyer)
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Reason
              </th>
              <th scope="col" className="px-6 py-3">
                Rejected Date
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </>
          }
          tableData={
            <>
              {props.data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td scope="row" className="text-sm px-6 py-4">
                      {item.buyer?.name}
                    </td>
                    <td className="text-sm px-6 py-4">{item.buyer?.country}</td>
                    <td className="text-sm px-6 py-4">{item.reason}</td>
                    <td className="text-sm px-6 py-4">
                      {item.OrderReturnedDate
                        ? moment(item.OrderReturnedDate).format(
                            'dddd, D MMMM YYYY'
                          )
                        : '-'}
                    </td>
                    <td className="text-sm px-6 py-4 text-right">
                      <div className="inline-flex">
                        <NavigationViewButton navigationId={item.slug} />
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!props.isLoading && props.metaData.total === 0 && (
                <NoData colSpan={5} />
              )}
            </>
          }
        ></BaseTable>
        {!props.isLoading && props.metaData.total > 0 ? (
          <MetaData total={props.metaData.total} perPage={props.data.length} />
        ) : null}
      </PrimaryWrapper>
      <Pagination
        links={props.links}
        metaData={props.metaData}
        setPage={props.setPage}
      />
    </>
  )
}
