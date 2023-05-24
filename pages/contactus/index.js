/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import { Router, useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from "lib/axios";

//components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import InputForm from "@/components/Shared/InputForm";
import ErrorInput from '@/components/Shared/ErrorInput';
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import TextInput from "@/components/Interface/Form/TextInput";
import AreaInput from "@/components/Interface/Form/AreaInput";

export default function Index() {
  const [isLoading, setIsloading] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [succesMessage, setSuccesMessage] = useState()
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredSubject, setEnteredSubject] = useState('')
  const [enteredMessages, setEnteredMessages] = useState('')
  const contactUsHandler = async (e) => {
    e.preventDefault()
    setIsloading(true)
    setErrorInfo({})
    setSuccesMessage('')
    let inputData = {
      email: enteredEmail,
      subject: enteredSubject,
      message: enteredMessages
    }

    const request = await axios.post('/formmail', inputData)
      .then((res) => {
        console.log(res)
        setSuccesMessage("Your email has been sent")
        setEnteredEmail('')
        setEnteredSubject('')
        setEnteredMessages('')
      })
      .catch((err) => {
        console.log(err.data)
        setErrorInfo(err.data.data)
      })
      .finally(() => {
        setIsloading(false)
      })
  }

  const setEnteredEmailHandler = (value) => {
    setEnteredEmail(value.value)
  }

  const setEnteredSubjectHandler = (value) => {
    setEnteredSubject(value.value)
  }

  const setEnteredMessagesHandler = (value) => {
    setEnteredMessages(value.value)
  }


  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <IndexNavbar fixed />
      <section className="bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-36">
          <div className="justify-center text-center flex flex-wrap mb-10">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl text-indigo-900">Contact Us</h2>
            </div>
          </div>

          <section className="">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form onSubmit={contactUsHandler} className="space-y-8">
                    {succesMessage &&
                        <div  className="w-50">
                            <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-blue-500">
                                <span className="text-xl inline-block mr-5 align-middle">
                                    <i className="fas fa-bell"></i>
                                </span>
                                <span className="inline-block align-middle mr-8">
                                    <b className="capitalize">{succesMessage}</b>
                                </span>
                            </div>
                        </div>
                    }
                    <div>
                      <TextInput
                        type="email"
                        isLoading={isLoading}
                        required
                        label="Your Email"
                        value={enteredEmail}
                        name="enteredEmail"
                        onChange={(input) => setEnteredEmailHandler(input)}
                        errorMsg={errorInfo.email}
                      ></TextInput>
                    </div>
                    <div>
                    <TextInput
                        isLoading={isLoading}
                        required
                        label="Subject"
                        value={enteredSubject}
                        name="enteredSubject"
                        onChange={(input) => setEnteredSubjectHandler(input)}
                        errorMsg={errorInfo.subject}
                      ></TextInput>
                    </div>
                    <div className="sm:col-span-2">
                      <AreaInput
                        isLoading={isLoading}
                        required
                        label="Your Message"
                        value={enteredMessages}
                        name="enteredMessages"
                        onChange={(input) => setEnteredMessagesHandler(input)}
                        errorMsg={errorInfo.messages}
                      ></AreaInput>
                    </div>
                    <PrimaryButton
                        type="submit"
                        className="w-64 uppercase font-bold"
                        disabled={isLoading}
                    >
                      {isLoading &&
                        <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                      }
                      Submit
                    </PrimaryButton>                   
                </form>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}
