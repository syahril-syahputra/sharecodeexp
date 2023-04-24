import React from "react";
import Link from "next/link";
// components

export default function MemberStatistic(props) {
  const data = props.data.slice(0, 5)
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg">
        <div className="mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Member Statistics
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link href="/admin/superadmin/statistics/memberstatistic">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Company Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Country
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Exepart Visit
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Company Orders
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Canceled Orders
                </th>                
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                  return(
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {item.name}
                        </td>
                        <td className="px-6 py-4">
                            {item.country}
                        </td>
                        <td className="px-6 py-4">
                            {item.visitors_count}
                        </td>
                        <td className="px-6 py-4">
                            {item.total_completed}
                        </td>
                        <td className="px-6 py-4">
                            {item.total_cancelled}
                        </td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {props.isLoading &&<div>
          <div className='text-center my-auto mt-10'>
              <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
          </div>
      </div>}
    </>
  );
}
