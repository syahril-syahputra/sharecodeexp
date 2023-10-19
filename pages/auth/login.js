import React, { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'

//components
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import TextInput from '@/components/Interface/Form/TextInput'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function Login() {
  const router = useRouter()
  const { status } = useSession()
  if (status == 'authenticated') {
    router.replace('/admin/dashboard')
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrMessage] = useState({
    error: ' ',
    status: '',
  })

  const initialValue = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address')
      .required('The email field is required'),
    password: Yup.string()
      .min(8, 'Password must have more than 8 characters')
      .required(`The password field is required`),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const handleSubmit = async (values) => {
    setErrMessage({ error: ' ', status: '' })
    setIsLoading(true)
    const request = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          setErrMessage(res)
          setIsLoading(false)
        }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  return (
    <>
      <PageSEO title="Exepart - Login" description={siteMetadata.description} />
      <IndexNavbar fixed hideLogin />
      <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 mt-36 text-2xl font-semibold text-gray-900 dark:text-white">
            <ImageLogo size={250} />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Formik
                initialValues={initialValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, ...formikProps }) => {
                  return (
                    <Form
                      className="space-y-4 md:space-y-6"
                      id="login-form"
                      aria-label="form"
                      noValidate
                    >
                      <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to EXEpart
                      </h1>
                      <div className="p-1 h-10">
                        <p className="text-red-500 text-lg italic text-center">
                          {errMessage.error}
                        </p>
                      </div>
                      <div className="items-stretch mb-3">
                        <TextInputValidate
                          id="email"
                          required
                          type="text"
                          name={'email'}
                          placeholder="email"
                          setIcon="fas fa-user"
                          value={values.email}
                          onChange={formikProps.handleChange}
                          error={
                            formikProps.touched.email && Boolean(errors.email)
                          }
                          helperText={formikProps.touched.email && errors.email}
                        />
                      </div>
                      <div className="relative mt-2 rounded-md shadow-sm ">
                        <TextInputValidate
                          required
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="password"
                          setIcon="fas fa-lock"
                          value={values.password}
                          onChange={formikProps.handleChange}
                          error={
                            formikProps.touched.password &&
                            Boolean(errors.password)
                          }
                          helperText={
                            formikProps.touched.password && errors.password
                          }
                        />
                        <span
                          className={`absolute top-[-5rem] right-4 flex items-center cursor-pointer ${
                            formikProps.touched.password &&
                            Boolean(errors.password)
                              ? 'bottom-[-50px]'
                              : 'bottom-[-5rem]'
                          }`}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash text-slate-500"></i>
                          ) : (
                            <i className="fas fa-eye text-slate-500"></i>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-end mb-5 mt-2">
                        <div className="text-blueGray-400 hover:underline hover:text-blueGray-700">
                          <Link href="/auth/forgotpassword">
                            Forgot Password
                          </Link>{' '}
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <PrimaryButton
                          disabled={isLoading}
                          type="submit"
                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-bold uppercase"
                        >
                          {isLoading && (
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                          )}
                          Login
                        </PrimaryButton>
                      </div>
                      <div className="relative flex mt-5 items-center w-full md:w-10/12 mx-auto">
                        <div className="flex-grow border-t border-blueGray-700"></div>
                        <div className="flex-shrink mx-4">
                          <p className="text-blueGray-400">Or</p>
                        </div>
                        <div className="flex-grow border-t border-blueGray-700"></div>
                      </div>
                      <div className="text-center mt-5 mb-10">
                        <p className="text-blueGray-400">
                          Didn't have account?{' '}
                          <Link
                            href="/auth/register"
                            className="text-blueGray-400 hover:text-blueGray-700 underline"
                          >
                            Register instead
                          </Link>
                        </p>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
