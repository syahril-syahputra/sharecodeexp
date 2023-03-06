import React, {useEffect, useState} from "react";
import axios from "lib/axios";

// components

// layout for page
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";

export default function AddCart() {
  const router = useRouter()
  const [manufacturerNumber, setManufacturerNumber] = useState(router.query.id_number)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const searchData = async () =>{
    setIsLoading(true)
    const response = await axios.get(`/search?query=${manufacturerNumber}`)
      .then((response) => {
        let result = response.data.data.data[0]
        setData(result)
      }).catch((error) => {
        console.log(error.response)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    searchData()
  }, [manufacturerNumber])

  return (
    <>
      <div className="relative shadow">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Add Into Cart
                  </h3>
              </div>
              {/* <div className="px-4 mt-2">
                  <Link href="/admin/product/myproduct/add" className="relative bg-blueGray-700 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                      Add Product</Link>
              </div> */}
          </div>
        </div>

        <div className="">
          <div className="flex flex-wrap mb-6 bg-white">
            <div className="md:w-25 px-3 mb-6 md:mb-0">
              <div className="p-24 border mx-2 my-4">{manufacturerNumber}</div>
            </div>
            <div className="md:w-75 px-3 mb-6 md:mb-0">
              <div className="p-5 border mx-2 my-4">
                <div className="mb-5 ">
                  <div className="relative overflow-x-auto shadow">
                    <table className={`text-sm text-left text-gray-500 shadow-md`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Country
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Available Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  MOQ
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Manufacturer Number
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Description
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                  Date Code
                              </th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 uppercase bg-white">
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {data.country}
                                </th>
                                <td className="px-6 py-4">
                                    {data.AvailableQuantity}
                                </td>
                                <td className="px-6 py-4">
                                    {data.moq}
                                </td>
                                <td className="px-6 py-4">
                                    {data.ManufacturerNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {data.Description}
                                </td>
                                <td className="px-6 py-4">
                                    {data.dateCode}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                <button className="px-6 py-2 uppercase bg-blueGray-700 text-white font-bold">QTY</button>
                <button className="px-6 py-2 uppercase bg-blueGray-700 text-white font-bold">Add</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

AddCart.layout = Admin;
