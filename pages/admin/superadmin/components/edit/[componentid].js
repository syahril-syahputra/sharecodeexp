import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// layout for page
import Admin from "layouts/Admin.js";

// components
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import LightButton from "@/components/Interface/Buttons/LightButton";
import PageHeader from "@/components/Interface/Page/PageHeader";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import InputForm from "@/components/Shared/InputForm";
import CountrySelector from "@/components/Shared/CountrySelector";
import Select from 'react-tailwindcss-select';
import ErrorInput from '@/components/Shared/ErrorInput';
import DangerNotification from "@/components/Interface/Notification/DangerNotification";
import TextInput from "@/components/Interface/Form/TextInput";
import NumberInput from "@/components/Interface/Form/NumberInput";
import SelectInput from "@/components/Interface/Form/SelectInput";
import AreaInput from "@/components/Interface/Form/AreaInput";
import WarningButton from "@/components/Interface/Buttons/WarningButton";

export default function EditComponent({session, routeParam, packaginglist}) {
    // update data
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
        subcategory_id: ''
      });
    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [succesMessage, setSuccesMessage] = useState(null)
    const setDataHandler = (input) => {
        setInputData({...inputData, [input.name]:input.value})
    }

    //country handle
    const [country, setCountry] = useState()
    const countryHandleChange = (value) => {
        setInputData({...inputData, country:value.label})
        setCountry(value)
    }

    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        alert("not ready yet :(")
        // console.log(inputData)
        // setIsLoading(true)
        // setErrorInfo({})
        // setErrorMessage(null)
        // const response = await axios.post(`/companyproduct/${inputData.id}/update`, inputData, {
        // headers: {
        //     "Authorization" : `Bearer ${session.accessToken}`
        // }
        // })
        // .then(() => {
        //     router.push(`/admin/member/sellcomponents/component/view/${routeParam.componentid}`)
        //     toast.success("Your product have been updated successfully", toastOptions)
        // }).catch((error) => {
        //     console.log(error.data.data)
        //     toast.error("Something went wrong", toastOptions)
        //     setErrorInfo(error.data.data)
        //     setIsLoading(false)
        // })
    }

    //option
    //packaging option
    const [packagings, setPackagings] = useState([...packaginglist, {value: 'other', label: 'Other'}])
    const [packaging, setPackaging] = useState(null);
    const handlePackagingChange = value => {
        setInputData({...inputData, packaging:''})
        setPackaging(value);
        if(value.value != 'other') {
            setInputData({...inputData, packaging:value.value})
        }
    };

    //option  
    //categories option
    const [categories, setCategories] = useState([{value: "loading", label: "loading", disabled: true}])
    const loadCategories = async () => {
        const response = await axios.get(`/categories`)
        .then((response) => {
            setCategories(response.data.data)
        }).catch((error) => {
            console.log('failed to load categories')
        })
    }
    useEffect(() => {
        loadCategories()
    },[])

    const [category, setCategory] = useState(null);
    const handleCategoryChange = value => {
        // loadSubCategory(value.value)
        setSubCategory(null);
        setInputData({...inputData, subcategory_id:''})
        setCategory(value);
        setInputData({...inputData, category:value.value})
    };

    //option
    //sub-categories option
    const [subcategories, setSubCategories] = useState([{value: 'select category first', label: 'Select Category First', disabled: true}])
    const loadSubCategory = async (parent) => {
        setSubCategories([{value: 'select category first', label: 'Select Category First', disabled: true}])
    const response = await axios.get(`/${parent}/subcategories?drop=1`)
      .then((response) => {
        setSubCategories(response.data.data)
      }).catch((error) => {
        console.log('failed to load subcategories')
      })


    }
    useEffect(() => {
        loadSubCategory(category?.value)
    },[category])

    const [subcategory, setSubCategory] = useState(null);
    const handleSubCategoryChange = value => {
        setSubCategory(value);
        setInputData({...inputData, subcategory_id:value.value})
    };

    //data search
    const [isLoading, setIsLoading] = useState(true)
    const getData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/product?id=${routeParam.componentid}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
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
                    subcategory_id: result.subcategory.id
                })

                //set packagings
                let oldPackaging = packagings.find(item => item.value == result.packaging)
                if(oldPackaging) {
                    setPackaging({value: result.packaging, label: result.packaging})
                } else {
                    setPackaging({value: 'other', label: 'Other'})
                }   

                setCategory({value: result.subcategory.category.id, label: result.subcategory.category.name})  
                setSubCategory({value: result.subcategory.id, label: result.subcategory.name}) 

            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
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
                    <h3
                        className={
                            "font-semibold text-lg text-blueGray-700"
                    }>
                    Edit Company's Component
                    </h3>
                }
                rightTop={
                    <Link href={`/admin/superadmin/components/details/${routeParam.componentid}`}>
                        <LightButton 
                            size="sm" 
                            className="mr-2">
                            <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                            Back
                        </LightButton>
                    </Link>
                }
            ></PageHeader>

            {errorMessage && 
                <DangerNotification 
                    message={errorMessage}
                />
            }

            {/* component image */}
            <div className="w-full mb-6">
                <div className="px-3 md:mb-0 text-center">
                    <div className="p-24 border mx-2 my-4">product image {routeParam.componentid}</div>
                </div>
            </div>

            <form className="ml-2" onSubmit={handleSubmit}>
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
                        setInisiate
                        disabled={isLoading}
                        label="Country"
                        name="country"
                        value={inputData.country}
                        countryHandleChange={countryHandleChange}
                        errorMsg={errorInfo.country}
                    />
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-6">
                    <AreaInput 
                        label="Description"
                        name="Description"
                        disabled={isLoading}
                        required
                        rows={4}
                        value={inputData.Description}
                        errorMsg={errorInfo.Description}
                        onChange={(input) => setDataHandler(input)}
                    />
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-6">
                    <TextInput
                        label="Date Code"
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
                    { packaging?.value == "other" && 
                        <div className='mt-2'>
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
                    }
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
                    <Link href={`/admin/superadmin/components/details/${routeParam.componentid}`}>
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
                        {isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Update
                    </WarningButton>
                </div>  
            </form>

        </PrimaryWrapper>
    );
}

EditComponent.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const loadPackagings = await axios.get(`/packaginglist`)
    const packaginglist = loadPackagings.data.data

    return {
        props: {
            session,
            routeParam: context.query,
            packaginglist
        }
    }
}
    