import LayoutLandingPage from '@/layouts/LandingPage'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import DarkButton from '@/components/Interface/Buttons/DarkButton'
import TextInputValidateDark from '@/components/Interface/Form/TextInputValidateDark'
function SignIn() {
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
        // console.log(res);
      })
  }
  return (
    <>
      <PageSEO title="Exepart - Login" description={siteMetadata.description} />
      <div className="py-8 container flex justify-center items-center ">
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, ...formikProps }) => {
            return (
              <Form
                className="space-y-4 text-indigo-950 md:space-y-6 w-full max-w-lg border border-black rounded-2xl py-16 px-14"
                id="login-form"
                aria-label="form"
                noValidate
              >
                <h1 className="text-4xl">Login</h1>

                <div className="items-stretch mb-3">
                  <TextInputValidateDark
                    id="email"
                    required
                    type="text"
                    name={'email'}
                    label="Email"
                    value={values.email}
                    onChange={formikProps.handleChange}
                    error={formikProps.touched.email && Boolean(errors.email)}
                    helperText={formikProps.touched.email && errors.email}
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wide text-indigo-950 text-xs font-bold text-left ">
                    Password
                  </label>
                  <div className="relative rounded-md shadow-sm ">
                    <TextInputValidateDark
                      required
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={values.password}
                      onChange={formikProps.handleChange}
                      error={
                        formikProps.touched.password && Boolean(errors.password)
                      }
                      helperText={
                        formikProps.touched.password && errors.password
                      }
                    />
                    <span
                      className={`absolute top-[-5rem] right-4 flex items-center cursor-pointer ${
                        formikProps.touched.password && Boolean(errors.password)
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
                </div>
                <div className="flex items-center  mb-5 mt-2">
                  <div className=" text-indigo-950 hover:underline hover:text-blueGray-700">
                    <Link href="/auth/forgotpassword">Forgot Password</Link>{' '}
                  </div>
                </div>
                {errMessage.error && (
                  <div className="">
                    <p className="text-red-500 text-lg italic text-center">
                      {errMessage.error}
                    </p>
                  </div>
                )}

                <div className="text-center mt-2">
                  <DarkButton
                    disabled={isLoading}
                    type="submit"
                    className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-bold uppercase"
                  >
                    {isLoading && (
                      <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                    )}
                    Login
                  </DarkButton>
                </div>

                <div className="text-center mt-5 mb-10">
                  <p className="text-indigo-950">
                    Didn't have account?{' '}
                    <Link
                      href="/auth/register"
                      className="text-gray-700 font-semibold hover:text-blueGray-700 underline"
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
    </>
  )
}
SignIn.layout = LayoutLandingPage

export default SignIn
