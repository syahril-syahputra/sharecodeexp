import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

const UserDropdown = () => {
  // dropdown props
  const router = useRouter()
  const session = useSession()
  const [user, setUser] = useState({
    name: '...'
  })
  useEffect(() => { setUser({name: session.data?.name}) }, [session])

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          {/* <div className="text-black"> */}
            
            <button
                className="bg-indigo-900 text-white active:bg-blueGray-600 text-xs font-bold px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 ease-linear transition-all duration-150"
                type="button"
                >
                <i className="fas fa-user mr-2"></i> 
                Hi, {user?.name}
            </button>
          {/* </div> */}
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Setting
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => {
            signOut({
              callbackUrl: `${window.location.origin}`
            });
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
