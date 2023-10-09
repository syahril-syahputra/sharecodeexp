/* eslint-disable react/jsx-no-target-blank */
import * as Yup from 'yup';
import React, {useState, useMemo, useEffect} from 'react';
import axios from 'lib/axios';
import Image from 'next/image';
import {PageSEO} from '@/components/Utils/SEO';
import siteMetadata from '@/utils/siteMetadata';
import Link from 'next/link';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footers/Footer.js';
import ImageLogo from '@/components/ImageLogo/ImageLogo';
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import ErrorInput from '@/components/Shared/ErrorInput';
import TextInput from '@/components/Interface/Form/TextInput';
import SelectInput from '@/components/Interface/Form/SelectInput';
import AreaInput from '@/components/Interface/Form/AreaInput';
import TextInputValidate from '@/components/Interface/Form/TextInputValidation';
import countryList from 'react-select-country-list';
import DangerNotification from '@/components/Interface/Notification/DangerNotification';
import CountrySelector from '@/components/Shared/CountrySelector';
import {PublicUrl} from '@/route/route-url';
import {Formik, Form} from 'formik';
import TextInputImage from '@/components/Interface/Form/TextInputImage';
import SelectInputSector from '@/components/Interface/Form/SelectInputSector';
import PhoneInputValidate from '@/components/Interface/Form/PhoneInputValidate';
import PhoneInput from 'react-phone-number-input';
import PhoneNumberInput from '@/components/Interface/Form/PhoneInputValidate2';

export default function Index() {
  const [isAgreeTermCondtionOfSale, setIsAgreeTermCondtionOfSale] =
    useState(false);
  const [
    isAgreeTermCondtionOfSaleMessage,
    setIsAgreeTermCondtionOfSaleMessage,
  ] = useState('');
  const [isAgreeTermCondtionOfExport, setIsAgreeTermCondtionOfExport] =
    useState(false);
  const [
    isAgreeTermCondtionOfExportMessage,
    setIsAgreeTermCondtionOfExportMessage,
  ] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const initialValue = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',

    // Company Information
    company_name: '',
    company_sector: '',
    company_phone: '',
    company_country: '',
    company_address: '',
    company_address2: '',
    company_zip: '',
    company_province: '',
    company_city: '',

    // Documents
    company_img: '',
    company_RegistrationDocument: '',
    company_CertificationofActivity: '',
  };

  const validFileExtensions = {
    image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
  };

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  function isEmailCompany(email) {
    return /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.id)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/gm.test(
      email
    );
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('The name field is required'),
    email: Yup.string()
      .email('Must be a valid email address')
      .test('is-valid-email', 'The email field should email company', (value) =>
        isEmailCompany(value)
      )
      .required('The email field is required'),
    password: Yup.string()
      .min(8, 'Password must have more than 8 characters')
      .required(`The password field is required`),
    password_confirmation: Yup.string()
      .min(8, 'Confirmation password must have more than 8 characters')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('The confirmation password field is required'),
    company_img: Yup.mixed()
      .required('The image company field is required')
      .test('is-valid-type', 'Not a valid image type', (value) =>
        isImage(value)
      ),
    company_name: Yup.string().required('The company name field is required'),
    company_sector: Yup.mixed().required(
      'The company sector field is required'
    ),
    company_phone: Yup.mixed().required('The company phone field is required'),
    company_city: Yup.mixed().required('The company city field is required'),
    company_zip: Yup.mixed().required('The company zip field is required'),
  });

  const [registrationInfo, setRegistrationInfo] = useState({
    //Account Information
    name: '',
    email: '',
    password: '',
    password_confirmation: '',

    //Company Information
    company_name: '',
    company_sector: '',
    company_phone: '',
    company_country: '',
    company_address: '',
    company_address2: '',
    company_zip: '',
    company_province: '',
    company_city: '',

    //Documents
    company_img: '',
    company_RegistrationDocument: '',
    company_CertificationofActivity: '',
  });

  const handleStringValueChange = (input) => {
    setRegistrationInfo({...registrationInfo, [input.name]: input.value});
  };

  const [firstAddressCharacterCount, setFirstAddressCharacterCount] =
    useState(0);
  const firstAddressCharacterLimit = 100;
  const firstAddressHandler = (input) => {
    setFirstAddressCharacterCount(input.value.length);
    setRegistrationInfo({...registrationInfo, [input.name]: input.value});
  };

  const [secondAddressCharacterCount, setSecondAddressCharacterCount] =
    useState(0);
  const secondAddressCharacterLimit = 100;
  const secondAddressHandler = (input) => {
    setSecondAddressCharacterCount(input.value.length);
    setRegistrationInfo({...registrationInfo, [input.name]: input.value});
  };

  const [country, setCountry] = useState(null);
  const countryHandleChange = (value) => {
    setCountry(value);
    setRegistrationInfo({...registrationInfo, company_country: value.label});
  };

  const [errorInfo, setErrorInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [succesStatus, setSuccesStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreeTermCondtionOfSale) {
      setIsAgreeTermCondtionOfSaleMessage(
        'Please agreed the Term and Conditions of Sale before continue.'
      );
      return;
    }
    if (!isAgreeTermCondtionOfExport) {
      setIsAgreeTermCondtionOfExportMessage(
        'Please agreed the Term and Conditions of Export before continue.'
      );
      return;
    }
    setErrorMessage(null);
    setErrorInfo(null);
    setIsLoading(true);

    let formData = new FormData();
    for (const key in registrationInfo) {
      formData.append(key, registrationInfo[key]);
    }
  };

  const handleisAgreeTermCondtionOfSale = () => {
    setIsAgreeTermCondtionOfSale((prev) => !prev);

    if (!isAgreeTermCondtionOfSale) {
      setIsAgreeTermCondtionOfSaleMessage();
    }
  };

  const handleisAgreeTermCondtionOfExport = () => {
    setIsAgreeTermCondtionOfExport((prev) => !prev);

    if (!isAgreeTermCondtionOfExport) {
      setIsAgreeTermCondtionOfExportMessage();
    }
  };

  const [imageCompany, setImageCompany] = useState(null);

  //option
  //sector option
  const [sectors, setSectors] = useState([{value: 'other', label: 'Other'}]);
  const loadSectors = async () => {};
  useEffect(() => {
    loadSectors();
  }, []);

  const [sector, setSector] = useState(null);

  //checking register button status enable or disable

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
                    {({values, errors, ...formikProps}) => {
                      return (
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
                              message={errorMessage}
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
                              <div className="flex-grow border-t border-blueGray-700"></div>
                            </div>
                            <div className="flex flex-wrap mb-6">
                              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <TextInputValidate
                                  id="name"
                                  label="Main Account Name"
                                  className="w-full"
                                  required
                                  name="name"
                                  placeholder={
                                    'Please enter account name here...'
                                  }
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
                                    placeholder={
                                      'Please enter password here...'
                                    }
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
                                      <i className="fas fa-eye-slash text-slate-500"></i>
                                    ) : (
                                      <i className="fas fa-eye text-slate-500"></i>
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
                                    placeholder={
                                      'Please enter confirm password here...'
                                    }
                                    name="password_confirmation"
                                    value={values.password_confirmation}
                                    errorMsg={errorInfo?.password_confirmation}
                                    onChange={formikProps.handleChange}
                                    error={
                                      formikProps.touched
                                        .password_confirmation &&
                                      Boolean(errors.password_confirmation)
                                    }
                                    helperText={
                                      formikProps.touched
                                        .password_confirmation &&
                                      errors.password_confirmation
                                    }
                                  />
                                  <div
                                    className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"
                                    onClick={() =>
                                      setShowConfirmationPassword(
                                        (prev) => !prev
                                      )
                                    }
                                  >
                                    {showConfirmationPassword ? (
                                      <i className="fas fa-eye-slash text-slate-500"></i>
                                    ) : (
                                      <i className="fas fa-eye text-slate-500"></i>
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
                              <div className="flex-grow border-t border-blueGray-700"></div>
                            </div>
                            <div className="flex flex-wrap mb-6">
                              <TextInputImage
                                id="company_img"
                                name="company_img"
                                className=""
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, image/webp"
                                required
                                value={values.company_img}
                                errorMsg={errorInfo?.company_img}
                                // onChange={formikProps.handleChange}
                                // onChange={companyImageHandler}
                                onChange={(event) => {
                                  formikProps.handleChange(event);
                                  console.log(event, '<<<event');
                                  //   const companyImageHandler = (e) => {
                                  let file = event.target.files[0];
                                  formikProps.setFieldValue(
                                    'company_image',
                                    file
                                  );
                                  console.log(file, '<<<file');
                                  const fileReader = new FileReader();
                                  console.log(fileReader, '<<<fileReader');
                                  fileReader.onload = function (event) {
                                    setImageCompany(event.target.result);
                                    // setRegistrationInfo({
                                    //   ...registrationInfo,
                                    //   company_img: file,
                                    // });
                                  };
                                  if (
                                    event !== undefined &&
                                    file !== undefined
                                  ) {
                                    fileReader?.readAsDataURL(file);
                                  }
                                  //   };
                                }}
                                image={imageCompany}
                                error={
                                  formikProps.touched.company_img &&
                                  Boolean(errors.company_img)
                                }
                                helperText={
                                  formikProps.touched.company_img &&
                                  errors.company_img
                                }
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
                                placeholder={
                                  'Please enter company name here...'
                                }
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
                                onChange={formikProps.handleChange}
                                error={
                                  formikProps.touched.company_sector &&
                                  Boolean(errors.company_sector)
                                }
                                helperText={
                                  formikProps.touched.company_sector &&
                                  errors.company_sector
                                }
                              />
                              {values.company_sector == 'other' && (
                                <div className="mt-2">
                                  <TextInputValidate
                                    id="company_sector"
                                    className="w-full"
                                    required
                                    type="text"
                                    name="company_sector"
                                    value={values.company_sector}
                                    errorMsg={errorInfo?.company_sector}
                                    onChange={formikProps.handleChange}
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
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <TextInputValidate
                                label="Phone"
                                id="company_phone"
                                className="w-full"
                                required
                                defaultCountry="TR"
                                type="text"
                                name="company_phone"
                                value={values.company_phone}
                                errorMsg={errorInfo?.company_phone}
                                onChange={formikProps.handleChange}
                                error={
                                  formikProps.touched.company_phone &&
                                  Boolean(errors.company_phone)
                                }
                                helperText={
                                  formikProps.touched.company_phone &&
                                  errors.company_phone
                                }
                                placeholder="Please enter company phone number here..."
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <TextInputValidate
                                label="City"
                                className="w-full"
                                required
                                id="company_city"
                                name="company_city"
                                value={values.company_city}
                                errorMsg={errorInfo?.company_city}
                                onChange={formikProps.handleChange}
                                error={
                                  formikProps.touched.company_city &&
                                  Boolean(errors.company_city)
                                }
                                helperText={
                                  formikProps.touched.company_city &&
                                  errors.company_city
                                }
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                              <div className="w-1/2 md:w-1/2">
                                <TextInputValidate
                                  id="company_zip"
                                  label="Postal Code"
                                  className="w-full"
                                  required
                                  name="company_zip"
                                  value={values.company_zip}
                                  errorMsg={errorInfo?.company_zip}
                                  onChange={formikProps.handleChange}
                                  error={
                                    formikProps.touched.company_zip &&
                                    Boolean(errors.company_zip)
                                  }
                                  helperText={
                                    formikProps.touched.company_zip &&
                                    errors.company_zip
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                              <CountrySelector
                                name="country"
                                value={country}
                                countryHandleChange={countryHandleChange}
                                errorMsg={errorInfo?.country}
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <TextInput
                                label="Province"
                                className="w-full"
                                required
                                name="company_province"
                                value={registrationInfo.company_province}
                                errorMsg={errorInfo?.company_province}
                                onChange={(input) =>
                                  handleStringValueChange(input)
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <AreaInput
                                rows={5}
                                characterCount={firstAddressCharacterCount}
                                characterLimit={firstAddressCharacterLimit}
                                label="Address 1"
                                name="company_address"
                                required
                                value={registrationInfo.company_address}
                                errorMsg={errorInfo?.company_address}
                                onChange={(input) => firstAddressHandler(input)}
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                              <AreaInput
                                rows={5}
                                characterCount={secondAddressCharacterCount}
                                characterLimit={secondAddressCharacterLimit}
                                label="Address 2"
                                name="company_address2"
                                required
                                value={registrationInfo.company_address2}
                                errorMsg={errorInfo?.company_address2}
                                onChange={(input) =>
                                  secondAddressHandler(input)
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
                              <div className="flex-grow border-t border-blueGray-700"></div>
                            </div>
                            <div className="flex flex-wrap mb-6">
                              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-last-name"
                                >
                                  Company Registration Document
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
                                        name="company_RegistrationDocument"
                                        accept=".pdf"
                                        onChange={({target}) =>
                                          setRegistrationInfo({
                                            ...registrationInfo,
                                            company_RegistrationDocument:
                                              target.files[0],
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                {errorInfo?.company_RegistrationDocument && (
                                  <ErrorInput
                                    error={
                                      errorInfo?.company_RegistrationDocument
                                    }
                                  />
                                )}
                              </div>
                              <div className="w-full md:w-1/2 px-3">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-last-name"
                                >
                                  Certification of Activity
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
                                        name="company_CertificationofActivity"
                                        accept=".pdf"
                                        onChange={({target}) =>
                                          setRegistrationInfo({
                                            ...registrationInfo,
                                            company_CertificationofActivity:
                                              target.files[0],
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                {errorInfo?.company_CertificationofActivity && (
                                  <ErrorInput
                                    error={
                                      errorInfo?.company_CertificationofActivity
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-center mb-6 mt-20">
                            <div className="text-center">
                              <div className="w-full">
                                {isAgreeTermCondtionOfSaleMessage && (
                                  <div>
                                    <span className=" inline-block mr-2 align-middle">
                                      <i className="text-red-500 fas fa-bell"></i>
                                    </span>
                                    <span className="font-light text-sm">
                                      <i className="text-red-500 capitalize">
                                        {isAgreeTermCondtionOfSaleMessage}
                                      </i>
                                    </span>
                                  </div>
                                )}
                                <input
                                  id="term"
                                  type="checkbox"
                                  checked={isAgreeTermCondtionOfSale}
                                  onChange={handleisAgreeTermCondtionOfSale}
                                  className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                  htmlFor="term"
                                  className="ml-2 text-sm font-medium text-gray-900"
                                >
                                  I agree with the{' '}
                                  <Link
                                    target="_blank"
                                    href={PublicUrl.conditionOfSale}
                                    className="text-blue-600 hover:underline"
                                  >
                                    Terms and Conditions of Sale
                                  </Link>
                                  .
                                </label>
                              </div>
                              <div className="w-full">
                                {isAgreeTermCondtionOfExportMessage && (
                                  <div>
                                    <span className=" inline-block mr-2 align-middle">
                                      <i className="text-red-500 fas fa-bell"></i>
                                    </span>
                                    <span className="font-light text-sm">
                                      <i className="text-red-500 capitalize">
                                        {isAgreeTermCondtionOfExportMessage}
                                      </i>
                                    </span>
                                  </div>
                                )}
                                <input
                                  id="policy"
                                  type="checkbox"
                                  checked={isAgreeTermCondtionOfExport}
                                  onChange={handleisAgreeTermCondtionOfExport}
                                  className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                  htmlFor="policy"
                                  className="ml-2 text-sm font-medium text-gray-900"
                                >
                                  I agree with the{' '}
                                  <Link
                                    target="_blank"
                                    href={PublicUrl.conditionOfExport}
                                    className="text-blue-600 hover:underline"
                                  >
                                    Terms and Conditions of Export
                                  </Link>
                                  .
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="mt-5">
                              <PrimaryButton
                                type="submit"
                                className="w-full md:w-6/12 font-bold uppercase"
                              >
                                {isLoading && (
                                  <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                                )}
                                Register
                              </PrimaryButton>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
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
    </>
  );
}
