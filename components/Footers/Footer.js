import React from "react";
import Image from "next/image";

import { PublicUrl } from "@/route/route-url";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-indigo-900 pt-8 pb-6 mb-0">

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative">
                <Image
                  src="/img/exepart-white.png"
                  alt="Picture of the author"
                  height={300}
                  width={300}
                  className="mx-auto lg:mx-0"
                />
              </div>
              <h5 className="text-lg mt-0 mb-2 text-slate-400">
                M2M Excess Stock Management
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">

              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-6/12 px-4 ml-auto">

                </div>
                <div className="w-full lg:w-4/12">
                  <span className="block uppercase text-white text-sm font-semibold mb-2">
                    Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.termOfUse}
                      >
                        Terms of Use
                      </Link>
                    </li>  
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.cookiePolicy}
                      >
                        Cookie Policy
                      </Link>
                    </li>                  
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.privacyPolicy}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.conditionOfSale}
                      >
                        Terms and Condition of Sale
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.conditionOfExport}
                      >
                        Terms and Condition of Export
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.contactUs}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-slate-400 font-semibold py-1">
                Copyright © {new Date().getFullYear()} EXEpart powered by {" "}
                <a
                  href="https://bluespacesystems.com/"
                  className="text-slate-400 hover:text-white"
                >
                  BlueSpace Systems
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
