/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <PageSEO title="EXEpart - Term of Use" description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-36 px-5">
          <div className="justify-center text-center flex flex-wrap mb-10">
            <div className="w-full md:px-4">
              <h1 className="font-semibold text-4xl text-indigo-900">Condition of Sale</h1>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
