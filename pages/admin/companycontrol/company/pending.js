import React from "react";
import Link from "next/link";
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CompanyList from "@/components/Table/CompanyControl/CompanyList";

// layout for page
import Admin from "layouts/Admin.js";

export default function PendingCompany() {
  return (
    <>
    <div className="relative">
      <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
          <input
              type="text"
              // value={search} 
              // onChange={({target}) => setSearch(target.value)}
              // onKeyDown={searchComponent}
              className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              placeholder="Search..."/>
              <Link
                  href={`/product/search`}
                  className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
              Search
          </Link>
      </div>
      <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Pending Member
                  </h3>
              </div>
              <div className="px-4 my-2">
                  <Link href="/admin/companycontrol/company/pending" className="m-1 relative bg-orange-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                      Pending</Link>
                  <Link href="/admin/companycontrol/company/rejected" className="m-1 relative bg-red-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-times text-white"></i>
                      Rejected</Link>
              </div>
          </div>
      </div>

      {/* <CompanyList /> */}
    </div>
    </>
  );
}

PendingCompany.layout = Admin;
