import React from "react";

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import TableProduct from "components/Table/TableProduct"

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct() {
  return (
    <>
      <div className="">
        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
          {/* <CardLineChart /> */}
            <TableProduct></TableProduct>
        {/* </div> */}
      </div>
    </>
  );
}

MyProduct.layout = Admin;
