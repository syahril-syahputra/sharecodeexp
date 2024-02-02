import React from 'react'
import Link from 'next/link'
import moment from 'moment'

// components
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import BaseTable from '@/components/Interface/Table/BaseTable'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import Pagination from '@/components/Shared/Component/Pagination'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'

export default function TableExcel(props) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

  return (
    <>
      <PrimaryWrapper>
        <HeaderTable
          title={props.title}
          action={
            <>
              <Link
                target="_blank"
                href={publicDir + '/template/exepart_template.xlsx'}
              >
                <SecondaryButton size="sm" className="mr-2">
                  <i className="mr-2 ml-1 fas fa-file"></i>
                  Download Product Template
                </SecondaryButton>
              </Link>
              <Link href="/admin/member/seller/product/bulkinsert">                
                <PrimaryButton size="sm">
                  <i className="mr-2 ml-1 fas fa-arrow-up"></i>
                  Upload New File Excel</PrimaryButton>
              </Link>
            </>
            
          }
        ></HeaderTable>
        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Action Required
              </th>
              <th scope="col" className="px-6 py-3">
                File Name
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Uploaded at
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
                      {item?.file_status?.seller_to_act ? (
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
                      {item.name}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.file_status?.name}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {moment(item.created_at).local().format('dddd, D MMMM YYYY')} {/* set to local time */}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {moment(item.updated_at).local().format('dddd, D MMMM YYYY')} {/* set to local time */}
                    </td>
                    <td className="text-sm px-6 py-4 text-right">
                      <div className="inline-flex space-x-2">
                        <Link
                          href={
                            '/admin/member/seller/product/uploaded/' + item.id
                          }
                        >
                          <PrimaryButton>View</PrimaryButton>
                        </Link>
                        <DangerButton
                          onClick={() => props.delete(item)}
                          size="sm"
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
