import * as Yup from 'yup'
import React, {useState} from 'react'
import axios from 'lib/axios'
import Link from 'next/link'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import {Formik, Form} from 'formik'
import {PageSEO} from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import CountrySelector from '@/components/Shared/CountrySelector'
import TextInputImage from '@/components/Interface/Form/TextInputImage'
import SelectInputSector from '@/components/Interface/Form/SelectInputSector'
import useSctor from '@/hooks/useSctor'
import useCountry from '@/hooks/useCountry'
import ProvinceSelector from '@/components/Shared/ProvinceSelector'
import useDataProvince from '@/hooks/useProvince'
import CitySelector from '@/components/Shared/CitySelector'
import {PostalCode} from '@/utils/postalCode'
import AreaInputValidation from '@/components/Interface/Form/AreaInputValidation'
import TermAndConditionOfSaleModal from '@/components/Modal/Component/TermAndConditionOfSaleModal'
import TermsandConditionofExportModal from '@/components/Modal/Component/TermsandConditionofExportModal'
import TextInputPhoneValidate from '@/components/Interface/Form/TextInputPhoneValidate'
import TextInputDocument from '@/components/Interface/Form/TextInputDocument'

export default function Index() {
  const [isAgreeTermCondtionOfSale, setIsAgreeTermCondtionOfSale] =
    useState(false)

  const [
    isAgreeTermCondtionOfSaleMessage,
    setIsAgreeTermCondtionOfSaleMessage,
  ] = useState('')
  const [isAgreeTermCondtionOfExport, setIsAgreeTermCondtionOfExport] =
    useState(false)
  const [
    isAgreeTermCondtionOfExportMessage,
    setIsAgreeTermCondtionOfExportMessage,
  ] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false)
  const initialValue = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',

    // Company Information
    company_name: '',
    company_sector: '',
    company_other: '',
    company_phone: '',
    company_code_country: '',
    company_country: '',
    company_address: '',
    company_address2: '',
    company_zip: '',
    company_province: '',
    company_city: '',
    company_province_other: '',
    company_city_other: '',
    // Documents
    company_img: '',
    company_RegistrationDocument: '',
    company_CertificationofActivity: '',
  }

  function isEmailCompany(email) {
    return /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.id)(?!aol.com)(?!live.com)(?!outlook.com)(?!inbox.com)(?!icloud.com)(?!mail.com)(?!gmx.com)(?!yandex.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/gm.test(
      email
    )
  }

  function isMatchPostalCodePattern({id, Country, value}) {
    const findCodeRegex = PostalCode?.find(
      (e) => e?.id === id && e.country === Country
    )
    const regex = findCodeRegex?.Regex

    return regex.test(value)
  }

  const handleisAgreeTermCondtionOfSale = () => {
    setIsAgreeTermCondtionOfSale((prev) => !prev)


    if (!isAgreeTermCondtionOfSale) {
      setIsAgreeTermCondtionOfSaleMessage()
    }
  }

  const handleisAgreeTermCondtionOfExport = () => {
    setIsAgreeTermCondtionOfExport((prev) => !prev)

    if (!isAgreeTermCondtionOfExport) {
      setIsAgreeTermCondtionOfExportMessage()
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('The user name field is required'),
    email: Yup.string()
      .email('Must be a valid email address')
      .test('is-valid-email', 'The email field should email company', (value) =>
        isEmailCompany(value)
      )
      .required('The email field is required'),
    password: Yup.string()
      .min(8, 'Password must have more than 8 characters')
      .required('The password field is required'),
    password_confirmation: Yup.string()
      .min(8, 'Confirmation password must have more than 8 characters')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('The confirmation password field is required'),
    company_name: Yup.string().required('The company name field is required'),
    company_sector: Yup.mixed().required(
      'The company sector field is required'
    ),
    company_other: Yup.mixed().when('company_sector', {
      is: (value) => value?.value === 'other',
      then: () =>
        Yup.mixed().required('The company sector with other field is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    company_phone: Yup.mixed().required('The company phone field is required'),
    company_code_country: Yup.mixed().required('The company code country field is required'),
    company_city: Yup.mixed().required('The company city field is required'),

    company_country: Yup.mixed().required(
      'The company country field is required'
    ),
    company_province: Yup.mixed().required(
      'The company province field is required'
    ),
    company_province_other: Yup.mixed().when('company_province', {
      is: (value) => value?.value?.toLowerCase() === 'other',
      then: () =>
        Yup.mixed().required(
          'The company province with other field is required'
        ),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    company_city_other: Yup.mixed().when('company_city', {
      is: (value) => value?.value?.toLowerCase() === 'other',
      then: () =>
        Yup.mixed().required('The company city with other field is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    // company_zip: Yup.mixed()
    //   .required('The company zip field is required')
    //   .test(
    //     'is-valid-compant-zip',
    //     "The company zip field should following country's zip code",
    //     (value) =>
    //       isMatchPostalCodePattern({
    //         id: stateCountry?.id,
    //         country: stateCountry?.value,
    //         value,
    //       })
    //   ),
    company_address: Yup.mixed()
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
    company_address2: Yup.mixed()
      .test(
        'len',
        'The Company address 2 field is required at least 2 characters and not more than 100 characters',
        (val) => {
          if (val === undefined) {
            return true
          }

          return val.length === 0 || (val.length >= 2 && val.length <= 100)
        }
      )
      .notRequired(),
    company_CertificationofActivity: Yup.mixed().required(
      'The Field of Certification of Activity is required'
    ),
    company_RegistrationDocument: Yup.mixed().required(
      'The Field of Company Registration Document is required'
    ),
  })

  /**
   * This code comment due to fixing bugs process for performance issues 12/2/2023
   */
  // const [_, setRegistrationInfo] = useState({
  //   // Account Information
  //   name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',

  //   // Company Information
  //   company_name: '',
  //   company_sector: '',
  //   company_phone: '',
  //   company_country: '',
  //   company_address: '',
  //   company_address2: '',
  //   company_zip: '',
  //   company_province: '',
  //   company_city: '',

  //   // Documents
  //   company_img: '',
  //   company_RegistrationDocument: '',
  //   company_CertificationofActivity: '',
  // })

  const [firstAddressCharacterCount, setFirstAddressCharacterCount] =
    useState(0)

  const [secondAddressCharacterCount, setSecondAddressCharacterCount] =
    useState(0)
  const secondAddressCharacterLimit = 100
  const firstAddressCharacterLimit = 100
  const secondAddressHandler = (input) => {
    setSecondAddressCharacterCount(input.length)
  }

  const firstAddressHandler = (input) => {
    setFirstAddressCharacterCount(input.length)
  }

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesStatus, setSuccesStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stateCountry, setStatCountry] = useState(null)
  const [stateProvince, setStateProvince] = useState(null)
  const [companySector, setCompanySector] = useState(null)
  const [companyCityOther, setCompanyCityOther] = useState(null)
  const [companyProvince, setCompanyProvince] = useState(null)
  //Terms and Conditions of Sale.
  const [stateTOCSale, setStateTOCSale] = useState(false)
  const [stateTOCExport, setStateTOCExport] = useState(false)
  const handleSubmit = async (values) => {

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      company_name: values.company_name,
      company_address: values.company_address,
      company_address2: values.company_address2,
      country_code: values.company_code_country?.value,
      company_phone: values.company_phone,
      company_sector:
        companySector?.value?.toLowerCase() === 'other'
          ? values.company_other
          : values.company_sector?.value || '',
      country: values.company_country?.value,
      state:
        companyProvince?.value?.toLowerCase() === 'other'
          ? values.company_province_other
          : values.company_province?.value,
      city:
        companyCityOther?.value?.toLowerCase() === 'other'
          ? values.company_city_other
          : values.company_city?.value,
      company_zip: values.company_zip,
      company_RegistrationDocument: values.company_RegistrationDocument,
      company_CertificationofActivity: values.company_CertificationofActivity,
      company_img: values.company_img,
      tac_of_sale_agreement: isAgreeTermCondtionOfSale,
      tac_of_export_agreement: isAgreeTermCondtionOfExport,
    }

    if (!isAgreeTermCondtionOfSale) {
      setIsAgreeTermCondtionOfSaleMessage(
        'Please agreed the Term and Conditions of Sale before continue.'
      )
      return
    }
    if (!isAgreeTermCondtionOfExport) {
      setIsAgreeTermCondtionOfExportMessage(
        'Please agreed the Term and Conditions of Export before continue.'
      )
      return
    }
    setErrorMessage(null)
    setErrorInfo(null)
    setIsLoading(true)
    await axios
      .post('/registration', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setSuccesStatus(true)
        setErrorMessage(null)
        setErrorInfo(null)
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        setErrorMessage('Please fill your form correctly')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [imageCompany, setImageCompany] = useState(null)
  const sectors = useSctor()
  const countries = useCountry()
  const provincies = useDataProvince(stateCountry?.id)

  return (
    <>
      <PageSEO
        title="Exepart - Register"
        description={siteMetadata.description}
      />
      <IndexNavbar fixed hideLogin />
      <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto">
          <div className="mt-36">
            <div className="px-5 pt-5 pb-4">
              <ImageLogo size={250} />
            </div>
            <div className="justify-center flex flex-wrap mb-20 ">
              <div className="w-full md:w-10/12 md:shadow-md p-5 bg-white">
                {!succesStatus && (
                  <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                  >
                    {({values, errors, ...formikProps}) => (
                      <Form
                        className="pb-20"
                        id="register-form"
                        aria-label="form"
                        noValidate
                      >
                        <h2 className="font-semibold text-2xl text-center">
                          Registration
                        </h2>
                        {errorMessage && (
                          <DangerNotification
                            detail={errorMessage}
                            onCloseNotification={() => setErrorMessage(null)}
                          />
                        )}
                        <div className="mt-8">
                          <div className="relative flex py-5 items-center w-full mx-auto">
                            <div className="flex-shrink mr-4">
                              <h2 className="font-semibold text-xl text-blueGray-500">
                                Main Account Information
                              </h2>
                            </div>
                            <div className="flex-grow border-t border-blueGray-700" />
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <TextInputValidate
                                id="name"
                                label="User Name"
                                className="w-full"
                                required
                                name="name"
                                placeholder="Please enter account name here..."
                                value={values.name}
                                errorMsg={errorInfo?.name}
                                onChange={formikProps.handleChange}
                                error={
                                  formikProps.touched.name &&
                                  Boolean(errors.name)
                                }
                                helperText={
                                  formikProps.touched.name && errors.name
                                }
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <TextInputValidate
                                id="email"
                                label="Main Account Email"
                                type="email"
                                className="w-full"
                                required
                                name="email"
                                value={values.email}
                                errorMsg={errorInfo?.email}
                                onChange={formikProps.handleChange}
                                placeholder="Please enter company email here..."
                                error={
                                  formikProps.touched.email &&
                                  Boolean(errors.email)
                                }
                                helperText={
                                  formikProps.touched.email && errors.email
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <div className="relative">
                                <TextInputValidate
                                  id="password"
                                  label="Password"
                                  type={showPassword ? 'text' : 'password'}
                                  className="w-full"
                                  required
                                  name="password"
                                  placeholder="Please enter password here..."
                                  value={values.password}
                                  errorMsg={errorInfo?.password}
                                  onChange={formikProps.handleChange}
                                  error={
                                    formikProps.touched.password &&
                                    Boolean(errors.password)
                                  }
                                  helperText={
                                    formikProps.touched.password &&
                                    errors.password
                                  }
                                />
                                <div
                                  className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                >
                                  {showPassword ? (
                                    <i className="fas fa-eye-slash text-slate-500" />
                                  ) : (
                                    <i className="fas fa-eye text-slate-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <div className="relative">
                                <TextInputValidate
                                  id="password_confirmation"
                                  label="Confirm Password"
                                  type={
                                    showConfirmationPassword
                                      ? 'text'
                                      : 'password'
                                  }
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
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="relative flex py-5 items-center w-full mx-auto">
                            <div className="flex-shrink mr-4">
                              <h2 className="font-semibold text-xl text-blueGray-500">
                                Company Information
                              </h2>
                            </div>
                            <div className="flex-grow border-t border-blueGray-700" />
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <TextInputImage
                              label="Company Image"
                              id="company_img"
                              name="company_img"
                              className=""
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, image/webp"
                              errorMsg={errorInfo?.company_img}
                              onChange={(event) => {
                                formikProps.handleChange(event)
                                const file = event.target.files[0]
                                formikProps.setFieldValue('company_img', file)
                                const fileReader = new FileReader()
                                fileReader.onload = function (event) {
                                  setImageCompany(event.target.result)
                                }
                                if (event !== undefined && file !== undefined) {
                                  fileReader?.readAsDataURL(file)
                                }
                                //   };
                              }}
                              image={imageCompany}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <TextInputValidate
                              id="company_name"
                              label="Company Name"
                              className="w-full"
                              required
                              placeholder="Please enter company name here..."
                              name="company_name"
                              value={values.company_name}
                              errorMsg={errorInfo?.company_name}
                              onChange={formikProps.handleChange}
                              error={
                                formikProps.touched.company_name &&
                                Boolean(errors.company_name)
                              }
                              helperText={
                                formikProps.touched.company_name &&
                                errors.company_name
                              }
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-3">
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
                                formikProps.setFieldValue(
                                  'company_sector',
                                  value
                                )
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
                            {companySector?.value == 'other' && (
                              <div className="mt-2">
                                <TextInputValidate
                                  id="company_other"
                                  className="w-full"
                                  required
                                  type="text"
                                  name="company_other"
                                  value={values.company_other}
                                  errorMsg={errorInfo?.company_other}
                                  onChange={formikProps.handleChange}
                                  error={
                                    formikProps.touched.company_other &&
                                    Boolean(errors.company_other)
                                  }
                                  helperText={
                                    formikProps.touched.company_other &&
                                    errors.company_other
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <TextInputPhoneValidate
                              label="Phone"
                              id="company_phone"
                              className="w-full"
                              searchable
                              required
                              type="text"
                              name="company_phone"
                              name2="company_code_country"
                              value={values.company_phone}
                              value2={values.company_code_country}
                              errorMsg={errorInfo?.company_phone}
                              onChange={formikProps.handleChange}
                              onChange2={(event) => {
                                formikProps.setFieldValue(
                                  'company_code_country',
                                  event
                                )
                              }}
                              error={
                                (formikProps.touched.company_phone &&
                                  Boolean(errors.company_phone)) ||
                                (formikProps.touched.company_code_country &&
                                  Boolean(errors.company_code_country))
                              }
                              helperText={
                                (formikProps.touched.company_phone &&
                                  errors.company_phone) ||
                                (formikProps.touched.company_code_country &&
                                  errors.company_code_country)
                              }
                              placeholder="Company phone number"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full md:w-1/2 px-3">
                            <CountrySelector
                              searchable
                              name="company_country"
                              label="Country"
                              value={values.company_country}
                              required
                              onChange={(value) => {
                                formikProps.setFieldValue(
                                  'company_country',
                                  value
                                )
                                formikProps.setFieldValue(
                                  'company_province',
                                  ''
                                )
                                formikProps.setFieldValue(
                                  'company_province_other',
                                  ''
                                )
                                setCompanyProvince(null)
                                formikProps.setFieldValue('company_city', '')
                                const Country = countries?.find(
                                  (e) => e?.name == value?.value
                                )
                                setStatCountry({...Country})
                              }}
                              onBlur={formikProps.onBlur}
                              errorMsg={errorInfo?.company_country}
                              error={
                                formikProps.touched.company_country &&
                                Boolean(errors.company_country)
                              }
                              helperText={
                                formikProps.touched.company_country &&
                                errors.company_country
                              }
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <ProvinceSelector
                              searchable
                              name="company_province"
                              label="Province"
                              value={values.company_province}
                              required
                              onChange={(value) => {
                                formikProps.setFieldValue(
                                  'company_province',
                                  value
                                )
                                formikProps.setFieldValue('company_city', '')
                                formikProps.setFieldValue(
                                  'company_province_other',
                                  ''
                                )
                                const province = provincies?.find(
                                  (e) => e?.name == value.value
                                )
                                setStateProvince({...province})
                                setCompanyProvince(value)
                              }}
                              countryId={stateCountry?.id}
                              onBlur={formikProps.onBlur}
                              errorMsg={errorInfo?.company_province}
                              error={
                                formikProps.touched.company_province &&
                                Boolean(errors.company_province)
                              }
                              helperText={
                                formikProps.touched.company_province &&
                                errors.company_province
                              }
                            />
                            {companyProvince?.value?.toLowerCase() ==
                              'other' && (
                                <div className="mt-2">
                                  <TextInputValidate
                                    id="company_province_other"
                                    className="w-full"
                                    required
                                    type="text"
                                    name="company_province_other"
                                    value={values.company_province_other}
                                    errorMsg={errorInfo?.company_province_other}
                                    onChange={formikProps.handleChange}
                                    error={
                                      formikProps.touched
                                        .company_province_other &&
                                      Boolean(errors.company_province_other)
                                    }
                                    helperText={
                                      formikProps.touched
                                        .company_province_other &&
                                      errors.company_province_other
                                    }
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <CitySelector
                              searchable
                              label="City"
                              className="w-full"
                              required
                              id="company_city"
                              name="company_city"
                              value={values.company_city}
                              errorMsg={errorInfo?.company_city}
                              provinceId={stateProvince?.id}
                              onChange={(value) => {
                                formikProps.setFieldValue('company_city', value)
                                setCompanyCityOther(value)
                                formikProps.setFieldValue(
                                  'company_city_other',
                                  ''
                                )
                              }}
                              error={
                                formikProps.touched.company_city &&
                                Boolean(errors.company_city)
                              }
                              helperText={
                                formikProps.touched.company_city &&
                                errors.company_city
                              }
                            />
                            {companyCityOther?.value?.toLowerCase() ===
                              'other' && (
                                <div className="mt-2">
                                  <TextInputValidate
                                    id="company_city_other"
                                    className="w-full"
                                    required
                                    type="text"
                                    name="company_city_other"
                                    value={values.company_city_other}
                                    errorMsg={errorInfo?.company_city_other}
                                    onChange={formikProps.handleChange}
                                    error={
                                      formikProps.touched.company_city_other &&
                                      Boolean(errors.company_city_other)
                                    }
                                    helperText={
                                      formikProps.touched.company_city_other &&
                                      errors.company_city_other
                                    }
                                  />
                                </div>
                              )}
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/2">
                              <TextInputValidate
                                id="company_zip"
                                label="Postal Code"
                                className="w-full"
                                required
                                name="company_zip"
                                value={values.company_zip}
                                errorMsg={errorInfo?.company_zip}
                                onChange={formikProps.handleChange}
                                placeholder="Please enter company zip here..."
                              // error={
                              //   formikProps.touched.company_zip &&
                              //   Boolean(errors.company_zip)
                              // }
                              // helperText={
                              //   formikProps.touched.company_zip &&
                              //   errors.company_zip
                              // }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <AreaInputValidation
                              rows={5}
                              label="Address 1"
                              name="company_address"
                              required
                              characterCount={firstAddressCharacterCount}
                              characterLimit={firstAddressCharacterLimit}
                              placeholder="Please enter company address 1 here..."
                              value={formikProps.company_address}
                              errorMsg={errorInfo?.company_address}
                              onChange={(event) => {
                                const value = event?.target?.value
                                formikProps.handleChange(event)
                                formikProps.setFieldValue(
                                  'company_address',
                                  value
                                )
                                firstAddressHandler(value)
                              }}
                              error={
                                formikProps.touched.company_address &&
                                Boolean(errors.company_address)
                              }
                              helperText={
                                formikProps.touched.company_address &&
                                errors.company_address
                              }
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <AreaInputValidation
                              rows={5}
                              label="Address 2"
                              characterCount={secondAddressCharacterCount}
                              characterLimit={secondAddressCharacterLimit}
                              name="company_address2"
                              required
                              placeholder="Please enter company address 2 here..."
                              value={formikProps.company_address2}
                              errorMsg={errorInfo?.company_address2}
                              onChange={(event) => {
                                const value = event?.target?.value
                                formikProps.handleChange(event)
                                formikProps.setFieldValue(
                                  'company_address2',
                                  value
                                )
                                secondAddressHandler(value)
                              }}
                              error={
                                formikProps.touched.company_address2 &&
                                Boolean(errors.company_address2)
                              }
                              helperText={
                                formikProps.touched.company_address2 &&
                                errors.company_address2
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="relative flex py-5 items-center w-full mx-auto">
                            <div className="flex-shrink mr-4">
                              <h2 className="font-semibold text-xl text-blueGray-500">
                                Documents
                              </h2>
                            </div>
                            <div className="flex-grow border-t border-blueGray-700" />
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <TextInputDocument
                              label="Company Registration Document"
                              id="company_RegistrationDocument"
                              name="company_RegistrationDocument"
                              className=""
                              type="file"
                              onChange={({target}) => {
                                formikProps.setFieldValue(
                                  'company_RegistrationDocument',
                                  target?.files[0]
                                )
                              }}
                              errorMsg={errorInfo?.company_RegistrationDocument}
                              error={
                                formikProps.touched
                                  .company_RegistrationDocument &&
                                Boolean(errors.company_RegistrationDocument)
                              }
                              helperText={
                                formikProps.touched
                                  .company_RegistrationDocument &&
                                errors.company_RegistrationDocument
                              }
                            />
                            <TextInputDocument
                              label="Certification of Activity"
                              id="company_CertificationofActivity"
                              name="company_CertificationofActivity"
                              className=""
                              type="file"
                              required
                              onChange={({target}) => {
                                formikProps.setFieldValue(
                                  'company_CertificationofActivity',
                                  target?.files[0]
                                )
                              }}
                              errorMsg={
                                errorInfo?.company_CertificationofActivity
                              }
                              error={
                                formikProps.touched
                                  .company_CertificationofActivity &&
                                Boolean(errors.company_CertificationofActivity)
                              }
                              helperText={
                                formikProps.touched
                                  .company_CertificationofActivity &&
                                errors.company_CertificationofActivity
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-center mb-6 mt-20">
                          <div className="text-center ">
                            <div className="w-full">
                              {isAgreeTermCondtionOfSaleMessage && (
                                <div>
                                  <span className=" inline-block mr-2 align-middle">
                                    <i className="text-red-500 fas fa-bell" />
                                  </span>
                                  <span className="font-light text-sm">
                                    <i className="text-red-500 capitalize">
                                      {isAgreeTermCondtionOfSaleMessage}
                                    </i>
                                  </span>
                                </div>
                              )}
                              <div className='text-center items-center flex'>
                                <input
                                  id="termOfSale"
                                  type="checkbox"
                                  checked={isAgreeTermCondtionOfSale}
                                  onChange={handleisAgreeTermCondtionOfSale}
                                  className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label className="inline-flex items-center cursor-pointer" htmlFor='termOfSale'>
                                  <span className="ms-1 text-sm font-medium">
                                    I agree with the {' '}
                                  </span>
                                </label>
                                <span className="ms-1 text-sm font-medium cursor-pointer">
                                  <a className='text-blue-600 hover:underline' onClick={() => {
                                    setStateTOCSale(true)
                                  }}>
                                    Terms and Conditions of Sale.{' '}
                                  </a>
                                </span>
                              </div>
                            </div>
                            <div className="w-full">
                              {isAgreeTermCondtionOfExportMessage && (
                                <div>
                                  <span className="inline-block mr-2 align-middle">
                                    <i className="text-red-500 fas fa-bell" />
                                  </span>
                                  <span className="font-light text-sm">
                                    <i className="text-red-500 capitalize">
                                      {isAgreeTermCondtionOfExportMessage}
                                    </i>
                                  </span>
                                </div>
                              )}
                              <div className='text-center items-center flex'>
                                <input
                                  id="termOfExport"
                                  type="checkbox"
                                  checked={isAgreeTermCondtionOfExport}
                                  onChange={handleisAgreeTermCondtionOfExport}
                                  className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label className="inline-flex items-center cursor-pointer" htmlFor="termOfExport">
                                  <span className="ms-1 text-sm font-medium">
                                    I agree with the
                                  </span>
                                </label>
                                <span className="ms-1 text-sm font-medium cursor-pointer">                                    
                                  <a className=' text-blue-600 hover:underline' onClick={() => {
                                    setStateTOCExport(true)
                                  }}>
                                    Terms and Conditions of Export.{' '}
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="mt-5">
                            <PrimaryButton
                              disabled={isLoading}
                              type="submit"
                              className="w-full md:w-6/12 font-bold uppercase"
                            >
                              {isLoading && (
                                <i className="fas fa-hourglass fa-spin text-white mr-2" />
                              )}
                              Register
                            </PrimaryButton>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
                {succesStatus && (
                  <div className="text-center mt-10 mb-14">
                    <h1 className="text-2xl">
                      Your Registration is Successfull!
                    </h1>
                    <h2 className="text-blueGray-500">
                      Your account need a confirmation from EXEpart Registration
                      Expert, please{' '}
                      <Link
                        href="/auth/login"
                        className="text-blueGray-700 underline"
                      >
                        login
                      </Link>{' '}
                      to check your account
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {stateTOCSale ? (
        <TermAndConditionOfSaleModal
          title="Terms and Conditions of Sale
        "
          acceptModal={setIsAgreeTermCondtionOfSale}
          modalBoolean={isAgreeTermCondtionOfSale}
          setShowModal={setStateTOCSale}
        />
      ) : null}

      {stateTOCExport ? (
        <TermsandConditionofExportModal
          title="Terms and Condition of Export"
          acceptModal={setIsAgreeTermCondtionOfExport}
          modalBoolean={isAgreeTermCondtionOfExport}
          setShowModal={setStateTOCExport}
        />
      ) : null}
    </>
  )
}
