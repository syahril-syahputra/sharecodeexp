import React from 'react'
import Link from 'next/link'
import moment from 'moment'

// components
import Pagination from '@/components/Shared/Component/Pagination'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import BaseTable from '@/components/Interface/Table/BaseTable'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'

export default function ComponentList(props) {
  return (
    <>
      <PrimaryWrapper>
        <HeaderTable
          title={props.title}
          action={
            <Link href="/product/search">
              <SecondaryButton size="sm">
                <i className="mr-2 ml-1 fas fa-search text-white"></i>
                Search New Product
              </SecondaryButton>
            </Link>
          }
        ></HeaderTable>
        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Order Quantity
              </th>
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
                    <td scope="row" className="text-sm px-6 py-2">
                      {item.qty}
                    </td>
                    <td scope="row" className="text-sm px-6 py-2">
                      {item.companies_products.ManufacturerNumber}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.Manufacture}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.AvailableQuantity}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.moq}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.country}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.dateCode}
                    </td>
                    <td className="text-sm px-6 py-2">
                      {item.companies_products.packaging}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {moment(item.created_at).format('dddd, D MMMM YYYY')}
                    </td>
                    <td className="py-2 text-right w-32">
                      <div className="inline-flex">
                        <WarningButton
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            props.handleEdit(
                              item.id,
                              item.qty,
                              item.companies_products.ManufacturerNumber
                            )
                          }
                        >
                          Edit
                        </WarningButton>
                        <PrimaryButton
                          size="sm"
                          className="mr-2 w-20"
                          onClick={() =>
                            props.handleInquiryNow(
                              item.id,
                              item.qty,
                              item.companies_products.ManufacturerNumber
                            )
                          }
                        >
                          <span className="inline">Inquire Now</span>
                        </PrimaryButton>
                        <DangerButton
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            props.handleDelete(
                              item.id,
                              item.companies_products.ManufacturerNumber
                            )
                          }
                        >
                          Delete
                        </DangerButton>
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
