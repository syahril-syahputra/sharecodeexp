import { useState, useMemo } from 'react'
import Link from 'next/link'
import moment from 'moment'

//data
import { orderStatusesOptions } from '@/utils/optionData'
import Pagination from '@/components/Shared/Component/Pagination'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import BaseTable from '@/components/Interface/Table/BaseTable'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import NavigationViewButton from './NavigationViewButton'

export default function CompaniesBasedOrder(props) {
  const orderStatuses = useMemo(() => orderStatusesOptions, [])
  const [status, setStatus] = useState({ value: 'all', label: 'All Status' })
  const handleStatusChange = (value) => {
    setStatus(value)
    props.statusChange(value)
  }

  return (
    <>
      <PrimaryWrapper>
        <HeaderTable title={props.title}></HeaderTable>
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
                Inquiry QTY
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created On
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
                    <td className="text-sm px-6 py-4">
                      {item.companies_products.ManufacturerNumber}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.companies_products.Manufacture}
                    </td>
                    <td className="text-sm px-6 py-4">{item.qty}</td>
                    <td className="text-sm px-6 py-4">
                      {item.order_status.name}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {/* set to local time */}
                      {item.created_at
                        ? moment(item.created_at).local().format('dddd, D MMMM YYYY')
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
                <NoData colSpan={6} />
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
