import React from "react";

// components
import TableCart from "components/Table/TableCart"

// layout for page
import Admin from "layouts/Admin.js";

export default function MyCart() {
  return (
    <>
      <div className="">
        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
          {/* <CardLineChart /> */}
            <TableCart></TableCart>
        {/* </div> */}
      </div>
    </>
  );
}

MyCart.layout = Admin;
