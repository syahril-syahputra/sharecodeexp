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
              <h1 className="font-semibold text-4xl text-indigo-900">Exhibit A. Terms of Use</h1>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="font-semibold text-xl text-center">Exhibit A. Terms of Use</h2>
            <div className="text-justify">
              <p className="mb-2">
                These Terms set forth the terms and conditions that govern the use of the Exepart website (referred to as the "Site"). By accessing or visiting the Site, you expressly agree to comply with these Terms and all applicable laws and regulations governing the Site. Exepart Electronics, Inc., its subsidiaries, and/or affiliates ("Exepart") reserve the right to modify these Terms at any time, effective immediately upon posting on the Site. If you violate these Terms, Exepart may terminate your use of the Site, restrict your future access, and/or take appropriate legal action against you. You acknowledge that Exepart owns all intellectual property rights to the content and software on the Site.
              </p>
              <p className="mb-2">
              If you have any comments, questions, or requests, please contact us at <a href="mailto:support@exepart.com" className="text-blue-500 underline">support@exepart.com</a>.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Links & Search Results</h3>
            <div className="text-justify">
              <p className="mb-2">
                When using the Site to search for information or to link to other websites, you acknowledge and accept that Exepart bears no responsibility for any damages or losses that may arise from such activities. You understand that Exepart cannot be held liable for any consequences resulting from your use of the Site to obtain search results or access external websites.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Access & Interference</h3>
            <div className="text-justify">
              <p className="mb-2">
                You acknowledge and agree that you will not engage in any activities that could compromise or disrupt the proper functioning of the Site. This includes, but is not limited to, using any automated tools or processes such as robots or spiders to monitor or copy our web pages, accessing or capturing data without prior permission from Exepart, or interfering with the Site's operations using any device, software, or routine. You further agree not to take any actions that would impose an excessive or unreasonable burden on our infrastructure. Additionally, you are prohibited from copying, reproducing, modifying, creating derivative works, or publicly displaying any content from our website without obtaining prior written permission from Exepart, unless it is for your personal, non-commercial use.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Permitted Use</h3>
            <div className="text-justify">
              <p className="mb-2">
                By accessing this Site, you acknowledge and agree that your use is limited to viewing and browsing the pages for personal purposes only. You are expressly prohibited from duplicating, publishing, modifying, or distributing the material on this Site for any other purpose unless specifically authorized. Your use of the Site is subject to applicable laws, including export and re-export laws and regulations. The software and content posted by Exepart on the Site are owned by Exepart and/or its suppliers and are protected by U.S. and international copyright laws.
              </p>
              <p className="mb-2">
                You agree not to remove, obscure, or alter any legal notices displayed on the Site. Furthermore, you agree not to use the Site in connection with promoting any products, services, or materials. You shall not use the Site in a manner that violates any laws, regulations, or the rights of any person, including intellectual property rights, privacy rights, or personality rights. Additionally, you shall refrain from posting any information that disparages or defames any person or entity.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Accounts</h3>
            <div className="text-justify">
              <p className="mb-2">
                Certain features and services on this Site may require you to have an Exepart Account. You or your employer ("Customer") can create your own Exepart Account, or one may be assigned to you by Exepart. It is the sole responsibility of the Customer to maintain the security of the IDs and passwords associated with the Account. Customer must ensure that these credentials are not shared with anyone other than their own employees, and employees must not share their assigned IDs or passwords with anyone else, except within the Customer's organization. If the Customer wishes to revoke access for an employee, they must immediately notify Exepart, and Exepart will invalidate the ID and password. If requested by the Customer, Exepart will provide replacements. If you suspect that someone else has knowledge of or has changed your password, please reset it to prevent unauthorized access to your account.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Unauthorized Use of the Site</h3>
            <div className="text-justify">
              <p className="mb-2">
                Any illegal or unauthorized use of the Site, including but not limited to unauthorized framing or linking to the Site, or the unauthorized use of any robot, spider, or automated device on the site, will be thoroughly investigated. Appropriate legal action, including civil, criminal, and injunctive measures, will be taken as necessary. By using the Site, you agree to comply with all security processes and procedures, such as password protection, as specified by Exepart. Furthermore, you agree not to access or attempt to access any areas of the Site that are not intended for general public access, unless you have obtained written authorization from Exepart.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">User Content</h3>
            <div className="text-justify">
              <p className="mb-2">
                The Site provides you with the ability to create and submit content. However, you must ensure that the content or information you share on this system does not violate any laws or infringe upon the rights of third parties. For instance, any information that is subject to the International Traffic in Arms Regulations (ITAR) or Export Administration Regulations (EAR) should not be placed or transmitted through this system.
              </p>
              <p className="mb-2">
                By entering, uploading, or submitting content to the Site, you grant Exepart a worldwide license to use, host, store, reproduce, modify, communicate, and distribute such content. This license remains in effect even if you no longer use our Site (e.g., content posted in a forum). Exepart reserves the right to delete or remove any content you provide. You represent and warrant that you possess the necessary rights to grant Exepart this license for all content submitted to the Site.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Violation of the Terms</h3>
            <div className="text-justify">
              <p className="mb-2">
                You acknowledge and agree that Exepart, at its sole discretion and without prior notice, may terminate your access to the Site or pursue any other available remedy if Exepart believes that your use of the Site is (i) inconsistent with these Terms or (ii) infringes upon the rights of Exepart, another user, or the law. You understand that monetary damages may not sufficiently compensate Exepart for such violations, and therefore, you consent to the granting of injunctive or other equitable relief in response to such violations. In certain circumstances, Exepart may disclose user information about you if required by law or subpoena, or if it is necessary or appropriate to address unlawful or harmful activities.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Copyright</h3>
            <div className="text-justify">
              <p className="mb-2">
                Unless otherwise stated, Exepart owns the copyrights to all copyrightable subject matter on the Site or uses them lawfully. Subject to the rights of third parties and any specific terms provided elsewhere, Exepart grants you permission to copy or download information and materials (including related graphics) from the Site under the following conditions:
              </p>
              <p className="mb-2">
                The materials are for internal use only.
              </p>
              <p className="mb-2">
                Any copies of materials or portions thereof must include the copyright notice specified on the Site.
              </p>
              <p className="mb-2">
                You are not permitted to copy or display any portion of the content for redistribution to third parties without the prior written permission of Exepart. Documents posted on the Site may contain additional proprietary notices or describe products, services, processes, or technologies owned by Exepart or third parties. Nothing in this statement should be interpreted as granting the user a license, either explicitly or implicitly, under any copyright, trademark, patent, or other intellectual property right of Exepart or any third party.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Limitation of Liability</h3>
            <div className="text-justify">
              <p className="mb-2">
                By using this Site and the Internet in general, you acknowledge and accept all responsibility and risk associated with such use. In no event shall Exepart be liable for any direct, special, indirect, or consequential damages, or any damages whatsoever, including but not limited to loss of use, data, or profits, regardless of the form of action, be it contract, negligence, or any other tortious action, arising out of or in connection with the use of this Site. Exepart does not provide any warranty regarding the accuracy, completeness, or currency of the content. It is your responsibility to verify any information before relying on it. The content of this Site may contain technical inaccuracies or typographical errors. Periodically, changes are made to the content provided herein.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Trademark</h3>
            <div className="text-justify">
              <p className="mb-2">
                The Exepart name and logo, along with all associated product and service names, design marks, and slogans, are trademarks, service marks, or registered trademarks owned by Exepart. They cannot be used in any way without the prior written consent of Exepart. Other product and service marks mentioned on the Site are the trademarks of their respective owners.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Warranty Disclaimer</h3>
            <div className="text-justify">
              <p className="mb-2">
                Exepart does not guarantee that the Site or any services provided hereunder will be error-free, uninterrupted, or provide specific results from the use of the Site or any content, search, or link on it. Access to the Site, including any information or materials therein, is provided on an "as is" basis, without warranties of any kind, either express or implied. This includes, but is not limited to, warranties of title, non-infringement, or implied warranties of merchantability or fitness for a particular purpose. No advice or information given by Exepart, its affiliates, or their respective employees shall create any warranty. Neither Exepart nor its affiliates warrant that the information or materials on any Site, or access to them, will be uninterrupted or error-free.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Disputes</h3>
            <div className="text-justify">
              <p className="mb-2">
                In the event of any dispute regarding or arising from the Site, by using the Site, you agree that the dispute will be subject to the laws of the State of California, regardless of its conflict of law provisions. You also agree to submit to the personal jurisdiction and venue of the state and federal courts located in Orange County, California.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Indemnity</h3>
            <div className="text-justify">
              <p className="mb-2">
                You agree to indemnify and hold Exepart, its officers, agents, partners, and employees harmless from any loss, liability, claim, or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Site. This includes your use of the Site to provide a link to another site or to upload content or other information to the Site.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Outbound Linking Policy Statement - User Policy</h3>
            <div className="text-justify">
              <p className="mb-2">
                Any link (including hyperlinks, buttons, or referral devices of any kind) found on this or any other Exepart web page is provided for the convenience and use of the visitor. The presence of a link on this or any Exepart web page does not imply an endorsement, recommendation, or certification by Exepart. It should not be interpreted as suggesting any relationship between the linked site and Exepart.
              </p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-xl text-center">Inbound Linking Policy Statement - User Policy</h3>
            <div className="text-justify">
              <p className="mb-2">
                Exepart generally permits links to Exepart websites from third-party sites, subject to certain conditions:
              </p>
              <div className="mb-2">
                <ul className="list-disc ml-5">
                  <li>
                    Unless a specific written agreement is entered into with Exepart, you are not allowed to use Exepart's names, logos, designs, slogans, product trademarks, or service marks in or with your links. However, you may link to an Exepart site using the plain text name of that site or the plain text name of Exepart.
                  </li>
                  <li>
                    The link to Exepart's site should not suggest any relationship, affiliation, endorsement, sponsorship, or recommendation by Exepart. You must not use Exepart's names, logos, designs, slogans, product trademarks, or service marks in any advertising, publicity, promotion, or any other commercial manner without prior express written permission from Exepart for a specific use.
                  </li>
                  <li>
                    Link only to the home page, first page, or registration page of this site and do not incorporate any content from this site into your site, such as in-lining or framing.
                  </li>
                  <li>
                    Do not use Exepart's names, logos, designs, slogans, product trademarks, service marks, or any other identifying words or codes associated with Exepart's websites in any "meta tag" or other information used by search engines or other information location tools to identify and select sites, unless you have obtained Exepart's express written permission for a specific use.
                  </li>
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
