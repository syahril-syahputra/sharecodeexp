import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// layout for page
import Admin from 'layouts/Admin.js'

// components
import CountrySelector from '@/components/Shared/CountrySelector'
import ErrorInput from '@/components/Shared/ErrorInput'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import TextInput from '@/components/Interface/Form/TextInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import AreaInput from '@/components/Interface/Form/AreaInput'
import NumberInput from '@/components/Interface/Form/NumberInput'

export default function MyProduct({ session }) {
  const [inputData, setInputData] = useState({
    AvailableQuantity: '',
    moq: '',
    packaging: '',
    country: '',
    ManufacturerNumber: '',
    Manufacture: '',
    Description: '',
    dateCode: '',
    category: '',
    subcategory_id: '',
    img: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setDataHandler = (input) => {
    setInputData({ ...inputData, [input.name]: input.value })
  }

  //country handle
  const [country, setCountry] = useState()
  const countryHandleChange = (value) => {
    setInputData({ ...inputData, country: value.label })
    setCountry(value)
  }

  const [descriptionCount, setDescriptionCount] = useState(0)
  const descriptionLimit = 100
  const descriptionHandler = (input) => {
    setDescriptionCount(input.value.length)
    setInputData({ ...inputData, [input.name]: input.value })
  }

  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)

    //regex check
    if (!/^[0-9+]*([+]?)+$/.test(inputData.dateCode)) {
      setErrorInfo({ dateCode: ['Wrong format!'] })
      setIsLoading(false)
      return
    }

    if (descriptionCount > descriptionLimit) {
      setErrorInfo({ Description: ['Exceed maximum character!'] })
      setIsLoading(false)
      return
    }

    let formData = new FormData()
    for (const key in inputData) {
      formData.append(key, inputData[key])
    }
    const response = await axios
      .post(`/companyproduct/create`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        router.replace('/admin/member/sellcomponents/component/pending')
        toast.success('Product has been added.', toastOptions)
      })
      .catch((error) => {
        setErrorMessage(
          error.data.message
            ? error.data.message
            : 'Please fill the form correctly'
        )
        toast.error(
          'Something went wrong. Check your form correctly.',
          toastOptions
        )
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  //option
  //packaging option
  const [packagings, setPackagings] = useState([
    { value: 'other', label: 'Other' },
  ])
  useEffect(() => {
    const loadPackagings = async () => {
      const response = await axios
        .get(`/packaginglist`)
        .then((response) => {
          setPackagings([
            ...response.data.data,
            { value: 'other', label: 'Other' },
          ])
        })
        .catch((error) => {
          // console.log('failed to load packaginglist')
        })
    }
    loadPackagings()
  }, [])

  const [packaging, setPackaging] = useState(null)
  const handlePackagingChange = (value) => {
    setInputData({ ...inputData, packaging: '' })
    setPackaging(value)
    if (value.value != 'other') {
      setInputData({ ...inputData, packaging: value.value })
    }
  }

  //option
  //categories option
  const [categories, setCategories] = useState([
    { value: 'loading', label: 'loading', disabled: true },
  ])
  useEffect(() => {
    const loadCategories = async () => {
      const response = await axios
        .get(`/categories`)
        .then((response) => {
          setCategories(response.data.data)
        })
        .catch((error) => {
          // console.log('failed to load categories')
        })
    }
    loadCategories()
  }, [])

  const [category, setCategory] = useState(null)
  const handleCategoryChange = (value) => {
    setCategory(value)
    setInputData({ ...inputData, category: value.value })
  }

  //option
  //sub-categories option
  const [subcategories, setSubCategories] = useState([
    {
      value: 'select category first',
      label: 'Select Category First',
      disabled: true,
    },
  ])
  useEffect(() => {
    const loadSubCategory = async (parent) => {
      setSubCategories([
        {
          value: 'select category first',
          label: 'Select Category First',
          disabled: true,
        },
      ])
      setSubCategory(null)
      setInputData({ ...inputData, subcategory_id: '' })

      const response = await axios
        .get(`/${parent}/subcategories?drop=1`)
        .then((response) => {
          setSubCategories(response.data.data)
        })
        .catch((error) => {
          // console.log('failed to load subcategories')
        })
    }
    loadSubCategory(category?.value)
  }, [category])

  const [subcategory, setSubCategory] = useState(null)
  const handleSubCategoryChange = (value) => {
    setSubCategory(value)
    setInputData({ ...inputData, subcategory_id: value.value })
  }

  const [image, setImage] = useState(null)
  const componentImageHandler = (e) => {
    let file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      setImage(e.target.result)
      setInputData({ ...inputData, img: file })
    }
    if (file) {
      fileReader.readAsDataURL(file)
    } else {
      setImage(null)
    }
  }

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3 className="font-semibold text-lg text-blueGray-700">
            Create Product
          </h3>
        }
        rightTop={
          <Link href="/admin/member/sellcomponents/component/bulkinsert">
            <SecondaryButton size="sm">
              <i className="mr-2 ml-1 fas fa-file text-white"></i>
              Insert Template
            </SecondaryButton>
          </Link>
        }
      ></PageHeader>
      {errorMessage && <DangerNotification message={errorMessage} />}
      <form className="ml-2" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Product Image (Optional)
            </label>
            <div className="p-10 border-dashed border-2 border-indigo-200">
              <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                <div className="text-center my-auto">
                  <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
                <div className="text-xs ">
                  <p>JPG, JPEG, PNG file size no more than 10MB</p>
                  <input
                    className="mt-3"
                    type="file"
                    name="img"
                    accept=".png, .jpeg, .jpg"
                    onChange={componentImageHandler}
                  />
                </div>
              </div>
            </div>
            {errorInfo?.img && <ErrorInput error={errorInfo?.img} />}
          </div>
          {image && (
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Result
              </label>
              <div className="p-2 border-dashed border-2 border-indigo-200">
                <div className="text-center grid gap-4 lg:grid-cols-1 md:grid-cols-1">
                  <Image
                    src={image}
                    className="mx-auto"
                    height={180}
                    width={180}
                  ></Image>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            label="Manufacturer Part Number"
            className="w-full"
            disabled={isLoading}
            required
            name="ManufacturerNumber"
            value={inputData.ManufacturerNumber}
            errorMsg={errorInfo?.ManufacturerNumber}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            label="Manufacturer"
            className="w-full"
            disabled={isLoading}
            required
            name="Manufacture"
            value={inputData.Manufacture}
            errorMsg={errorInfo?.Manufacture}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <NumberInput
            label="Available Quantity"
            className="w-full"
            disabled={isLoading}
            required
            name="AvailableQuantity"
            value={inputData.AvailableQuantity}
            errorMsg={errorInfo?.AvailableQuantity}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <NumberInput
            label="MOQ"
            className="w-full"
            disabled={isLoading}
            required
            name="moq"
            value={inputData.moq}
            errorMsg={errorInfo?.moq}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <CountrySelector
            disabled={isLoading}
            label="Country"
            name="country"
            value={country}
            countryHandleChange={countryHandleChange}
            errorMsg={errorInfo?.country}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <AreaInput
            characterCount={descriptionCount}
            characterLimit={descriptionLimit}
            label="Product/Part Description"
            name="Description"
            disabled={isLoading}
            required
            rows={4}
            value={inputData.Description}
            errorMsg={errorInfo?.Description}
            onChange={(input) => descriptionHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            label="Date Code"
            placeholder="eg. 2023, 2023+"
            className="w-full"
            disabled={isLoading}
            required
            name="dateCode"
            value={inputData.dateCode}
            errorMsg={errorInfo?.dateCode}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <SelectInput
            disabled={isLoading}
            label="Packaging"
            name="packaging"
            value={packaging}
            options={packagings}
            errorMsg={errorInfo?.packaging}
            onChange={handlePackagingChange}
          />
          {packaging?.value == 'other' && (
            <div className="mt-2">
              <TextInput
                className="w-full"
                disabled={isLoading}
                required
                name="packaging"
                value={inputData.packaging}
                errorMsg={errorInfo?.packaging}
                onChange={(input) => setDataHandler(input)}
              />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <SelectInput
            disabled={isLoading}
            label="Category"
            name="category"
            value={category}
            options={categories}
            errorMsg={errorInfo?.category}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-16">
          <SelectInput
            disabled={isLoading}
            label="Sub-Category"
            name="subcategory_id"
            value={subcategory}
            options={subcategories}
            errorMsg={errorInfo?.subcategory_id}
            onChange={handleSubCategoryChange}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <PrimaryButton
            className="w-full font-bold uppercase"
            disabled={isLoading}
            type="submit"
          >
            {isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Create
          </PrimaryButton>
        </div>
      </form>
    </PrimaryWrapper>
  )
}

MyProduct.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session: session,
    },
  }
}
