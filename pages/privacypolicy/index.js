/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'
import axios from "lib/axios";

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-36">
          <div className="justify-center text-center flex flex-wrap mb-10">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl text-indigo-900">Privacy & Policy</h2>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Privacy</h3>
            <div className="">
              <p className="mb-2">These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.</p>
              <p className="mb-2">By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</p>
              <p className="mb-2">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Policy</h3>
            <div className="">
              <p className="mb-2">These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.</p>
              <p className="mb-2">By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</p>
              <p className="mb-2">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Other</h3>
            <div className="">
              <p className="mb-2">Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
              <p className="mb-2">You warrant and represent that:</p>
              <div className="mb-2">
                <ul className="list-disc ml-5">
                  <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                  <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
