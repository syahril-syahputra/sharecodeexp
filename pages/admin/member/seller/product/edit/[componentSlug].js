import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'lib/axios'
import {getSession} from 'next-auth/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

// layout for page
import Admin from 'layouts/Admin.js'
import ErrorInput from '@/components/Shared/ErrorInput'

// components
import CountrySelectorInitial from '@/components/Shared/CountrySelectorInitial'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import {useRouter} from 'next/router'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import TextInput from '@/components/Interface/Form/TextInput'
import NumberInput from '@/components/Interface/Form/NumberInput'
import AreaInput from '@/components/Interface/Form/AreaInput'
import SelectInput from '@/components/Interface/Form/SelectInput'
import {Tooltip} from '@/components/Tooltip'

export default function EditComponent({session, routeParam, packaginglist}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const tooltipText = `If product stock have different manufacturing date, please add the oldest manufacturing date. For example, if you have 20 products in stock that were manufacture between 2020 and 2023, your date code for this product will be 2020+ or 20+`
  const [inputData, setInputData] = useState({
    id: '',
    AvailableQuantity: '',
    moq: '',
    packaging: '',
    country: '',
    ManufacturerNumber: '',
    Manufacture: '',
    Description: '',
    dateCode: '',
    status: '',
    // subcategory_id: '',
    img: '',
    note: '',
  })
  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const setDataHandler = (input) => {
    setInputData({...inputData, [input.name]: input.value})
  }

  //country handle
  const [country, setCountry] = useState()
  const countryHandleChange = (value) => {
    setInputData({...inputData, country: value.label})
    setCountry(value)
  }

  const [descriptionCount, setDescriptionCount] = useState(0)
  const descriptionLimit = 100
  const descriptionHandler = (input) => {
    setDescriptionCount(input.value.length)
    setInputData({...inputData, [input.name]: input.value})
  }

  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)

    //regex check
    if (!/^[0-9+]*([+]?)+$/.test(inputData.dateCode)) {
      setErrorInfo({dateCode: ['Wrong format!']})
      setIsLoading(false)
      return
    }

    if (descriptionCount > descriptionLimit) {
      setErrorInfo({Description: ['Exceed maximum character!']})
      setIsLoading(false)
      return
    }

    let formData = new FormData()
    for (const key in inputData) {
      formData.append(key, inputData[key])
    }
    await axios
      .post(`/companyproduct/${inputData.id}/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        router.push(
          `/admin/member/seller/product/details/${routeParam.componentSlug}`
        )
        toast.success('Product has been updated.', toastOptions)
      })
      .catch((error) => {
        console.log(error)
        toast.error(
          'Something went wrong. Check your form correctly.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setErrorMessage(error.data.message)
        setIsLoading(false)
      })
  }

  //option
  //packaging option
  const [packagings, setPackagings] = useState([
    ...packaginglist,
    {value: 'other', label: 'Other'},
  ])
  const [packaging, setPackaging] = useState(null)
  const handlePackagingChange = (value) => {
    setInputData({...inputData, packaging: ''})
    setPackaging(value)
    if (value.value != 'other') {
      setInputData({...inputData, packaging: value.value})
    }
  }

  //option
  //categories option
  // const [categories, setCategories] = useState([{value: "loading", label: "loading", disabled: true}])
  // const loadCategories = async () => {
  //     const response = await axios.get(`/categories`)
  //     .then((response) => {
  //         setCategories(response.data.data)
  //     }).catch((error) => {
  //         console.log('failed to load categories')
  //     })
  // }
  // useEffect(() => {
  //     loadCategories()
  // },[])

  // const [category, setCategory] = useState(null);
  // const handleCategoryChange = value => {
  //     // loadSubCategory(value.value)
  //     setSubCategory(null);
  //     setInputData({...inputData, subcategory_id:''})
  //     setCategory(value);
  //     setInputData({...inputData, category:value.value})
  // };

  //option
  //sub-categories option
  // const [subcategories, setSubCategories] = useState([{value: 'select category first', label: 'Select Category First', disabled: true}])
  // const loadSubCategory = async (parent) => {
  //     setSubCategories([{value: 'select category first', label: 'Select Category First', disabled: true}])
  // const response = await axios.get(`/${parent}/subcategories?drop=1`)
  //   .then((response) => {
  //     setSubCategories(response.data.data)
  //   }).catch((error) => {
  //     console.log('failed to load subcategories')
  //   })
  // }
  // useEffect(() => {
  //     loadSubCategory(category?.value)
  // },[category])

  // const [subcategory, setSubCategory] = useState(null);
  // const handleSubCategoryChange = value => {
  //     setSubCategory(value);
  //     setInputData({...inputData, subcategory_id:value.value})
  // };

  //data search
  const [showImage, setShowImage] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const getData = async () => {
    setIsLoading(true)
    await axios
      .get(`/companyproduct?id=${routeParam.componentSlug}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setInputData({
          id: result.id,
          AvailableQuantity: result.AvailableQuantity,
          moq: result.moq,
          packaging: result.packaging,
          country: result.country,
          ManufacturerNumber: result.ManufacturerNumber,
          Manufacture: result.Manufacture,
          Description: result.Description,
          dateCode: result.dateCode,
          note: result.note,
        })
        setShowImage(result.img)

        //set packagings
        let oldPackaging = packagings.find(
          (item) => item.value == result.packaging
        )
        if (oldPackaging) {
          setPackaging({value: result.packaging, label: result.packaging})
        } else {
          setPackaging({value: 'other', label: 'Other'})
        }
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot load component.',
          toastOptions
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const [image, setImage] = useState(null)
  const componentImageHandler = (e) => {
    let file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      setImage(e.target.result)
      setInputData({...inputData, img: file})
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
          <h3 className={'font-semibold text-lg text-blueGray-700'}>
            Edit Product
          </h3>
        }
        rightTop={
          <Link
            href={`/admin/member/seller/product/details/${routeParam.componentSlug}`}
          >
            <LightButton size="sm" className="mr-2">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        }
      ></PageHeader>

      {errorMessage && <DangerNotification message={errorMessage} />}

      {/* component image */}
      <div className="w-full">
        {showImage ? (
          <div className="p-16 border mx-2 my-4">
            <img
              className="object-contain mb-3 h-40 mx-auto"
              alt={inputData.ManufacturerNumber}
              src={publicDir + '/product_images/' + showImage}
            />
          </div>
        ) : (
          <div className="px-3 mb-6 md:mb-0 text-center">
            <div className="p-24 border mx-2 my-4">
              product image {inputData.ManufacturerNumber}
            </div>
          </div>
        )}
      </div>

      <form className="ml-2" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Product Image (Upload if only change)
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
                    alt="product"
                    height={180}
                    width={180}
                  />
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
          <CountrySelectorInitial
            setInisiate
            disabled={isLoading}
            label="Stock Location"
            name="country"
            value={inputData.country}
            countryHandleChange={countryHandleChange}
            errorMsg={errorInfo.country}
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
            errorMsg={errorInfo.Description}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className='flex flex-wrap mb-6'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className='relative w-full'>
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
              <div
                className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer"

              >
                <Tooltip tooltipText={tooltipText}>
                  <i className="fas fa-regular fa-circle-info text-slate-500" data-tooltip-target="tooltip-default" />
                </Tooltip>
              </div>
            </div>
          </div>
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
        {/* <div className="w-full lg:w-1/2 px-3 mb-6">
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
                </div>  */}
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            label="Note"
            placeholder=""
            className="w-full"
            disabled={isLoading}
            name="note"
            value={inputData.note}
            errorMsg={errorInfo?.note}
            onChange={(input) => setDataHandler(input)}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <Link
            href={`/admin/member/seller/product/details/${routeParam.componentSlug}`}
          >
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
      </form>
    </PrimaryWrapper>
  )
}

EditComponent.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const loadPackagings = await axios.get(`/packaginglist`)
  const packaginglist = loadPackagings.data.data

  return {
    props: {
      session,
      routeParam: context.query,
      packaginglist,
    },
  }
}
