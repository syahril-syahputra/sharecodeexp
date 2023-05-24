import React, { useEffect, useContext } from "react";
import { createPopper } from "@popperjs/core";
import { useSession, signIn, signOut } from "next-auth/react"

import GlobalContext from "@/store/global-context";

const UserDropdown = () => {
  const session = useSession()

  const {
    username, 
    loadUsername
  } = useContext(GlobalContext)

  useEffect(() => {
    loadUsername(session.data.accessToken)
  }, [])

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
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <div className="md:text-white">
            {username}
          </div>
        </div>
      </a>
    </>
  );
};

export default UserDropdown;
