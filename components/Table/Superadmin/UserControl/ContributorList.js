import React, { useState } from 'react'
import Link from 'next/link'

// components
import Pagination from '@/components/Shared/Component/Pagination'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import BaseTable from '@/components/Interface/Table/BaseTable'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'

export default function VendorList(props) {
  return (
    <>
      <PrimaryWrapper>
        <HeaderTable
          title={props.title}
          action={
            <Link href={`/admin/superadmin/usercontrol/contributors/create`}>
              <SecondaryButton size="sm">
                <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                {/* Add Contributor */}
                Add Subscriber
              </SecondaryButton>
            </Link>
          }
        ></HeaderTable>
        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              {props.enableAction && (
                <th scope="col" className="px-6 py-3 text-right">
                  Action
                </th>
              )}
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
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>
                    {props.enableAction && (
                      <td className="text-sm px-6 py-4 text-right">
                        <div className="inline-flex">
                          <Link
                            href={`/admin/superadmin/usercontrol/contributors/edit/${item.id}`}
                          >
                            <WarningButton size="sm" className="mr-2">
                              Edit
                            </WarningButton>
                          </Link>
                          <DangerButton
                            onClick={() => props.onDelete(item)}
                            size="sm"
                          >
                            Delete
                          </DangerButton>
                        </div>
                      </td>
                    )}
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
