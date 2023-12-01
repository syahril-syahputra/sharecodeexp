import React, {useState} from 'react'
import moment from 'moment'
import BaseTable from '@/components/Interface/Table/BaseTable'
import Pagination from '@/components/Shared/Component/Pagination'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import {checkValue} from '@/utils/general'
import HeaderTable from '@/components/Interface/Table/HeaderTable'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import {useSession} from 'next-auth/react'
import HelpRequestModal from '@/components/Modal/Component/HelpRequestModal'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'

export default function Help({session, ...props}) {
  const [showHelpRequestModal, setShowHelpRequestModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const role = session?.user?.userDetail?.role_id
  const handleAddHelpRequest = async (stateSubject, stateMessage) => {
    setShowHelpRequestModal(false)
    setIsLoading(true)
    setIsLoadingModal(true)
    await axios
      .post(
        `/member/help-request`,
        {
          subject: stateSubject,
          message: stateMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success('The help request has been sent.', toastOptions)
        setIsLoadingModal(false)
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot sent help request.',
          toastOptions
        )
        setIsLoadingModal(false)
      })
      .finally(() => {
        props.loadData(1)
      })
  }

  return (
    <>
      <PrimaryWrapper>
        {role == 2 && <HeaderTable
          title=""
          action={
            <>
              <SecondaryButton
                size="sm"
                onClick={() => setShowHelpRequestModal(true)}
              >
                <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                Add Help Request
              </SecondaryButton>
            </>
          }
        />}
        <BaseTable
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Created On
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>

              <th scope="col" className="px-6 py-3">
                Updated On
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
                      {checkValue(item.id)}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {item.created_at
                        ? moment(item.created_at).format('dddd, D MMMM YYYY')
                        : '-'}
                    </td>
                    <td scope="row" className="text-sm px-6 py-4">
                      {item.message}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {checkValue(item.subject)}
                    </td>

                    <td className="text-sm px-6 py-4">
                      {item.updated_at
                        ? moment(item.updated_at).format('dddd, D MMMM YYYY')
                        : '-'}
                    </td>
                    <td className="text-sm px-6 py-4">
                      {checkValue(item.status)}
                    </td>
                  </tr>
                )
              })}
              {!props.isLoading && props.metaData.total === 0 && (
                <NoData colSpan={6} />
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
      {showHelpRequestModal ? (
        <HelpRequestModal
          setShowModal={setShowHelpRequestModal}
          acceptModal={handleAddHelpRequest}
          isLoading={[isLoadingModal, setIsLoadingModal]}
        />
      ) : null}
    </>
  )
}

