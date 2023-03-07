import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";

// layout for page
import Admin from "layouts/Admin.js";

export default function Company() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
      </div>
    </>
  );
}

Company.layout = Admin;
