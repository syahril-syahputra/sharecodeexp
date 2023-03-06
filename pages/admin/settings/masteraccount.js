import React from "react";

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function Account() {
  return (
    <>
      <div className="flex flex-wrap">
            <h2>My Account</h2>
      </div>
    </>
  );
}

Account.layout = Admin;
