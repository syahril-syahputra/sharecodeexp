import React, {useState, useEffect} from 'react'
import axios from 'lib/axios'
import * as Yup from 'yup'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import useDataProvince from '@/hooks/useProvince'
import {Form, Formik} from 'formik'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import SelectInputSector from '@/components/Interface/Form/SelectInputSector'
import TextInputPhoneValidate from '@/components/Interface/Form/TextInputPhoneValidate'
import CountrySelector from '@/components/Shared/CountrySelectorEdit'
import ProvinceSelector from '@/components/Shared/ProvinceSelector'
import CitySelector from '@/components/Shared/CitySelector'
import useDataCity from '@/hooks/useCity'
import AreaInputValidation from '@/components/Interface/Form/AreaInputValidation'
import ErrorInput from '@/components/Shared/ErrorInput';
import {PostalCode} from '@/utils/postalCode'
import TextInput from '@/components/Interface/Form/TextInput'
import {getValue} from '@/utils/general'

export default function MyCompany({session, sectorlist, countryList}) {
  console.log(countryList, '<<<countryList')
  const [errorInfo, setErrorInfo] = useState({})
  const [companySector, setCompanySector] = useState(null)
  const [stateDataCountry, setStateDataCountry] = useState(null)
  const [companyProvince, setCompanyProvince] = useState(null)
  const [companyCity, setCompanyCity] = useState(null)
  const [companyCodeCountry, setCompanyCodeCountry] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [stateProvince, setStateProvince] = useState(null)
  const [stateCity, setStateCity] = useState(null)
  const [dataSector, setDataSector] = useState([...sectorlist, {value: 'other', label: 'Other'}]);
  const [dataState, setDataState] = useState({value: 'other', label: 'Other'});
  const [packaging, setPackaging] = useState(null)

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

  function isMatchPostalCodePattern({id, Country, value}) {
    const findCodeRegex = PostalCode?.find(
      (e) => e?.id === id && e.country === Country
    )
    const regex = findCodeRegex?.Regex

    return regex?.test(value)
  }

  /**
   * Validation
   */

  const validationSchema = Yup.object({
    name: Yup.string().required('The company name field is required'),
    sector: Yup.mixed().required('The company sector field is required'),
    phone: Yup.mixed().required('The company phone field is required'),
    country: Yup.mixed().required(
      'The company country field is required'
    ),
    state: Yup.mixed().required(
      'The company province field is required'
    ),
    state_other: Yup.mixed().when('state', {
      is: (value) => typeof (value) === undefined ? value : typeof (value) == 'object' ? value?.value === 'Other' : value == 'Other',
      then: () =>
        Yup.mixed().required(
          'The company province with other field is required'
        ),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    city: Yup.mixed().required('The company city field is required'),
    city_other: Yup.mixed().when('city', {
      is: (value) => typeof (value) === undefined ? value : typeof (value) == 'object' ? value?.value === 'Other' : value == 'Other',
      then: () =>
        Yup.mixed().required('The company city with other field is required'),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    zip_code: Yup.mixed()
      .required('The company zip field is required')
      .test(
        'is-valid-compant-zip',
        "The company zip field should following country's zip code",
        (value) =>
          isMatchPostalCodePattern({
            id: stateDataCountry?.id,
            country: stateDataCountry?.value,
            value,
          })
      ),
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
    address2: Yup.mixed()
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
  })

  const countries = countryList
  const provincies = useDataProvince(stateDataCountry?.id)
  const cities = useDataCity(stateProvince?.id)
  const sectors = sectorlist

  const [isLoading, setIsLoading] = useState(true)




  const getDataFunc = async () => {
    setIsLoading(true)
    await axios
      .get(`/company`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setInputData({
          name: result.name,
          address: result.address,
          address2: result.address2,
          country: result.country,
          sector: result.sector,
          phone: result.phone,
          country_code: result.country_code,
          state: result?.state,
          state_other: result?.state_other,
          city: result?.city,
          city_other: result?.city,
          zip_code: result?.zip_code,
        })


        let oldSector = dataSector.find((item) => item.value == result.sector)
        let oldCountry = countries.find((e) => e.name == result.country)
        setCompanyCodeCountry({
          value: result?.country_code,
          label: result?.country_code,
        })
        setStateDataCountry({...oldCountry})
        if (oldSector) {
          setCompanySector({value: result.sector, label: result.sector})
          setPackaging({value: result.sector, label: result.sector})
        } else {
          setCompanySector({value: 'other', label: 'Other'})
          setPackaging({value: 'other', label: 'Other'})
        }

        if (oldCountry) {
          setCountry({
            ...stateCountry,
            value: result.country,
            label: result.country,
          })

        }

        let oldProvince = provincies?.find(
          (item) => item?.name == result?.state
        )
        setStateProvince({...oldProvince})
        if (oldProvince) {
          setCompanyProvince({value: result.state, label: result.state})
        } else {
          setCompanyProvince({value: 'other', label: 'Other'})
        }

        let oldCity = cities?.find((item) => item?.name == result?.city)
        setStateCity({...oldCity})
        if (oldCity) {
          setCompanyCity({value: result.city, label: result.city})
        } else {
          setCompanyCity({value: 'other', label: 'Other'})
        }
      })
      .catch(() => {
        toast.error(
          'Something went wrong. Can not load company data.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    address2: '',
    country: '',
    sector: '',
    phone: '',
    state: '',
    state_other: '',
    city: '',
    city_other: '',
    zip_code: '',
    country_code: '',
  })

  const setDataHandler = (input) => {
    setInputData({...inputData, [input.name]: input.value})
  }



  useEffect(() => {
    getDataFunc()
  }, [])


  useEffect(() => {
    setCountry({
      ...stateCountry,
      label: inputData?.country,
      label: inputData.country
    })
    setCompanyProvince({
      ...companyProvince,
      label: inputData?.state,
      value: inputData?.state
    })
    setCompanyCity({
      ...companyCity,
      label: inputData?.city,
      value: inputData?.city
    })
  }, [inputData?.state, inputData?.city,])

  const [stateCountry, setCountry] = useState()
  const [sector, setSector] = useState(null)

  const router = useRouter()
  const handleSubmit = async (values) => {
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    let payloadData = {}
    payloadData['state'] = getValue(values?.state) == 'Other' ? values.state_other : getValue(values?.state)
    payloadData['address'] = values?.address
    payloadData['address2'] = values?.address2
    payloadData['name'] = values?.name
    payloadData['country'] = getValue(values?.country)
    payloadData['sector'] = values?.sector ?? ''
    payloadData['phone'] = values?.phone
    payloadData['city'] = getValue(values?.city) == 'Other' ? values.city_other : getValue(values?.city)
    payloadData['zip_code'] = values?.zip_code
    payloadData['country_code'] = companyCodeCountry?.value ?? ''
    !inputData?.RegistrationDocument ? null : payloadData['RegistrationDocument'] = inputData?.RegistrationDocument
    !inputData?.CertificationofActivity ? null : payloadData['CertificationofActivity'] = inputData?.CertificationofActivity


    let formData = new FormData()
    for (const key in payloadData) {
      formData.append(key, payloadData[key])
    }

    await axios
      .post(`/master/company/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        router.replace('/admin/member/company/my-company')
        toast.success(
          'Your company have been updated successfully.',
          toastOptions
        )
        setIsLoading(false)
      })
      .catch((error) => {
        setErrorMessage('Please fill your form correctly')
        toast.error('Something went wrong.', toastOptions)
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
      .finally(() => {
        // setIsLoading(false)
      })
  }



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
      <Formik
        initialValues={inputData}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({values, errors, ...formikProps}) => {
          return (
            <Form
              className="p-2"
              id="Edit-company-form"
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
                    name="name"
                    placeholder="Please enter a company name here..."
                    value={values.name}
                    errorMsg={errorInfo?.name}
                    onChange={formikProps.handleChange}
                    error={formikProps.touched.name && Boolean(errors.name)}
                    helperText={formikProps.touched.name && errors.name}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <SelectInputSector
                    searchable
                    label="Sectors"
                    name={'sector'}
                    value={packaging}
                    required
                    options={dataSector}
                    errorMsg={errorInfo?.sector}
                    onChange={(value) => {
                      setCompanySector(value)
                      formikProps.setFieldValue('sector', value)
                      setInputData({...inputData, sector: ''})
                      setPackaging(value)
                      if (value.value != 'other') {
                        setInputData({...inputData, sector: value.value})
                      }
                    }}
                    onBlur={formikProps.onBlur}
                    error={formikProps.touched.sector && Boolean(errors.sector)}
                    helperText={formikProps.touched.sector && errors.sector}
                  />
                  {
                    packaging?.value?.toLowerCase() == 'other' && (
                      <TextInput
                        id="sector"
                        className="w-full"
                        required
                        type="text"
                        name="sector"
                        value={inputData?.sector}
                        error={errorInfo?.sector}
                        errorMsg={errorInfo?.sector}
                        onChange={(input) => setDataHandler(input)}
                      />
                    )
                  }
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextInputPhoneValidate
                    label="Phone"
                    id="phone"
                    className="w-full"
                    searchable
                    required
                    type="text"
                    name="phone"
                    name2="country_code"
                    value={values.phone}
                    value2={companyCodeCountry}
                    errorMsg={errorInfo?.phone}
                    onChange={formikProps.handleChange}
                    onChange2={(event) => {
                      formikProps.setFieldValue('country_code', event)
                      setCompanyCodeCountry(event)
                    }}
                    error={
                      (formikProps.touched.phone && Boolean(errors.phone)) ||
                      (formikProps.touched.country_code &&
                        Boolean(errors.country_code))
                    }
                    helperText={
                      (formikProps.touched.phone && errors.phone) ||
                      (formikProps.touched.country_code &&
                        errors.country_code)
                    }
                    placeholder="Please enter company phone number here..."
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <CountrySelector
                    searchable
                    name="country"
                    label="Country"
                    value={stateCountry}
                    required
                    onChange={(value) => {
                      setCountry(value)
                      formikProps.setFieldValue('country', value)
                      formikProps.setFieldValue('state', '')
                      formikProps.setFieldValue('')
                      setCompanyProvince(null)
                      const Country = countries.find(
                        (e) => e?.name == value?.value
                      )
                      setStateDataCountry({...Country})
                      setCompanyCity(null)
                    }}
                    onBlur={formikProps.onBlur}
                    errorMsg={errorInfo?.country}
                    error={
                      formikProps.touched.country && Boolean(errors.country)
                    }
                    helperText={formikProps.touched.country && errors.country}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <ProvinceSelector
                    searchable
                    id="state"
                    name="state"
                    label="Province"
                    value={companyProvince}
                    required
                    onChange={(value) => {
                      formikProps.setFieldValue('state', value)
                      formikProps.setFieldValue('state_other', '')
                      setCompanyProvince(value)
                      formikProps.setFieldValue('city', '')
                      const province = provincies?.find(
                        (e) => e?.name == value.value
                      )
                      setStateProvince({...province})
                      setCompanyCity(null)
                    }}
                    countryId={stateDataCountry?.id}
                    onBlur={formikProps.onBlur}
                    errorMsg={errorInfo?.state}
                    error={
                      (formikProps.touched.state && Boolean(errors.state)) || (formikProps.touched.state_other &&
                        Boolean(errors.state_other))
                    }
                    helperText={(formikProps.touched.state && errors.state) || (formikProps.touched.state_other &&
                      errors.state_other)}
                  />
                  {
                    companyProvince?.value?.toLowerCase() == 'other' && (
                      <TextInputValidate
                        id="state_other"
                        className="w-full"
                        required
                        type="text"
                        name="state_other"
                        value={values.state_other}
                        onChange={formikProps.handleChange}
                      />
                    )
                  }
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <CitySelector
                    searchable
                    label="City"
                    className="w-full"
                    required
                    id="city"
                    name="city"
                    value={companyCity}
                    errorMsg={errorInfo?.city}
                    provinceId={stateProvince?.id}
                    onChange={(value) => {
                      formikProps.setFieldValue('city', value)
                      formikProps.setFieldValue('city_other', '')
                      setCompanyCity(value)
                      const citiesArr = cities?.find(
                        (e) => e?.name == value.value
                      )
                      setStateCity({...citiesArr})
                    }}
                    error={(formikProps.touched.city && Boolean(errors.city)) || formikProps.touched.city_other &&
                      Boolean(errors.city_other)}
                    helperText={(formikProps.touched.city && errors.city) || (formikProps.touched.city_other &&
                      errors.city_other)}
                  />
                  {
                    companyCity?.value?.toLowerCase() == 'other' &&
                    (
                      <div className='mt-2'>
                        <TextInputValidate
                          id="city_other"
                          className="w-full"
                          required
                          type="text"
                          name="city_other"
                          value={values?.city_other}
                          onChange={formikProps?.handleChange}
                        />
                      </div>
                    )
                  }
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/2">
                    <TextInputValidate
                      id="zip_code"
                      label="Postal Code"
                      className="w-full"
                      required
                      name="zip_code"
                      value={values.zip_code}
                      errorMsg={errorInfo?.zip_code}
                      onChange={formikProps.handleChange}
                      placeholder="Please enter company zip here..."
                      error={
                        formikProps.touched.zip_code &&
                        Boolean(errors.zip_code)
                      }
                      helperText={
                        formikProps.touched.zip_code &&
                        errors.zip_code
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <AreaInputValidation
                    rows={5}
                    label="Address 1"
                    name="address"
                    required
                    characterCount={firstAddressCharacterCount}
                    characterLimit={firstAddressCharacterLimit}
                    placeholder="Please enter company address 1 here..."
                    value={values.address}
                    errorMsg={errorInfo?.address}
                    onChange={(event) => {
                      const value = event?.target?.value
                      formikProps.handleChange(event)
                      formikProps.setFieldValue(
                        'address',
                        value
                      )
                      firstAddressHandler(value)
                    }}
                    error={
                      formikProps.touched.address &&
                      Boolean(errors.address)
                    }
                    helperText={
                      formikProps.touched.address &&
                      errors.address
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">

                  <AreaInputValidation
                    rows={5}
                    label="Address 2"
                    characterCount={secondAddressCharacterCount}
                    characterLimit={secondAddressCharacterLimit}
                    name="address2"
                    required
                    placeholder="Please enter company address 2 here..."
                    value={values.address2}
                    errorMsg={errorInfo?.address2}
                    onChange={(event) => {
                      const value = event?.target?.value
                      formikProps.handleChange(event)
                      formikProps.setFieldValue(
                        'address2',
                        value
                      )
                      secondAddressHandler(value)
                    }}
                    error={
                      formikProps.touched.address2 &&
                      Boolean(errors.address2)
                    }
                    helperText={
                      formikProps.touched.address2 &&
                      errors.address2
                    }
                  />
                </div>
              </div>

              <div className="mt-8 mb-20">
                <div className="relative flex py-5 items-center w-full mx-auto">
                  <div className="flex-grow border-t border-blueGray-700"></div>
                  <div className="flex-shrink mx-4"><h2 className="font-semibold text-xl text-blueGray-500">Documents</h2></div>
                  <div className="flex-grow border-t border-blueGray-700"></div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Company Registration Document (Upload if only change)
                    </label>
                    <div className="p-5 border-dashed border-2 border-indigo-200">
                      <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                        <div className='text-center my-auto'>
                          <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                        </div>
                        <div className="text-xs ">
                          <p>PDF file size no more than 10MB</p>
                          <input
                            className="mt-3"
                            type="file"
                            accept='.pdf'
                            name='RegistrationDocument'
                            onChange={({target}) =>
                              setInputData({...inputData, RegistrationDocument: target.files[0]})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {errorInfo.RegistrationDocument &&
                      <ErrorInput error={errorInfo.RegistrationDocument} />
                    }
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Certification of Activity (Upload if only change)
                    </label>
                    <div className="p-5 border-dashed border-2 border-indigo-200">
                      <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                        <div className='text-center my-auto'>
                          <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                        </div>
                        <div className="text-xs ">
                          <p>PDF file size no more than 10MB</p>
                          <input
                            className="mt-3"
                            type="file"
                            accept='.pdf'
                            name="CertificationofActivity"
                            onChange={({target}) =>
                              setInputData({...inputData, CertificationofActivity: target.files[0]})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {errorInfo.CertificationofActivity &&
                      <ErrorInput error={errorInfo.CertificationofActivity} />
                    }
                  </div>
                </div>
              </div>

              <div className="text-center mb-10 w-1/2 mx-auto">
                <i className="text-light italic text-red-500">Note: Updating your Company causing your Member Status become pending.</i>
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
                    {isLoading &&
                      <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                    }
                    Update
                  </WarningButton>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </PrimaryWrapper>
  )
}

MyCompany.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const loadSectors = await axios.get(`/sectorlist`)
  const loadCountries = await axios.get(`/region/country`)
  const sectorlist = loadSectors.data.data
  const countryList = loadCountries?.data.data

  return {
    props: {
      session,
      routeParam: context.query,
      sectorlist,
      countryList
    },
  }
}
