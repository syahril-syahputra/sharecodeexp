import React, { useState, useEffect, useRef } from 'react'
import * as Yup from 'yup'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import ErrorInput from '@/components/Shared/ErrorInput'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'

// components
import CountrySelector from '@/components/Shared/CountrySelector'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import TextInput from '@/components/Interface/Form/TextInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import AreaInput from '@/components/Interface/Form/AreaInput'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import SelectInputSector from '@/components/Interface/Form/SelectInputSector'
import AreaInputValidation from '@/components/Interface/Form/AreaInputValidation'

export default function MyCompany({ session, sectorlist }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [companySector, setCompanySector] = useState(null)

  //data search
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    country: '',
    sector: '',
    phone: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [companyStatus, setCompanyStatus] = useState()
  const [firstAddressCharacterCount, setFirstAddressCharacterCount] =
    useState(0)

  const [secondAddressCharacterCount, setSecondAddressCharacterCount] =
    useState(0)
  const secondAddressCharacterLimit = 100
  const firstAddressCharacterLimit = 100

  const firstAddressHandler = (input) => {
    setFirstAddressCharacterCount(input.length)
  }

  const getData = async () => {
    setIsLoading(true)
    const response = await axios
      .get(`/company`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setInputData({
          name: result.name,
          address: result.address,
          country: result.country,
          company_sector: result.sector,
          phone: result.phone,
        })

        //set sector
        let oldSector = sectors.find((item) => item.value == result.sector)
        if (oldSector) {
          setSector({ value: result.sector, label: result.sector })
        } else {
          setSector({ value: 'other', label: 'Other' })
        }
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Can not load company data.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // update data

  const initialValues = {
    name: inputData?.name || '',
    address: inputData?.address || '',
    company_sector: inputData?.company_sector || '',
    country: inputData?.country || '',
    other: inputData?.other || '',
    phone: inputData?.phone || '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('The user name field is required'),
    address: Yup.mixed()
      .test(
        'len',
        'The Company address 1 field is required at least 2 characters and not more than 100',
        (val) => {
          if (val === undefined) {
            return true
          }

          return val.length === 0 || (val.length >= 2 && val.length <= 100)
        }
      )
      .required('The Company address 1 field is required'),
    country: Yup.mixed().required('The company country field is required'),
    company_sector: Yup.mixed().required(
      'The company sector field is required'
    ),
    other: Yup.mixed().when('company_sector', {
      is: (value) => value?.value === 'other',
      then: () =>
        Yup.mixed().required('The company sector with other field is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    phone: Yup.mixed().required('The company phone field is required'),
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const setDataHandler = (input) => {
    setInputData({ ...inputData, [input.name]: input.value })
  }

  //country handle
  const [country, setCountry] = useState()
  const countryHandleChange = (value) => {
    setInputData({ ...inputData, country: value.label })
    setCountry(value)
  }

  //option
  //packaging option
  const [sectors, setSectors] = useState([
    ...sectorlist,
    { value: 'other', label: 'Other' },
  ])

  const [sector, setSector] = useState(null)
  const handleSectorChange = (value) => {
    setInputData({ ...inputData, sector: '' })
    setSector(value)
    if (value.value != 'other') {
      setInputData({ ...inputData, sector: value.value })
    }
  }

  //update handler
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)

    let formData = new FormData()
    for (const key in inputData) {
      formData.append(key, inputData[key])
    }

    const response = await axios
      .post(`/master/company/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        router.replace('/admin/member')
        toast.success(
          'Your company have been updated successfully.',
          toastOptions
        )
      })
      .catch((error) => {
        setErrorMessage('Please fill your form correctly')
        toast.error('Something went wrong.', toastOptions)
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3 className="font-semibold text-lg text-blueGray-700">
            Edit My Company
          </h3>
        }
        rightTop={
          <Link href="/admin/member/company/my-company">
            <LightButton size="sm">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        }
      ></PageHeader>
      {errorMessage && <DangerNotification message={errorMessage} />}
      <div className="p-2">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, ...formikProps }) => {
            return (
              <Form
                className="p-2"
                id="edit-my-company-form"
                aria-label="form"
                noValidate
              >
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <TextInputValidate
                      id="name"
                      label="Company Name"
                      className="w-full"
                      required
                      placeholder="Please enter account name here..."
                      name="name"
                      value={values.name}
                      errorMsg={errorInfo?.name}
                      onChange={formikProps.handleChange}
                      error={formikProps.touched.name && Boolean(errors.name)}
                      helperText={formikProps.touched.name && errors.name}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    {/* <SelectInput
                      searchable
                      label="Sectors"
                      name="sector"
                      value={sector}
                      options={sectors}
                      errorMsg={errorInfo?.sector}
                      onChange={handleSectorChange}
                    />
                    {sector?.value == 'other' && (
                      <div className="mt-2">
                        <TextInput
                          className="w-full"
                          required
                          name="sector"
                          value={inputData.sector}
                          errorMsg={errorInfo?.sector}
                          onChange={(input) => setDataHandler(input)}
                        />
                      </div>
                    )} */}
                    <SelectInputSector
                      searchable
                      label="Sectors"
                      name="company_sector"
                      value={values.company_sector}
                      options={sectors}
                      required
                      errorMsg={errorInfo?.company_sector}
                      onChange={(value) => {
                        setCompanySector(value)
                        formikProps.setFieldValue('company_sector', value)
                      }}
                      onBlur={formikProps.onBlur}
                      error={
                        formikProps.touched.company_sector &&
                        Boolean(errors.company_sector)
                      }
                      helperText={
                        formikProps.touched.company_sector &&
                        errors.company_sector
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <TextInput
                      label="Phone"
                      className="w-full"
                      required
                      name="phone"
                      value={inputData.phone}
                      errorMsg={errorInfo?.phone}
                      onChange={(input) => setDataHandler(input)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <CountrySelector
                      setInisiate
                      label="Country"
                      inputDataName="country"
                      value={inputData.country}
                      countryHandleChange={countryHandleChange}
                      errorMsg={errorInfo.country}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full  px-3 mb-6 md:mb-0">
                    {/* <AreaInput
                      label="Address"
                      name="address"
                      required
                      value={inputData.address}
                      errorMsg={errorInfo?.address}
                      onChange={(input) => setDataHandler(input)}
                    /> */}
                    <AreaInputValidation
                      rows={5}
                      label="Address"
                      name="address"
                      required
                      value={formikProps?.address}
                      errorMsg={errorInfo?.address}
                      characterCount={firstAddressCharacterCount}
                      characterLimit={firstAddressCharacterLimit}
                      placeholder="Please enter company address 1 here..."
                      onChange={(event) => {
                        const value = event?.target?.value
                        formikProps.handleChange(event)
                        formikProps.setFieldValue('address', value)
                        firstAddressHandler(value)
                      }}
                      error={
                        formikProps.touched.address && Boolean(errors.address)
                      }
                      helperText={formikProps.touched.address && errors.address}
                    />
                  </div>
                </div>
                <div className="mt-8 mb-20">
                  <div className="relative flex py-5 items-center w-full mx-auto">
                    <div className="flex-grow border-t border-blueGray-700"></div>
                    <div className="flex-shrink mx-4">
                      <h2 className="font-semibold text-xl text-blueGray-500">
                        Documents
                      </h2>
                    </div>
                    <div className="flex-grow border-t border-blueGray-700"></div>
                  </div>
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Company Registration Document (Upload if only change)
                      </label>
                      <div className="p-5 border-dashed border-2 border-indigo-200">
                        <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                          <div className="text-center my-auto">
                            <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                          </div>
                          <div className="text-xs ">
                            <p>PDF file size no more than 10MB</p>
                            <input
                              className="mt-3"
                              type="file"
                              accept=".pdf"
                              name="RegistrationDocument"
                              onChange={({ target }) =>
                                setInputData({
                                  ...inputData,
                                  RegistrationDocument: target.files[0],
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {errorInfo.RegistrationDocument && (
                        <ErrorInput error={errorInfo.RegistrationDocument} />
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Certification of Activity (Upload if only change)
                      </label>
                      <div className="p-5 border-dashed border-2 border-indigo-200">
                        <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                          <div className="text-center my-auto">
                            <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                          </div>
                          <div className="text-xs ">
                            <p>PDF file size no more than 10MB</p>
                            <input
                              className="mt-3"
                              type="file"
                              accept=".pdf"
                              name="CertificationofActivity"
                              onChange={({ target }) =>
                                setInputData({
                                  ...inputData,
                                  CertificationofActivity: target.files[0],
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {errorInfo.CertificationofActivity && (
                        <ErrorInput error={errorInfo.CertificationofActivity} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-10 w-1/2 mx-auto">
                  <i className=" italic text-red-500">
                    Note: Updating your Company causing your Member Status
                    become pending.
                  </i>
                </div>
                <div className="px-3 mb-6 flex">
                  <div className="w-full pr-2">
                    <Link href="/admin/member/company/my-company">
                      <LightButton
                        className="w-full font-bold uppercase mb-2"
                        disabled={isLoading}
                      >
                        Cancel
                      </LightButton>
                    </Link>
                  </div>
                  <div className="w-full">
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
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
      <form onSubmit={handleSubmit} className="p-2">
        {/* <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <TextInput
              label="Company Name"
              className="w-full"
              required
              name="name"
              value={inputData.name}
              errorMsg={errorInfo?.name}
              onChange={(input) => setDataHandler(input)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <SelectInput
              searchable
              label="Sectors"
              name="sector"
              value={sector}
              options={sectors}
              errorMsg={errorInfo?.sector}
              onChange={handleSectorChange}
            />
            {sector?.value == 'other' && (
              <div className="mt-2">
                <TextInput
                  className="w-full"
                  required
                  name="sector"
                  value={inputData.sector}
                  errorMsg={errorInfo?.sector}
                  onChange={(input) => setDataHandler(input)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <TextInput
              label="Phone"
              className="w-full"
              required
              name="phone"
              value={inputData.phone}
              errorMsg={errorInfo?.phone}
              onChange={(input) => setDataHandler(input)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <CountrySelector
              setInisiate
              label="Country"
              inputDataName="country"
              value={inputData.country}
              countryHandleChange={countryHandleChange}
              errorMsg={errorInfo.country}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <AreaInput
              label="Address"
              name="address"
              required
              value={inputData.address}
              errorMsg={errorInfo?.address}
              onChange={(input) => setDataHandler(input)}
            />
          </div>
        </div>
        <div className="mt-8 mb-20">
          <div className="relative flex py-5 items-center w-full mx-auto">
            <div className="flex-grow border-t border-blueGray-700"></div>
            <div className="flex-shrink mx-4">
              <h2 className="font-semibold text-xl text-blueGray-500">
                Documents
              </h2>
            </div>
            <div className="flex-grow border-t border-blueGray-700"></div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Company Registration Document (Upload if only change)
              </label>
              <div className="p-5 border-dashed border-2 border-indigo-200">
                <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                  <div className="text-center my-auto">
                    <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                  </div>
                  <div className="text-xs ">
                    <p>PDF file size no more than 10MB</p>
                    <input
                      className="mt-3"
                      type="file"
                      accept=".pdf"
                      name="RegistrationDocument"
                      onChange={({ target }) =>
                        setInputData({
                          ...inputData,
                          RegistrationDocument: target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {errorInfo.RegistrationDocument && (
                <ErrorInput error={errorInfo.RegistrationDocument} />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Certification of Activity (Upload if only change)
              </label>
              <div className="p-5 border-dashed border-2 border-indigo-200">
                <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                  <div className="text-center my-auto">
                    <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                  </div>
                  <div className="text-xs ">
                    <p>PDF file size no more than 10MB</p>
                    <input
                      className="mt-3"
                      type="file"
                      accept=".pdf"
                      name="CertificationofActivity"
                      onChange={({ target }) =>
                        setInputData({
                          ...inputData,
                          CertificationofActivity: target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {errorInfo.CertificationofActivity && (
                <ErrorInput error={errorInfo.CertificationofActivity} />
              )}
            </div>
          </div>
        </div>

        <div className="text-center mb-10 w-1/2 mx-auto">
          <i className="text-light italic text-red-500">
            Note: Updating your Company causing your Member Status become
            pending.
          </i>
        </div>
        <div className="px-3 mb-6 flex">
          <div className="w-full pr-2">
            <Link href="/admin/member/company/my-company">
              <LightButton
                className="w-full font-bold uppercase mb-2"
                disabled={isLoading}
              >
                Cancel
              </LightButton>
            </Link>
          </div>
          <div className="w-full">
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
        </div> */}
      </form>
    </PrimaryWrapper>
  )
}

MyCompany.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const loadSectors = await axios.get(`/sectorlist`)
  const sectorlist = loadSectors.data.data

  return {
    props: {
      session,
      routeParam: context.query,
      sectorlist,
    },
  }
}
