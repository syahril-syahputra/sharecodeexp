import React from 'react'
import moment from 'moment'
import { checkValue } from '@/utils/general'
import BaseTable from '@/components/Interface/Table/BaseTable'
import Pagination from '@/components/Shared/Component/Pagination'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'

//data
import NavigationViewButton from './NavigationViewButton'

export default function OrderList(props) {
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
              <th scope="col" className="px-8 py-3">
                Order Created On
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer Part Number (Country)
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer
              </th>
              <th scope="col" className="px-6 py-3">
                Packaging
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer (Country)
              </th>
              <th scope="col" className="px-6 py-3">
                Seller (Country)
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Order Created On
              </th> */}
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
                      {item?.order_status?.admin_to_act ? (
                        <span className="relative animate-ping center inline-flex">
                          <i
                            className="fa-solid fa-circle fa-2xs"
                            style={{
                              color: 'rgb(249 115 22)',
                            }}
                          ></i>
                        </span>
                      ) : undefined}
                    </td>
                    <td scope="row" className="text-xs px-8 py-4">
                      {checkValue(item.order_number)}
                    </td>
                    <td className="text-xs px-6 py-4">
                      {item.order_date
                        ? moment(item.order_date).format('dddd, D MMMM YYYY')
                        : '-'}
                    </td>
                    <td scope="row" className="text-xs px-8 py-4">
                      {item.companies_products.ManufacturerNumber}{' '}
                      <span className="text-xs">
                        ({item.companies_products.country})
                      </span>
                    </td>
                    <td className="text-xs px-6 py-4">
                      {item.companies_products.Manufacture}
                    </td>
                    <td className="text-xs px-6 py-4">
                      {item.companies_products.packaging}
                    </td>
                    <td className="text-xs px-6 py-4">
                      {item.buyer.name}{' '}
                      <span className="text-xs">({item.buyer.country})</span>
                    </td>
                    <td className="text-xs px-6 py-4">
                      {item.companies_products.company.name}{' '}
                      <span className="text-xs">
                        ({item.companies_products.company.country})
                      </span>
                    </td>
                    <td className="text-xs px-6 py-4">{item.qty}</td>
                    <td className="text-xs px-6 py-4">
                      {item.order_status.name}
                    </td>
                    <td className="text-xs px-6 py-4 text-right">
                      <div className="inline-flex">
                        <NavigationViewButton
                          disabled={
                            +(item?.qty || '0') === 0 || item?.qty === null
                              ? true
                              : false
                          }
                          navigationId={item.slug}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!props.isLoading && props.metaData.total === 0 && (
                <NoData colSpan={10} />
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
