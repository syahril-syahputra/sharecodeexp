import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NeedLoginModal from '@/components/Modal/NeedLogin/NeedLogin'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import BaseTable from '@/components/Interface/Table/BaseTable'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import NoData from '@/components/Interface/Table/NoData'
import MetaData from '@/components/Interface/Table/MetaData'
import Pagination from '@/components/Shared/Component/Pagination'
import DetailProdutModal from '@/components/Modal/DetailProdutModal/DetailProdutModal'
import { checkValue } from '@/utils/general'
import DarkButton from '@/components/Interface/Buttons/DarkButton'
import BaseTableDark from '@/components/Interface/Table/BaseTableDark'
import PaginationDark from '@/components/Shared/Component/PaginationDark'
import Link from 'next/link'

export default function TableComponentDark(props) {
  const { status } = useSession()
  const router = useRouter()
  const [isInquiryClicked, setIsInquiryClicked] = useState(false)
  const [isDetailClicked, setIsDetailClicked] = useState(false)
  const [slugState, setSlugState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState({ id: 0 })
  const [cartLoadingDetail, setCartLoadingDetail] = useState({
    id: 0,
    slug: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const inquiryItem = (item) => {
    if (status === 'unauthenticated') {
      setShowModal(true)
      setSlugState(item)
      setIsInquiryClicked(false)
    }

    if (status === 'authenticated') {
      router.push(`/admin/member/buyer/product/details/${item}`)
    }
  }

  const detailItem = () => {
    if (status === 'unauthenticated') {
      setShowModalDetail(true)
      setIsDetailClicked(false)
    }
  }

  return (
    <>
      <PrimaryWrapper>
        <BaseTableDark
          isBusy={props.isLoading}
          header={
            <>
              <th scope="col" className="px-6 py-3">
                Part Number
              </th>
              <th scope="col" className="px-6 py-3">
                Sector
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-8 py-3">
                Available Quantity
              </th>
              <th scope="col" className="px-8 py-3">
                MOQ
              </th>
              <th scope="col" className="px-6 py-3">
                Stock Location
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
                    key={item?.id + `${index}`}
                    className="bg-white  border-b last:border-b-0 border-black hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.ManufacturerNumber}
                    </th>
                    <th className="px-6 py-4">
                      {checkValue(item.company?.sector)}
                    </th>
                    <td className="px-6 py-4">{item.Manufacture}</td>
                    <td className="px-6 py-4">{item.Description}</td>
                    {(item?.AvailableQuantity === null ||
                      item?.AvailableQuantity === 0) &&
                    (item?.moq === null || item?.moq === 0) ? (
                      <>
                        <td className="px-8">Out of Stock</td>
                      </>
                    ) : (
                      <>
                        <td className="px-8 py-4">{item.AvailableQuantity}</td>
                      </>
                    )}
                    {(item?.AvailableQuantity === null ||
                      item?.AvailableQuantity === 0) &&
                    (item?.moq === null || item?.moq === 0) ? (
                      <>
                        <td className="px-8">Out of Stock</td>
                      </>
                    ) : (
                      <>
                        <td className="px-8 py-4">{item.moq}</td>
                      </>
                    )}
                    <td className="px-6 py-4">{item.country}</td>
                    <td className="px-6 py-4  text-right flex-nowrap whitespace-nowrap">
                      <div
                        className={`items-center space-x-2 ${
                          status === 'unauthenticated' ? 'flex-1 space-x-2' : ''
                        }`}
                      >
                        <Link href={'/product/detail/' + item.slug}>
                          <DarkButton id={item?.id} key={item?.id} size="sm">
                            Detail
                          </DarkButton>
                        </Link>
                        <DarkButton
                          id={item?.id}
                          key={item?.id}
                          disabled={
                            isInquiryClicked ||
                            item?.AvailableQuantity === 0 ||
                            item?.AvailableQuantity === null ||
                            item?.AvailableQuantity === undefined
                          }
                          size="sm"
                          onClick={async () => {
                            setIsInquiryClicked(true)
                            setCartLoading((previouse) => ({
                              ...previouse,
                              id: item.id,
                            }))
                            inquiryItem(item.slug)
                          }}
                        >
                          {cartLoading?.id === item?.id ? (
                            <i className="px-3 fas fa-hourglass fa-spin"></i>
                          ) : (
                            'Inquire'
                          )}
                        </DarkButton>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!props.isLoading && props.metaData.total === 0 && (
                <NoData colSpan={10}>Component not found</NoData>
              )}
            </>
          }
        ></BaseTableDark>
        {/* {!props.isLoading && props.metaData.total > 0 ? (
          <MetaData total={props.metaData.total} perPage={props.data.length} />
        ) : null} */}
      </PrimaryWrapper>
      <PaginationDark
        links={props.links}
        metaData={props.metaData}
        setPage={props.setPage}
      />
      {showModal ? (
        <NeedLoginModal
          setShowModal={setShowModal}
          item={slugState}
          isLoading={[isLoading, setIsLoading]}
          setCartLoading={setCartLoading}
        />
      ) : null}
      {showModalDetail ? (
        <DetailProdutModal
          setShowModal={setShowModalDetail}
          item={cartLoadingDetail?.slug}
        />
      ) : null}
    </>
  )
}
