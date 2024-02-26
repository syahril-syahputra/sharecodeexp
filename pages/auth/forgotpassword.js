/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react'
import axios from 'lib/axios'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import { useRouter } from 'next/router'

//components
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'

import TextInput from '@/components/Interface/Form/TextInput'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import LayoutLandingPage from '@/layouts/LandingPage'
import DarkButton from '@/components/Interface/Buttons/DarkButton'
import TextInputValidateDark from '@/components/Interface/Form/TextInputValidateDark'

function ForgotPassword(props) {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [succesMessage, setSuccesMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState(props.message)
  const [errorInfo, setErrorInfo] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccesMessage('')
    const request = await axios
      .post(
        '/forgot-password',
        {
          email: enteredEmail,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(() => {
        setSuccesMessage('Your email has been sent')
        setErrorMessage('')
        setErrorInfo('')
      })
      .catch((error) => {
        setErrorInfo(error.data.message)
        setErrorMessage(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <PageSEO
        title="Exepart - Forgot Password Page"
        description={siteMetadata.description}
      />

      <section className="mt-20 md:mt-20 pb-40 relative bg-white">
        <div className="container mx-auto">
          <div className="mt-36">
            <div className="justify-center text-center flex flex-wrap mb-20">
              <div className="w-full md:w-6/12 px-12 md:px-4 shadow-md p-5">
                <form onSubmit={handleSubmit} className="w-8/12 mx-auto">
                  <h2 className="font-semibold text-2xl mb-4 text-indigo-950">
                    Forgot Password
                  </h2>
                  {errorMessage && (
                    <div className="p-1">
                      <p className="text-red-500 text-lg italic">
                        {errorMessage}
                      </p>
                    </div>
                  )}
                  {succesMessage && (
                    <div className="p-1">
                      <p className="text-blue-500 text-lg italic">
                        {succesMessage}
                      </p>
                    </div>
                  )}
                  <div className="mx-auto mt-5">
                    <TextInput
                      setIcon="fas fa-envelope mt-1"
                      className="w-full"
                      type="email"
                      disabled={isLoading}
                      value={enteredEmail}
                      placeholder="email"
                      onChange={(input) => setEnteredEmail(input.value)}
                      errorMsg={errorInfo?.email}
                    />
                  </div>
                  <div className="mx-auto mt-5 mb-10">
                    <DarkButton
                      type="submit"
                      className="w-full font-bold uppercase"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <>
                          <i className="fas fa-hourglass fa-spin mr-2"></i>
                          Sending Email
                        </>
                      )}
                      {!isLoading && <>Send Email</>}
                    </DarkButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  let redirectedMessage = ''
  if (!!context.query.redirect) {
    redirectedMessage = 'Token is invalid'
  }

  return {
    props: {
      message: redirectedMessage,
    },
  }
}
ForgotPassword.layout = LayoutLandingPage
export default ForgotPassword
