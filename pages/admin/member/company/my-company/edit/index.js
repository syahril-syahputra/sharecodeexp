import React, {useState, useEffect} from 'react'
import axios from 'lib/axios'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import ErrorInput from '@/components/Shared/ErrorInput'
import {useRouter} from 'next/router'
import CountrySelectorInitial from '@/components/Shared/CountrySelectorInitial'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import TextInput from '@/components/Interface/Form/TextInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import AreaInput from '@/components/Interface/Form/AreaInput'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import ProvinceSelectorInitial from '@/components/Shared/ProvinceSelectorInitial'
import CitySelectorInitial from '@/components/Shared/CitySelectorInitial'
import useDataCountry from '@/hooks/useCountry'
import useDataProvince from '@/hooks/useProvince'
import {Form, Formik} from 'formik'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import SelectInputSector from '@/components/Interface/Form/SelectInputSector'
import useSctor from '@/hooks/useSctor'
import TextInputPhoneValidate from '@/components/Interface/Form/TextInputPhoneValidate'
import CountrySelector from '@/components/Shared/CountrySelector'
import ProvinceSelector from '@/components/Shared/ProvinceSelector'
import CitySelector from '@/components/Shared/CitySelector'
import useDataCity from '@/hooks/useCity'
import AreaInputValidation from '@/components/Interface/Form/AreaInputValidation'

export default function MyCompany({session, sectorlist}) {
  const [errorInfo, setErrorInfo] = useState({})
  const [companySector, setCompanySector] = useState(null)
  const [stateDataCountry, setStateDataCountry] = useState(null)
  const [companyProvince, setCompanyProvince] = useState(null)
  const [companyCity, setCompanyCity] = useState(null)
  const [provinceCompanyData, setProvinceCompanyData] = useState(null)
  const [companyCodeCountry, setCompanyCodeCountry] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [stateProvince, setStateProvince] = useState(null)
  const [firstAddressCharacterCount, setFirstAddressCharacterCount] =
    useState(0)

  const [secondAddressCharacterCount, setSecondAddressCharacterCount] =
    useState(0)
  const secondAddressCharacterLimit = 100
  const firstAddressCharacterLimit = 100
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

  const countries = useDataCountry()
  const provincies = useDataProvince(stateDataCountry?.id)
  console.log(provincies, '<<<provincies')
  const cities = useDataCity(stateProvince?.id)
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
        console.log(result, '<<<result')
        setInputData({
          name: result.name,
          address: result.address,
          address2: result.address2,
          country: result.country,
          sector: result.sector,
          phone: result.phone,
          company_code_country: result.phone,
          state: result?.state,
          company_other: '',
          city: result?.city,
          zip_code: result?.zip_code,
        })

        let oldSector = sectors.find((item) => item.value == result.sector)
        console.log(oldSector, '<<<oldSector')
        let oldCountry = countries.find((e) => e.name == result.country)
        setStateDataCountry({...oldCountry})
        if (oldSector) {
          setSector({value: result.sector, label: result.sector})
          setCompanySector({value: result.sector, label: result.sector})
        } else {
          setSector({value: 'other', label: 'Other'})
          setCompanySector({value: 'other', label: 'Other'})
        }

        if (oldCountry) {
          setCountry({
            value: result.country,
            label: result.country,
          })
          setCompanyCodeCountry({
            value: oldCountry?.phonecode,
            label: oldCountry?.phonecode,
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
        console.log(oldCity, '<<oldCity')
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

  const UseProvince = (countryId) => {
    console.log(countryId, '<<<countryId')
    if (countryId) {
      const provinces = useDataProvince(countryId)
      console.log(provinces, '<<<<provinces')
    }

  }

  useEffect(() => {
    getDataFunc()
  }, [])

  // update data
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    address2: '',
    country: '',
    sector: '',
    phone: '',
    state: '',
    city: '',
    zip_code: '',
    state_other: '',
    city_other: '',
    company_other: '',
    company_code_country: '',
  })

  const setDataHandler = (input) => {
    setInputData({...inputData, [input.name]: input.value})
  }

  //country handle
  const [stateCountry, setCountry] = useState()

  const countryHandleChange = (value) => {
    setInputData({...inputData, country: value.label})
    setCountry(value)
  }

  const [stateData, setStateData] = useState(null)
  const provinceHandleChange = (value) => {
    setInputData({...inputData, state: ''})
    setStateData(value)
    if (value?.value != 'other') {
      setInputData({...inputData, state: value.value})
    }
  }

  const [stateDataCity, setStateDataCity] = useState(null)
  console.log(stateDataCity, '<<<stateDataCity')
  const cityHandleChange = (value) => {
    console.log(value, '<<<valueCityHandle')
    setInputData({...inputData, city: ''})
    // setStateDataCity(value)
    if (value?.value != 'other') {
      // setStateDataCity(value)
      setInputData({...inputData, city: value.value})
    }
  }

  // const [sectors, setSectors] = useState([
  //   ...sectorlist,
  //   { value: 'other', label: 'Other' },
  // ])

  const sectors = useSctor()
  console.log(sectors, '<<<sectors')
  const [sector, setSector] = useState(null)
  const handleSectorChange = (value) => {
    setInputData({...inputData, sector: ''})
    setSector(value)
    if (value.value != 'other') {
      setInputData({...inputData, sector: value.value})
    }
  }

  //update handler
  const router = useRouter()
  const handleSubmit = async (values) => {
    console.log(values, '<<<values')
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    let payloadData = {}
    payloadData['state'] = values.province.value
    // payloadData['state'] =
    //   inputData?.state?.toLowerCase() === 'other'
    //     ? inputData?.state_other
    //     : inputData?.state
    payloadData['address'] = values?.address
    payloadData['address2'] = values?.address2
    payloadData['name'] = values?.name
    payloadData['country'] = values?.country?.value
    payloadData['sector'] = values?.sector?.value
    payloadData['phone'] = values?.phone
    payloadData['city'] = values?.city?.value
    payloadData['zip_code'] = values?.zip_code

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
      {/* <form onSubmit={handleSubmit} className="p-2"></form> */}
      <Formik
        initialValues={inputData}
        onSubmit={handleSubmit}
        enableReinitialize
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
                    value={companySector}
                    required
                    options={sectors}
                    errorMsg={errorInfo?.sector}
                    onChange={(value) => {
                      setCompanySector(value)
                      formikProps.setFieldValue('sector', value)
                    }}
                    onBlur={formikProps.onBlur}
                    error={formikProps.touched.sector && Boolean(errors.sector)}
                    helperText={formikProps.touched.sector && errors.sector}
                  />
                  {companySector?.value === 'other' && (
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
                    id="phone"
                    className="w-full"
                    searchable
                    required
                    type="text"
                    name="phone"
                    name2="company_code_country"
                    value={values.phone}
                    value2={companyCodeCountry}
                    errorMsg={errorInfo?.phone}
                    onChange={formikProps.handleChange}
                    onChange2={(event) => {
                      formikProps.setFieldValue('company_code_country', event)
                      setCompanyCodeCountry(event)
                    }}
                    error={
                      (formikProps.touched.phone && Boolean(errors.phone)) ||
                      (formikProps.touched.company_code_country &&
                        Boolean(errors.company_code_country))
                    }
                    helperText={
                      (formikProps.touched.phone && errors.phone) ||
                      (formikProps.touched.company_code_country &&
                        errors.company_code_country)
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
                      formikProps.setFieldValue('province', '')
                      formikProps.setFieldValue('')
                      setCompanyProvince(null)
                      const Country = countries.find(
                        (e) => e?.name == value?.value
                      )
                      setStateDataCountry({...Country})
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
                    name="province"
                    label="Province"
                    value={companyProvince}
                    required
                    onChange={(value) => {
                      formikProps.setFieldValue('province', value)
                      setCompanyProvince(value)
                      formikProps.setFieldValue('city', '')
                      const province = provincies?.find(
                        (e) => e?.name == value.value
                      )
                      setStateProvince({...province})
                    }}
                    countryId={stateDataCountry?.id}
                    onBlur={formikProps.onBlur}
                    errorMsg={errorInfo?.province}
                    error={
                      formikProps.touched.province && Boolean(errors.province)
                    }
                    helperText={formikProps.touched.province && errors.province}
                  />
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
                      // setStateDataCity(value)
                    }}
                    error={formikProps.touched.city && Boolean(errors.city)}
                    helperText={formikProps.touched.city && errors.city}
                  />
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
  const sectorlist = loadSectors.data.data

  return {
    props: {
      session,
      routeParam: context.query,
      sectorlist,
    },
  }
}
