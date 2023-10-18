import React from 'react';
import Image from 'next/image';

import {PublicUrl} from '@/route/route-url';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="relative bg-top-navbar pt-8">
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
              <div className="mt-6 lg:mb-0 mb-6"></div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-6/12 px-4 ml-auto"></div>
                <div className="w-full lg:w-4/12">
                  <span className="block uppercase text-footer-resources text-sm font-semibold mb-2">
                    Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.termOfUse}
                      >
                        <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                          {<>Terms of Use</>}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.cookiePolicy}
                      >
                        <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                          {<> Cookie Policy</>}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.privacyPolicy}
                      >
                        <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                          {<> Privacy Policy</>}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.conditionOfSale}
                      >
                        <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                          {<> Terms and Conditions of Sale</>}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-slate-400 hover:text-white font-semibold block pb-2 text-sm"
                        href={PublicUrl.conditionOfExport}
                      >
                        <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                          {<>Terms and Conditions of Export</>}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-[#340135] items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-slate-400 font-semibold py-5">
                Copyright © {new Date().getFullYear()} EXEpart Electronics Inc.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
