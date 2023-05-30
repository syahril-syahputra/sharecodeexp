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
              <h1 className="font-semibold text-4xl text-indigo-900">Terms and Condition of Export</h1>
            </div>
          </div>
          <div className="mb-10">
            <div className="text-justify">
              <div className="mb-2">
                <p className="mb-2 font-bold">
                  A. Limits on use of the Product
                </p>
                <p className="mb-2">
                  The products offered by [Venatronics LLC. OR other EXEPART entity], its subsidiaries, or affiliates ("Seller") are not intended for and, by ordering them, you agree that they will not be used in life support systems, human implantation, nuclear facilities or systems, or any other application where product failure could result in loss of life or significant property damage. In the event of a breach of this agreement, you agree to indemnify Seller and hold Seller harmless against any loss, cost, or damage incurred because of such breach.
                </p>
              </div>
              <div className="mb-2">
                <p className="mb-2 font-bold">
                  B. Compliance with the law
                </p>
                <p className="mb-2">
                  You acknowledge that the commodities, software, and/or technology you purchase or receive from Seller may be subject to export, re-export, or other restrictions under the laws of the country of manufacture, the country of the seller/distributor, and the country in which you reside. Therefore, on behalf of yourself and your subsidiaries and affiliates (collectively referred to as "Customer"), you agree to comply with all applicable laws and regulations regarding the export and re-export of such commodities, software, and/or technology, as well as their direct products related to goods obtained by Customer. In particular:
                </p>
                <p className="mb-2">
                  Customer understands that, according to 22 CFR 122 U.S. International Traffic in Arms Regulation ("ITAR"), all manufacturers, exporters, and brokers of U.S.-origin defense articles, defense services, or related technical data defined on the U.S. Munitions List (USML) must register with the U.S. Department of State Directorate of Defense Trade Controls (DDTC).
                </p>
                <p className="mb-2">
                  Customer understands that U.S. origin commodities, software, and/or technology exported from the U.S., as well as foreign-manufactured products containing more than de-minimis (i.e., 10%) U.S.-origin content, require U.S. re-export authorization under the U.S. Export Administration Regulations ("EAR"). In the case of re-export, Customer will ensure that all necessary permissions, such as export licenses and permits, are obtained by the exporter. This also includes export authorizations for deemed exports (as defined in EAR §734.2 and ITAR §120.17) to foreign individuals. Furthermore, Customer understands that any re-export of U.S.-origin ITAR controlled items or foreign-produced end-items incorporating U.S.-origin ITAR controlled components requires re-export authorization from the U.S. Department of State DDTC.
                </p>
                <p className="mb-2">
                  Customer certifies that the commodities, software, and/or technology will not be used, sold, re-exported, or incorporated into products used directly or indirectly in the design, development, production, stockpiling, or use of chemical or biological weapons, nuclear programs, missiles, and maritime nuclear propulsion projects unless authorized under applicable laws and regulations concerning the manufacture, export, and/or re-export of such items.
                </p>
                <p className="mb-2">
                  Customer certifies that the commodities, software, and/or technology will not be used, sold, re-exported, or incorporated into products for use by military, police, or intelligence entities, space applications, or foreign vessels or aircraft, unless authorized under applicable laws and regulations concerning the manufacture, export, and/or re-export of such items.
                </p>
                <p className="mb-2">
                  Customer certifies that the commodities, software, and/or technology will not be used, sold, re-exported, or incorporated into products for the benefit of individuals or entities listed on any United States denied or restricted party list, including the Entity List at Part 744 of the Export Administration Regulations, individuals designated by the U.S. government as Specially Designated Global Terrorists (SDGTs), Specially Designated Terrorists (SDTs), Foreign Terrorist Organizations (FTOs) on the Specially Designated National (SDN) list, or any other relevant government denied or restricted party list.
                </p>
                <p className="mb-2">
                  Customer certifies that the commodities, software, and/or technology will not be exported or re-exported directly or indirectly, diverted, or transshipped to or through any country in violation of any United Nations, United States, European Union, or other applicable embargo, nor shipped or moved to a Free Trade Zone/Area unless authorized under applicable laws and regulations.
                </p>
                <p className="mb-2">
                  Customer certifies that it is not an embassy, agency, subdivision of, or otherwise affiliated with a non-U.S. government.
                </p>
                <p className="mb-2">
                  Customer agrees that when requested by Seller, it will provide Seller with an end-use/user statement in a form and substance acceptable to Seller, certifying the intended use of the relevant commodities, software, and/or technology.
                </p>
                <p className="mb-2">
                  Customer certifies that if it is unable to fulfill the aforementioned certifications or if any of the information provided in this document changes at any time, it will notify Seller of the changes in writing before placing further orders. This certification shall remain valid even after the termination of the relationship between Customer and Seller.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
