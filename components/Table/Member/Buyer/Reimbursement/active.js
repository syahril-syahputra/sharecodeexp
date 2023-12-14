import React from 'react'
import moment from 'moment'
import BaseTable from '@/components/Interface/Table/BaseTable'
import Pagination from '@/components/Shared/Component/Pagination'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import NavigationViewButton from '../Order/NavigationViewButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { checkValue } from '@/utils/general'

export default function ReimbursementActiveCompletedTable(props) {
  return (
    <>
      <PrimaryWrapper>
        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Action Required
              </th>
              <th scope="col" className="px-6 py-3">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                Created On
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer Part Number
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Order QTY
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
                      {item?.order_status?.buyer_to_act ? (
                        <span className="relative flex text-xl">
                          <span className="animate-ping absolute inline-flex opacity-75">
                            <i className="fas fa-circle fa-2xs text-orange-500" />
                          </span>
                          <span className="relative inline-flex">
                            <i className="fas fa-circle fa-2xs text-orange-500" />
                          </span>
                        </span>
                      ) : undefined}
                    </td>
                    <td scope="row" className="text-sm px-6 py-4">
                      {checkValue(item.order_number)}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {/* set to local time */}
                      {item.order_date
                        ? moment(item.order_date).local().format('dddd, D MMMM YYYY')
                        : '-'}
                    </td>
                    <td scope="row" className="text-sm px-6 py-4">
                      {item.companies_products.ManufacturerNumber}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.companies_products.Manufacture}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.companies_products.country}
                    </td>
                    {/* <td className="text-sm px-6 py-4">
                                        {item.companies_products.packaging}
                                    </td> */}
                    {/* <td className="text-sm px-6 py-4">
                                        {item.companies_products.AvailableQuantity}
                                    </td> */}
                    {/* <td className="text-sm px-6 py-4">
                                        {item.companies_products.moq}
                                    </td> */}
                    <td className="text-sm px-6 py-4">{item.qty}</td>
                    <td className="text-sm px-6 py-4">
                      {item.order_status?.name}
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
                <NoData colSpan={9} />
              )}
            </>
          }
        />
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
