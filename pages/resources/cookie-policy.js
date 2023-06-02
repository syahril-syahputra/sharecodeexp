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
              <h1 className="font-semibold text-4xl text-indigo-900">Cookie Policy</h1>
            </div>
          </div>
          <p className="mb-2">
            Effective Date: June 1st, 2023.
          </p>
          <div className="mb-10">
            <div className="text-justify">
              <p className="mb-2">
                Venatronics LLC or Exepart ("Exepart," "we," or "our") and any of our subsidiary and/or digital property websites utilize cookies to distinguish you from other users of our website. This enables us to provide you with a high-quality website experience and allows us to enhance our site. By continuing to browse the site or agreeing to this cookie policy, you consent to our use of cookies.
              </p>
              <p className="mb-2">
                A cookie is a small file consisting of letters and numbers that we store on your browser or the hard drive of your computer, if you agree. Cookies contain information that is transferred to your computer's hard drive.
              </p>
              <p className="mb-2">
                Cookies and tracking devices used on exepart.com are categorized by function as follows:
              </p>
              <ul className="list-disc ml-5">
                <li>
                  Strictly necessary cookies: These cookies are essential for the operation of our website. They enable you to log into secure areas of our website, use a shopping cart, or utilize e-billing services.
                </li>
                <li>
                  Analytical/performance cookies: These cookies allow us to recognize and count the number of visitors and see how visitors navigate our website. This helps us improve the functionality of our website by ensuring that users easily find the information they are seeking.
                </li>
                <li>
                  Functionality cookies: These cookies are used to recognize you when you revisit our website. They enable us to personalize the content for you, address you by name, and remember your preferences, such as your choice of language or region.
                </li>
                <li>
                  Targeting cookies: These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests. Additionally, we may share this information with third parties for this purpose.
                </li>
              </ul>
              <p className="mb-2">
                Cookies can also be categorized based on their duration. There are two main categories:
              </p>
              <ul className="list-disc ml-5">
                <li>
                  Persistent cookies: These cookies remain on your device until they are manually or automatically deleted.
                </li>
                <li>
                  Session cookies: These cookies remain on your device until you close your browser, at which point they are automatically deleted.
                </li>
              </ul>
              <p className="mb-2">
                We use both persistent and session cookies. Our persistent cookies have a maximum duration of one (1) year.
              </p>
              <p className="mb-2">
                Information collected by our cookies includes details about your website usage. Additionally, we may collect your IP address as a logged file. An IP address is the number assigned to your device (e.g., laptop or mobile phone) when it accesses the internet.
              </p>
              <p className="mb-2">
                To the extent that IP addresses are considered personal data under applicable data protection law, we treat them as such. If we link information collected through cookies with any personal data you provide to us through the website (e.g., by submitting a form), we also treat that information as personal data. For more information on how we handle personal data collected through the site, please refer to our Privacy Policy.
              </p>
              <p className="mb-2 font-bold">
                Managing cookies in your browser:
              </p>
              <p className="mb-2">
                Most modern browsers offer the following options for managing cookies:
              </p>
              <ul className="list-disc ml-5">
                <li>
                  View and delete individual cookies
                </li>
                <li>
                  Block third-party cookies
                </li>
                <li>
                  Block cookies from specific websites
                </li>
                <li>
                  Block all cookies 
                </li>
                <li>
                  Delete all cookies upon closing the browser
                </li>
              </ul>
              <p className="mb-2">
                Please note that deleting cookies will result in the loss of any preferences you have set, including opt-out preferences, as they are stored in cookies. Additionally, blocking cookies completely may result in many websites not functioning properly or certain functionalities being disabled. We do not recommend disabling cookies when using our website and services for the reasons.
              </p>
              <p className="mb-2">
                If you are primarily concerned about third-party cookies generated by advertisers, you can manage them separately.
              </p>
              <p className="mb-2 font-bold">
                Third-party cookies and tracking devices:
              </p>
              <p className="mb-2">
                While visiting exepart.com or any related property website, you may come across content from other websites, such as videos from YouTube or links to maps using Google Maps. We occasionally include this content to enhance the user experience. As a result, you may receive cookies from these third-party websites. Please note that we do not control these cookies, and we suggest checking the respective third-party websites for more information about the cookies they use and how to manage them.
              </p>
              <p className="mb-2 font-bold">
                Managing advertising cookies:
              </p>
              <p className="mb-2">
                Opting out of targeted advertising cookies does not mean you will receive fewer ads when using our services. However, the ads you see may be less relevant or customized to your interests.
              </p>
              <p className="mb-2">
                If you wish to opt out of third-party advertising cookies, you can visit the Interactive Advertising Bureau's website at www.youronlinechoices.com. This website provides a list of all ad-serving cookies currently set on your device and offers instructions on how to opt out of each of them. Please note that this website lists more networks than those used on <a href="https://exepart.com" className="text-blue-500 underline">exepart.com</a>.
              </p>
              <p className="mb-2">
                Please remember that if you choose to opt out of targeted advertising from a specific company or via www.youronlinechoices.com, the opt-out only applies to the web browser on the device you are using. To exercise the same choice on other devices or different web browsers, you need to follow the same process.
              </p>
              <p className="mb-2 font-bold">
                Further information about cookies:
              </p>
              <p className="mb-2">
                If you want to learn more about cookies in general and how to manage them, visit <a className="text-blue-500 underline" href="www.allaboutcookies.org">www.allaboutcookies.org</a>.
              </p>
              <p className="mb-2 font-bold">
                Cookie Policy Updates:
              </p>
              <p className="mb-2">
                If we make changes to this Cookie Policy, we will post the updated version on this page and indicate the modification date above. In the event of material changes, we will provide a notice before implementing the changes, including the effective date of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
