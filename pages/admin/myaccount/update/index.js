import React, { useState, useContext } from 'react'
import Link from 'next/link'
import axios from 'lib/axios'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { getSession } from 'next-auth/react'
import GlobalContext from '@/store/global-context'
import { Tabs } from 'flowbite-react'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import TextInput from '@/components/Interface/Form/TextInput'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useRouter } from 'next/router'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import { signOut } from 'next-auth/react'

//data
export default function EditMyAccount({ session, data }) {
  const initialProvileValue = {
    name: data?.name || '',
    email: data?.email || '',
  }

  const initialPassword = {
    password: '',
    password_confirmation: '',
    old_password: '',
  }

  function isEmailCompany(email) {
    return /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.id)(?!aol.com)(?!live.com)(?!outlook.com)(?!inbox.com)(?!icloud.com)(?!mail.com)(?!gmx.com)(?!yandex.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/gm.test(
      email
    )
  }

  const logOutFunc = () => {
    signOut({ callbackUrl: `${window.location.origin}` })
  }

  const validationSchemaProvile = Yup.object({
    name: Yup.string().required('The user name field is required'),
    email: Yup.string()
      .email('Must be a valid email address')
      .test('is-valid-email', 'The email field should email company', (value) =>
        isEmailCompany(value)
      )
      .required('The email field is required'),
  })

  const validationSchemaPassword = Yup.object({
    password: Yup.string()
      .min(8, 'Password must have more than 8 characters')
      .required('The password field is required'),
    password_confirmation: Yup.string()
      .min(8, 'Confirmation password must have more than 8 characters')
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('The confirmation password field is required'),
    old_password: Yup.string()
      .min(8, 'Old password must have more than 8 characters')
      .required('The old password field is required'),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false)

  const { loadUsername } = useContext(GlobalContext)
  const router = useRouter()

  const handleSubmit = async (values) => {
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    const payload = {
      name: values?.name || '',
      email: values?.email || '',
    }
    await axios
      .post(`/my-account`, payload, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(true)
        let result = response.data.data
        loadUsername(session.accessToken)
        toast.success(
          'Your account have been updated successfully.',
          toastOptions
        )
        router.push('/admin/myaccount')
        setIsLoading(false)
      })
      .catch((error) => {
        toast.warning('Something went wrong.', toastOptions)
        setErrorMessage('Please fill your form correctly')
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSubmitPassword = async (values) => {
    setIsLoadingPassword(true)
    setErrorInfo({})
    setErrorMessage(null)
    const payload = {
      password: values?.password || '',
      password_confirmation: values?.password_confirmation || '',
      old_password: values.old_password || '',
    }
    await axios
      .post(`/update-password`, payload, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        setIsLoadingPassword(true)
        let result = response.data.data
        loadUsername(session.accessToken)
        toast.success(
          'Your account have been updated successfully, and will direct to front page',
          toastOptions
        )
        setIsLoadingPassword(false)
        logOutFunc()
      })
      .catch((error) => {
        toast.warning('Something went wrong.', toastOptions)
        setErrorMessage('Please fill your form correctly')
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoadingPassword(false)
      })
  }

  return (
    <Tabs.Group aria-label="Tabs with underline" style="underline">
      <Tabs.Item active title="Profile" icon={UserIcon}>
        <PrimaryWrapper>
          <PageHeader
            leftTop={
              <h3 className="font-semibold text-lg text-blueGray-700">
                Edit My Profile
              </h3>
            }
            rightTop={
              <Link href={`/admin/myaccount`}>
                <LightButton size="sm">
                  <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                  Back
                </LightButton>
              </Link>
            }
          ></PageHeader>

          {errorMessage && <DangerNotification message={errorMessage} />}

          {/* <form onSubmit={handleSubmit} className="pl-1 mt-6">
            <div className="w-full lg:w-1/2 px-3 mb-6">
              <TextInput
                disabled={isLoading}
                required
                label="Name"
                name="name"
                value={inputData.name}
                onChange={(input) => setDataHandler(input)}
                errorMsg={errorInfo.name}
              />
            </div>
            <div className="w-full lg:w-1/2 px-3 mb-6">
              <TextInput
                disabled={isLoading}
                required
                label="Email"
                type="email"
                name="email"
                value={inputData.email}
                onChange={(input) => setDataHandler(input)}
                errorMsg={errorInfo.email}
              />
            </div>
            <div className="w-full lg:w-1/2 px-3 mb-6">
              <Link href={`/admin/superadmin/usercontrol/admin`}>
                <LightButton
                  className="w-full font-bold uppercase mb-2"
                  disabled={isLoading}
                >
                  Cancel
                </LightButton>
              </Link>
              <WarningButton
                className="w-full font-bold uppercase"
                disabled={isLoading}
                type="submit"
              >
                {isLoading && (
                  <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                )}
                Update
              </WarningButton>
            </div>
          </form> */}

          <Formik
            initialValues={initialProvileValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaProvile}
          >
            {({ values, errors, ...formikProps }) => {
              return (
                <Form
                  className="pl-1 mt-6"
                  id="update-form-profile"
                  aria-label="form"
                  noValidate
                >
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <TextInputValidate
                      id="name"
                      disabled={isLoading}
                      required
                      label="Name"
                      name="name"
                      placeholder="Please enter account name here..."
                      value={values.name}
                      onChange={formikProps.handleChange}
                      errorMsg={errorInfo.name}
                      error={formikProps.touched.name && Boolean(errors.name)}
                      helperText={formikProps.touched.name && errors.name}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <TextInputValidate
                      disabled={isLoading}
                      required
                      label="Email"
                      type="email"
                      name="email"
                      value={values.email}
                      errorMsg={errorInfo?.email}
                      onChange={formikProps.handleChange}
                      placeholder="Please enter company email here..."
                      error={formikProps.touched.email && Boolean(errors.email)}
                      helperText={formikProps.touched.email && errors.email}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <Link href={`/admin/superadmin/usercontrol/admin`}>
                      <LightButton
                        className="w-full font-bold uppercase mb-2"
                        disabled={isLoading}
                      >
                        Cancel
                      </LightButton>
                    </Link>
                    <WarningButton
                      className="w-full font-bold uppercase"
                      disabled={isLoading}
                      type="submit"
                    >
                      {isLoading && (
                        <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                      )}
                      Update
                    </WarningButton>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </PrimaryWrapper>
      </Tabs.Item>
      <Tabs.Item title="Password" icon={LockClosedIcon}>
        <PrimaryWrapper>
          <PageHeader
            leftTop={
              <h3 className="font-semibold text-lg text-blueGray-700">
                Edit My Password
              </h3>
            }
            rightTop={
              <Link href={`/admin/myaccount`}>
                <LightButton size="sm">
                  <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                  Back
                </LightButton>
              </Link>
            }
          ></PageHeader>
          {errorMessage && <DangerNotification message={errorMessage} />}
          <Formik
            initialValues={initialPassword}
            onSubmit={handleSubmitPassword}
            validationSchema={validationSchemaPassword}
          >
            {({ values, errors, ...formikProps }) => {
              return (
                <Form
                  className="pl-1 mt-6"
                  id="update-form-profile"
                  aria-label="form"
                  noValidate
                >
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <div className="relative">
                      <TextInputValidate
                        id="old_password"
                        disabled={isLoadingPassword}
                        label="Old Password"
                        placeholder="Please enter old password here..."
                        type={showPassword ? 'text' : 'password'}
                        required
                        name="old_password"
                        value={values.old_password}
                        errorMsg={errorInfo?.old_password}
                        onChange={formikProps.handleChange}
                        error={
                          formikProps.touched.old_password &&
                          Boolean(errors.old_password)
                        }
                        helperText={
                          formikProps.touched.old_password &&
                          errors.old_password
                        }
                      />
                      <div
                        className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash text-slate-500"></i>
                        ) : (
                          <i className="fas fa-eye text-slate-500"></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <div className="relative">
                      <TextInputValidate
                        id="password"
                        disabled={isLoadingPassword}
                        label="Password"
                        placeholder="Please enter password here..."
                        type={showPassword ? 'text' : 'password'}
                        required
                        name="password"
                        value={values.password}
                        errorMsg={errorInfo?.password}
                        onChange={formikProps.handleChange}
                        error={
                          formikProps.touched.password &&
                          Boolean(errors.password)
                        }
                        helperText={
                          formikProps.touched.password && errors.password
                        }
                      />
                      <div
                        className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash text-slate-500"></i>
                        ) : (
                          <i className="fas fa-eye text-slate-500"></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <div className="relative">
                      <TextInputValidate
                        id="password_confirmation"
                        label="Confirm Password"
                        type={showConfirmationPassword ? 'text' : 'password'}
                        className="w-full"
                        required
                        placeholder="Please enter confirm password here..."
                        name="password_confirmation"
                        value={values.password_confirmation}
                        errorMsg={errorInfo?.password_confirmation}
                        onChange={formikProps.handleChange}
                        error={
                          formikProps.touched.password_confirmation &&
                          Boolean(errors.password_confirmation)
                        }
                        helperText={
                          formikProps.touched.password_confirmation &&
                          errors.password_confirmation
                        }
                      />
                      <div
                        className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"
                        onClick={() =>
                          setShowConfirmationPassword((prev) => !prev)
                        }
                      >
                        {showConfirmationPassword ? (
                          <i className="fas fa-eye-slash text-slate-500" />
                        ) : (
                          <i className="fas fa-eye text-slate-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <Link href={`/admin/superadmin/usercontrol/admin`}>
                      <LightButton
                        className="w-full font-bold uppercase mb-2"
                        disabled={isLoadingPassword}
                      >
                        Cancel
                      </LightButton>
                    </Link>
                    <WarningButton
                      className="w-full font-bold uppercase"
                      disabled={isLoadingPassword}
                      type="submit"
                    >
                      {isLoadingPassword && (
                        <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                      )}
                      Update
                    </WarningButton>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </PrimaryWrapper>
      </Tabs.Item>
    </Tabs.Group>
  )
  // )
}

EditMyAccount.layout = Admin

async function loadData(context) {
  try {
    const data = await axios.get(`/my-account`, {
      headers: {
        Authorization: `Bearer ${context?.accessToken}`,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const result = await loadData(session)

  return {
    props: {
      session: session,
      data: result?.data?.data,
    },
  }
}
