import React from "react";
import Link from "next/link";

// components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import LoginButton from "./LoginButton";

export default function Navbar(props) {
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <div className="relative object-center">
            <ImageLogo
              size={100}
            />
          </div>
        </Link>
        {!props.hideLogin && <LoginButton/> }        
      </div>
    </nav>
  )
}
