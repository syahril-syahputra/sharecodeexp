import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import moment from 'moment'

// components
import ComponentStatus from '@/components/Shared/Component/Statuses'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import BaseTable from '@/components/Interface/Table/BaseTable'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import Pagination from '@/components/Shared/Component/Pagination'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { Dialog, Transition } from '@headlessui/react'
import { Button, Modal, Spinner } from 'flowbite-react'
import axios from 'lib/axios'
import SuccessButton from '@/components/Interface/Buttons/SuccessButton'

export default function TableExcel(props) {
  const data = props.data
  const links = props.links
  const metaData = props.metaData

  return (
    <>
      <PrimaryWrapper>
        <HeaderTable title={props.title}></HeaderTable>

        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                File Name
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>

              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Last Updated at
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
                      {item.name}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.file_status?.name}
                    </td>
                    <td className="text-sm px-6 py-4">{item.company.name}</td>
                    <td className="text-sm px-6 py-4">
                      {item.company.country}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {moment(item.updated_at).format('dddd, D MMMM YYYY')}
                    </td>
                    <td className=" space-x-4 flex-nowrap whitespace-nowrap text-sm px-6 py-4 text-right">
                      <Link href={'/admin/superadmin/product/excel/' + item.id}>
                        <PrimaryButton
                          // onClick={() => props.view(item)}
                          size="sm"
                        >
                          View
                        </PrimaryButton>
                      </Link>
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
