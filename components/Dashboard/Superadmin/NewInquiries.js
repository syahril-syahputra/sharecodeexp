import moment from 'moment'
import React from 'react'
import Link from 'next/link'

// components
import BaseTable from '@/components/Interface/Table/BaseTable'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import NoData from '@/components/Interface/Table/NoData'

export default function NewInquiries(props) {
  const data = props.data ? props.data.slice(0, 5) : []

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg">
        <HeaderTable
          title="New Inquiries"
          action={
            <Link href="/admin/superadmin/orders/allorders">
              <PrimaryButton size="sm">See all</PrimaryButton>
            </Link>
          }
        />
        <BaseTable
          header={
            <>
              <th className="px-6 py-3 text-left">Company Name</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Inquiries Date</th>
              <th className="px-6 py-3 text-right min-w-140-px">Action</th>
            </>
          }
          tableData={
            <>
              {data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th className="px-6 align-middle p-2 text-left">
                      {item.buyer?.name}
                    </th>
                    <td className="px-6 align-middle p-2">
                      {item.buyer?.country}
                    </td>
                    <td className="px-6 align-middle p-2">
                      {item.companies_products?.ManufacturerNumber}
                    </td>
                    <td className="px-6 align-middle p-2">
                      {moment(item.created_at).format('dddd, D MMMM YYYY')}
                    </td>
                    <td className="px-6 align-middle p-2 text-right">
                      <Link
                        href={`/admin/superadmin/orders/details/${item.id}`}
                      >
                        <SecondaryButton size="sm">View</SecondaryButton>
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {data.length === 0 && <NoData colSpan={5} />}
            </>
          }
          isBusy={props.isLoading}
        />
      </div>
    </>
  )
}
