import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react"

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  const session = useSession()
  const [userDetail, setUserDetail] = useState()
  useEffect(() => { 
    setUserDetail(session.data?.user.userDetail) 
  }, [session])

  return (
    <>
      {/* Navbar */}
      <nav className="mt-2 absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {userDetail?.role_id === 1 ? 
              'STAFF ONLY'
            : 'MEMBER AREA' }
          </a>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
