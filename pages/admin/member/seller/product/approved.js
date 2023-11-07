import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'

// layout for page
import Admin from 'layouts/Admin.js'

// components
import ComponentList from '@/components/Table/Member/Components/ComponentsList'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import {
  BaseModalLarge,
  BaseModalMedium,
} from '@/components/Interface/Modal/BaseModal'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import Link from 'next/link'

export default function MyProduct({ session, notification }) {
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [metaData, setMetaData] = useState({
    total: 0,
    perPage: 0,
    lastPage: 0,
  })
  const [listLowProduct, setlistLowProduct] = useState(false)

  const [search, setSearch] = useState('')
  async function searchData(searchParam = '', page = 1) {
    setSearch(searchParam)
    setIsLoading(true)
    const response = await axios
      .get(
        `/companyproduct?page=${page}&status=approved&search=${searchParam}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        let result = response.data.data
        setData(result.data)
        setLinks(result.links)
        setMetaData({
          total: result.total,
          perPage: result.per_page,
          lastPage: result.last_page,
          currentPage: result.current_page,
          nextPage: result.next_page_url ? true : false,
          prevPage: result.prev_page_url ? true : false,
        })
      })
      .catch((error) => {
        setData([])
        toast.error(
          'Something went wrong. Cannot load component.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const setPage = (pageNumber) => {
    searchData(search, pageNumber)
  }
  useEffect(() => {
    searchData()
  }, [])
  const handleSearch = (searchResult) => {
    searchData(searchResult)
  }

  return (
    <>
      <div className="mb-10">
        <div className="mb-5 w-full lg:w-1/2">
          <MiniSearchBar searchItem={handleSearch} />
        </div>
        {notification.data.count > 0 && (
          <InfoNotification
            message={notification.data.notification}
            detail={
              <a
                onClick={() => setlistLowProduct(true)}
                className="text-blue-500 text-xs block mt-1 italic underline hover:text-blue-300 cursor-pointer"
              >
                Show Product
              </a>
            }
          ></InfoNotification>
        )}
        {notification.data.count > 0 && listLowProduct && (
          <BaseModalLarge
            title="List product with low quantity"
            onClick={() => setlistLowProduct(false)}
            body={
              <table className="w-full bg-gray-400 border text-xs ">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">No</th>
                    <th className="p-2">Part Number</th>
                    <th className="p-2">Available Quantity</th>
                    <th className="p-2">Country</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notification.data.products.map((product, number) => (
                    <tr
                      key={number}
                      className="border-b text-center border-gray-200 hover:bg-gray-50 "
                    >
                      <td className="p-1 bg-white">{number + 1}</td>
                      <td className="p-1 bg-white">{product.part_number}</td>
                      <td className="p-1 bg-white">
                        {product.available_quantity}
                      </td>
                      <td className="p-1 bg-white">{product.country}</td>
                      <td className="p-1 bg-white">
                        <Link
                          href={`/admin/member/seller/product/details/${product.slug}`}
                        >
                          <PrimaryButton size="sm">View</PrimaryButton>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          ></BaseModalLarge>
        )}
        <ComponentList
          title="My Products"
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          links={links}
          metaData={metaData}
        ></ComponentList>
      </div>
    </>
  )
}

MyProduct.layout = Admin

const fetchNotification = async (token) => {
  try {
    const response = await axios.get(`/seller/product/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const data = await fetchNotification(session.accessToken)

  return {
    props: {
      session,
      notification: data,
    },
  }
}
