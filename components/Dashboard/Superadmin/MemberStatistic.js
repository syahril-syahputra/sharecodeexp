import React from "react";
import Link from "next/link";

// components
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import NoData from "@/components/Interface/Table/NoData";

export default function MemberStatistic(props) {
  const data = props.data? props.data.slice(0,5) : []
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg">
        <HeaderTable
          title="Member Statistics"
          action={
            <Link href="/admin/superadmin/statistics/memberstatistic">
              <PrimaryButton
                size="sm">
                See all
              </PrimaryButton>
            </Link>
          }
        />
        <BaseTable                 
          header={
              <>
                <th className="px-6 py-3 text-left">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left">
                  Country
                </th>
                <th className="px-6 py-3 text-left">
                  Exepart Visit
                </th>
                <th className="px-6 py-3 text-left">
                  Company Orders
                </th>
                <th className="px-6 py-3 text-left">
                  Canceled Orders
                </th>  
              </>
          }
          tableData={
            <>
              {data.map((item, index) => {
                return(
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 align-middle p-2 text-left">
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
            {data.length === 0 &&
                <NoData colSpan={5}/>
            }
            </>
          }    
          isBusy={props.isLoading}              
        />
      </div>
    </>
  );
}
