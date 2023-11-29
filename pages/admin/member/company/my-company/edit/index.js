import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import ErrorInput from '@/components/Shared/ErrorInput'
import { useRouter } from 'next/router'
import CountrySelectorInitial from '@/components/Shared/CountrySelectorInitial'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
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
import { Form, Formik } from 'formik'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import SelectInputSector from '@/components/Interface/Form/SelectInputSector'
import useSctor from '@/hooks/useSctor'
import TextInputPhoneValidate from '@/components/Interface/Form/TextInputPhoneValidate'
import CountrySelector from '@/components/Shared/CountrySelector'
import ProvinceSelector from '@/components/Shared/ProvinceSelector'
import CitySelector from '@/components/Shared/CitySelector'
import useDataCity from '@/hooks/useCity'

export default function MyCompany({ session, sectorlist }) {
  const [errorInfo, setErrorInfo] = useState({})
  const [companySector, setCompanySector] = useState(null)
  const [stateDataCountry, setStateDataCountry] = useState(null)
  const [companyProvince, setCompanyProvince] = useState(null)
  const [companyCity, setCompanyCity] = useState(null)
  const [provinceCompanyData, setProvinceCompanyData] = useState(null)
  const [companyCodeCountry, setCompanyCodeCountry] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [stateProvince, setStateProvince] = useState(null)

  function isEmailCompany(email) {
    return /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.id)(?!aol.com)(?!live.com)(?!outlook.com)(?!inbox.com)(?!icloud.com)(?!mail.com)(?!gmx.com)(?!yandex.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/gm.test(
      email
    )
  }

  function isMatchPostalCodePattern({ id, Country, value }) {
    const findCodeRegex = PostalCode?.find(
      (e) => e?.id === id && e.country === Country
    )
    const regex = findCodeRegex?.Regex

    return regex.test(value)
  }

  const countries = useDataCountry()
  const provincies = useDataProvince(stateDataCountry?.id)
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
        let oldCountry = countries.find((e) => e.name == result.country)
        setStateDataCountry({ ...oldCountry })
        if (oldSector) {
          setSector({ value: result.sector, label: result.sector })
          setCompanySector({ value: result.sector, label: result.sector })
        } else {
          setSector({ value: 'other', label: 'Other' })
          setCompanySector({ value: 'other', label: 'Other' })
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
        setStateProvince({ ...oldProvince })
        if (oldProvince) {
          setCompanyProvince({ value: result.state, label: result.state })
        } else {
          setCompanyProvince({ value: 'other', label: 'Other' })
        }

        let oldCity = cities?.find((item) => item?.name == result?.city)
        console.log(oldCity, '<<oldCity')
        if (oldCity) {
          setCompanyCity({ value: result.city, label: result.city })
        } else {
          setCompanyCity({ value: 'other', label: 'Other' })
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
    // const provinces = useDataProvince(countryId)
    // console.log(provinces, '<<<<provinces')
    // return provinces
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
    setInputData({ ...inputData, [input.name]: input.value })
  }

  //country handle
  const [stateCountry, setCountry] = useState()

  const countryHandleChange = (value) => {
    setInputData({ ...inputData, country: value.label })
    setCountry(value)
  }

  const [stateData, setStateData] = useState(null)
  const provinceHandleChange = (value) => {
    setInputData({ ...inputData, state: '' })
    setStateData(value)
    if (value?.value != 'other') {
      setInputData({ ...inputData, state: value.value })
    }
  }

  const [stateDataCity, setStateDataCity] = useState(null)
  console.log(stateDataCity, '<<<stateDataCity')
  const cityHandleChange = (value) => {
    console.log(value, '<<<valueCityHandle')
    setInputData({ ...inputData, city: '' })
    // setStateDataCity(value)
    if (value?.value != 'other') {
      // setStateDataCity(value)
      setInputData({ ...inputData, city: value.value })
    }
  }

  // const [sectors, setSectors] = useState([
  //   ...sectorlist,
  //   { value: 'other', label: 'Other' },
  // ])

  const sectors = useSctor()

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
    let payloadData = {}
    payloadData['state'] =
      inputData?.state?.toLowerCase() === 'other'
        ? inputData?.state_other
        : inputData?.state
    payloadData['address'] = inputData?.address
    payloadData['address2'] = inputData?.address2
    payloadData['name'] = inputData?.name
    payloadData['country'] = inputData?.country
    payloadData['sector'] = inputData?.sector
    payloadData['phone'] = inputData?.phone
    payloadData['city'] = inputData?.city
    payloadData['zip_code'] = inputData?.zip_code

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
        {({ values, errors, ...formikProps }) => {
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
                      setStateDataCountry({ ...Country })
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
                      setStateProvince({ ...province })
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
