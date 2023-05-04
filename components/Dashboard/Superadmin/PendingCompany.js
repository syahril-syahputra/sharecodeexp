import React from "react";
import Link from "next/link";

// components
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";

export default function PendingCompany(props) {
  const data = props.data.slice(0, 5)
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg">
        <HeaderTable
          title="Pending Company Registry"
          action={
            <Link href="/admin/superadmin/registry/pendingcompany">
              <PrimaryButton
                size="sm">
                See all
              </PrimaryButton>
            </Link>
          }
        />
        <div className="text-center w-full mx-auto">
          <BaseTable                 
            header={
                <>
                  <th className="px-6 py-3 text-left">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left">
                    Country
                  </th>
                  <th className="px-6 py-3 text-right min-w-140-px">*</th>
                </>
            }
            tableData={
              <>
                {data.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <th className="px-6 align-middle p-2 text-left">
                        {item.name}
                      </th>
                      <td className="px-6 align-middle p-2">
                        {item.country}
                      </td>
                      <td className="px-6 align-middle p-2 text-right">
                        <Link href={`/admin/superadmin/registry/company/${item.id}`}>                      
                          <SecondaryButton size="sm">Review Docs</SecondaryButton>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </>
            }    
            isBusy={props.isLoading}              
          />
        </div>
      </div>
    </>
  );
}
