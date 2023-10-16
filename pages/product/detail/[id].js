import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import axios from 'lib/axios'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import GlobalContext from '@/store/global-context'

// layout for page
import Admin from 'layouts/Admin.js'

// components
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import ComponentStatus from '@/components/Shared/Component/Statuses'
import NumberInput from '@/components/Interface/Form/NumberInput'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import LightButton from '@/components/Interface/Buttons/LightButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'

export default function DetailProduct({ routerParam }) {
  console.log(routerParam, '<<<routerParam')
  const [data, setData] = useState()
  console.log(data, '<<<<data')
  const [isLoading, setIsLoading] = useState(false)
  const getData = async () => {
    // product/details/exe-xls-20231012-70383614
    setIsLoading(true)
    await axios
      .get(`product/details/${encodeURIComponent(routerParam.id)}`)
      .then((response) => {
        let result = response.data?.data
        setData(result)
        setOrderQuantity(result.moq)
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [routerParam?.id])

  const [orderQuantity, setOrderQuantity] = useState(0)
  const router = useRouter()
  const setDataHandler = (input) => {
    setOrderQuantity(input.value)
  }
  const [errorInfo, setErrorInfo] = useState({})

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3 className="font-semibold text-lg text-blueGray-700">
            Product Details
          </h3>
        }
      ></PageHeader>

      <div className="">
        <div className="flex flex-wrap w-full bg-white">
          <div className="px-3 mb-6 md:mb-0 text-center">
            {data?.img ? (
              <div className="p-16 border mx-2 my-4">
                <img
                  className="object-contain mb-3 h-40 mx-auto"
                  alt={data?.Manufacturer}
                  src={publicDir + '/product_images/' + data?.img}
                />
              </div>
            ) : (
              <div className="px-3 mb-6 md:mb-0 text-center">
                <div className="p-24 border mx-2 my-4">
                  product image {data?.Manufacturer}
                </div>
              </div>
            )}
          </div>
          <div className="md:w-25 mt-5">
            <div></div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-10">
        <table className="w-50 text-sm text-left text-gray-500 bg-white">
          <tbody>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Manufacturer Part Number
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.ManufacturerNumber}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Manufacturer
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.Manufacture}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Available Quantity
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.AvailableQuantity}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                MOQ
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.moq}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.country}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.Description}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Date Code
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.dateCode}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Packaging
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data?.packaging}</td>
            </tr>
            {/* <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data?.subcategory?.category?.name}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Sub-Category
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data?.subcategory?.name}
                                </td>
                            </tr> */}
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">
                {/* <ComponentStatus
                  status={data?.status}
                  title={`stock status ${data?.status}`}
                  label={data?.status}
                /> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PrimaryWrapper>
  )
}

// DetailProduct.layout = Admin
