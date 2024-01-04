import React, {useState, useEffect} from 'react'
import axios from 'lib/axios'
import * as Yup from 'yup'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import Admin from 'layouts/Admin.js'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import { Tabs } from 'flowbite-react'
import { Formik, Form } from 'formik'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'

import TextInputValidate from '@/components/Interface/Form/TextInputValidation'

// components
import PageHeader from '@/components/Interface/Page/PageHeader'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'

import {useRouter} from 'next/router'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import {useContext} from 'react'
import GlobalContext from '@/store/global-context'

export default function EditMainAccount({session, routeParam}) {
  //data search
  const [isLoading, setIsLoading] = useState(false)
  const [masterUser, setMasterUser] = useState({
    id: '',
    name: '',
    email: '',
  })

  const getData = async () => {
    setIsLoading(true)
    await axios
      .get(`admin/company/${routeParam.companyId}/details`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setMasterUser({
          id: result.master_user.id,
          name: result.master_user.name,
          email: result.master_user.email,
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.data.message, toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [])


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

  const validationSchemaProfile = Yup.object({
    name: Yup.string().required('The user name field is required'),
    email: Yup.string()
      .email('Must be a valid email address')
      .test('is-valid-email', 'The email field should email company', (value) =>
        isEmailCompany(value)
      )
      .required('The email field is required'),
  })

  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  const { loadUsername } = useContext(GlobalContext)
  const router = useRouter()

  const handleSubmit = async (values) => {
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    const payload = {
      id: masterUser.id,
      name: values?.name || '',
      email: values?.email || '',
    }
    await axios
      .post(`/admin/company/main-account/update-email`, payload, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(true)
        let result = response.data.data
        loadUsername(session.accessToken)
        toast.success(
          response.data.message,
          toastOptions
        )
        router.push(`/admin/superadmin/registry/details/${routeParam.companyId}`)
        setIsLoading(false)
      })
      .catch((error) => {
        toast.warning(error.data.message, toastOptions)
        setErrorMessage('Please fill your form correctly')
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  
  const [resetPasswordCheckBox, setResetPasswordCheckBox] = useState(false);
  const handleResetPasswordCheckBox = () => {
    setResetPasswordCheckBox((prev) => !prev)
  }
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoadingPassword(true)
    setErrorInfo({})
    setErrorMessage(null)
    const resetPasswordPayload = {
      id: masterUser.id,
      email: masterUser.email,
      reset_password: resetPasswordCheckBox
    }
    await axios
      .post(`/admin/company/main-account/reset-password`, resetPasswordPayload, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(
          response.data.message,
          toastOptions
        )
        router.push(`/admin/superadmin/registry/details/${routeParam.companyId}`)
      })
      .catch((error) => {
        toast.warning(error.data.message, toastOptions)
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
                Edit Main Account Profile
              </h3>
            }
            rightTop={
              <Link href={`/admin/superadmin/registry/details/main-account/${routeParam.companyId}`}>
                <LightButton size="sm">
                  <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                  Back
                </LightButton>
              </Link>
            }
          ></PageHeader>

          {errorMessage && <DangerNotification message={errorMessage} />}

          <Formik
            enableReinitialize
            initialValues={masterUser}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaProfile}
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
                      value={values.name}
                      onChange={formikProps.handleChange}
                      errorMsg={errorInfo?.name}
                      error={formikProps.touched.name && Boolean(errors.name)}
                      helperText={formikProps.touched.name && errors.name}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <TextInputValidate
                      id="email"
                      disabled={isLoading}
                      required
                      label="Email"
                      type="email"
                      name="email"
                      value={values.email}
                      errorMsg={errorInfo?.email}
                      onChange={formikProps.handleChange}
                      error={formikProps.touched.email && Boolean(errors.email)}
                      helperText={formikProps.touched.email && errors.email}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-3 mb-6">
                    <Link href={`/admin/superadmin/registry/details/${routeParam.companyId}`}>
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
                Reset Main Account Password
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
          <form onSubmit={handleResetPassword}>
            <div className="w-full lg:w-1/2 px-3 mb-6">
                <div className="w-full">
                  <input name="order" id="order" type="checkbox" checked={resetPasswordCheckBox} onChange={handleResetPasswordCheckBox} className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                  <label htmlFor="order" className="ml-2 text-sm font-medium text-gray-900 italic">Reset Password</label>                    
                  {errorInfo?.reset_password &&
                    <div>
                        <span className="font-light text-sm">
                            <i className="text-red-500">{errorInfo?.reset_password}</i>
                        </span>
                    </div>
                  }
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
                Reset
              </WarningButton>
            </div>
          </form>                  
        </PrimaryWrapper>
      </Tabs.Item>
    </Tabs.Group>
    
  )
}

EditMainAccount.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
      routeParam: context.query,
    },
  }
}
