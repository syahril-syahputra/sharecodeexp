import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components

export default function TableProduct(props) {
  return (
    <>  
        <div className="relative">
            <div className="mb-0 px-4 py-3 border-0 bg-white">
                <div className="flex justify-between">
                    <div className="px-4">
                        <h3
                        className={
                            "font-semibold text-lg text-blueGray-700"
                        }
                        >
                        My Product
                        </h3>
                    </div>
                    <div className="px-4">
                        <Link href="/admin/product/myproduct/add" className="relative bg-blueGray-700 p-2 text-white">
                            <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                            Add Product</Link>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow">
                <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Company Sector
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Manufacture Part Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Avaliable Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Date Code
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                *
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-gray-700 uppercase bg-white">
                        <tr>
                            <td scope="col" className="px-6 py-3 text-center">
                                Country
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Company Sector
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Manufacture Part Number
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Description
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Package
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Packaging
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Avaliable Quantity
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Date Code
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                *
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" className="px-6 py-3 text-center">
                                Country
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Company Sector
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Manufacture Part Number
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Description
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Package
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Packaging
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Avaliable Quantity
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Date Code
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                *
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  );
}