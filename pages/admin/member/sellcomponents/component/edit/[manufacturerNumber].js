import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";
import CountrySelector from "@/components/Shared/CountrySelector";
import Select from 'react-tailwindcss-select';
import ErrorInput from '@/components/Shared/ErrorInput';

// layout for page
import Admin from "layouts/Admin.js";

//data
import {packageOptions, packagingOptions} from "data/optionData"

export default function EditProduct() {
    const sessionData = useSession()
    const router = useRouter()
    const { manufacturerNumber } = router.query
    const session = useSession()
    const [user, setUser] = useState({
        accessToken: ''
    })
    useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const getData = async () =>{
        if(!!user.accessToken && manufacturerNumber){
        setIsLoading(true)
        const response = await axios.get(`/companyproduct/${manufacturerNumber}`,
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setInputData({
                    id: result.id,
                    AvailableQuantity: result.AvailableQuantity,
                    moq: result.moq,
                    package: result.package,
                    packaging: result.packaging,
                    country: result.country,
                    ManufacturerNumber: result.ManufacturerNumber,
                    Manufacture: result.Manufacture,
                    Description: result.Description,
                    dateCode: result.dateCode
                })
                
                //set package
                let oldPackage = packageOptions.find(item => item.value == result.package)
                if(oldPackage) {
                    setPackage({value: result.package, label: result.package})
                } else {
                    setPackage({value: 'other', label: 'Other'})
                }

                //set packaging
                let oldPackaging = packagingOptions.find(item => item.value == result.packaging)
                if(oldPackaging) {
                    setPackaging({value: result.packaging, label: result.packaging})
                } else {
                    setPackaging({value: 'other', label: 'Other'})
                }

            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }
    useEffect(() => {
        getData()
    }, [user, manufacturerNumber])

    // update data
    const [inputData, setInputData] = useState({
        AvailableQuantity: '',
        moq: '',
        package: '',
        packaging: '',
        country: '',
        ManufacturerNumber: '',
        Manufacture: '',
        Description: '',
        dateCode: '',
        status: ''
      });
    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [succesMessage, setSuccesMessage] = useState(null)
    const setDataHandler = (item, inputName) => {
        setInputData({...inputData, [inputName]:item.value})
    }

    //country handle
    const [country, setCountry] = useState()
    const countryHandleChange = (value) => {
        setInputData({...inputData, country:value.label})
        setCountry(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
            setIsLoading(true)
            setErrorInfo({})
            setErrorMessage(null)
            const response = await axios.post(`/companyproduct/${inputData.id}/update`, inputData, {
            headers: {
                "Authorization" : `Bearer ${sessionData.data.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                setSuccesMessage("Your product has been updated succefully")
            }).catch((error) => {
                setErrorMessage(error.response.data.message)
                setErrorInfo(error.response.data.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    //option
    //package option
    const [packages, setPackages] = useState([...packageOptions, {value: 'other', label: 'Other'}])

    const [pckage, setPackage] = useState(null);
    const handlePackageChange = value => {
        setInputData({...inputData, package:''})
        setPackage(value);
        if(value.value != 'other') {
            setInputData({...inputData, package:value.value})
        }
    };

    //option
    //packaging option
    const [packagings, setPackagings] = useState([...packagingOptions, {value: 'other', label: 'Other'}])

    const [packaging, setPackaging] = useState(null);
    const handlePackagingChange = value => {
        setInputData({...inputData, packaging:''})
        setPackaging(value);
        if(value.value != 'other') {
            setInputData({...inputData, packaging:value.value})
        }
    };

    return (
        <>
            <div className="relative shadow">
                <div className="mb-0 px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="px-4">
                            <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }
                            >
                            Edit Product 
                            </h3>
                        </div>
                        <div className="px-4 mt-2">
                            <Link href={`/admin/product/myproduct`} className="relative bg-blueGray-700 p-2 text-white">
                                {/* <i className="mr-2 ml-1 fas fa-pen text-white"></i> */}
                                Back</Link>
                        </div>
                    </div>
                </div>


                <div className="">
                    <div className="flex flex-wrap w-full bg-white">
                        <div className="px-3 mb-6 md:mb-0 text-center">
                            <div className="p-24 border mx-2 my-4">{manufacturerNumber}</div>
                        </div>
                    </div>
                </div>
                <div className="mb-0 px-4 py-3 border-0 bg-white">
                    <div className="px-3 w-full lg:w-1/2">
                        {errorMessage &&
                        <div  className="w-50">
                            <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-red-500">
                                <span className="text-xl inline-block mr-5 align-middle">
                                    <i className="fas fa-bell"></i>
                                </span>
                                <span className="inline-block align-middle mr-8">
                                    <b className="capitalize">{errorMessage}</b>
                                </span>
                            </div>
                        </div>
                        }
                        {succesMessage &&
                        <div  className="w-50">
                            <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-emerald-500">
                                <span className="text-xl inline-block mr-5 align-middle">
                                    <i className="fas fa-bell"></i>
                                </span>
                                <span className="inline-block align-middle mr-8">
                                    <b className="capitalize">{succesMessage}</b>
                                </span>
                            </div>
                        </div>
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            label="Manufacturer Part Number"
                            inputDataName="ManufacturerNumber"
                            value={inputData.ManufacturerNumber}
                            setData={setDataHandler}
                            errorMsg={errorInfo.ManufacturerNumber}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            label="Manufacturer"
                            inputDataName="Manufacture"
                            value={inputData.Manufacture}
                            setData={setDataHandler}
                            errorMsg={errorInfo.Manufacture}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            isDisabled={isLoading}
                            label="Available Quantity"
                            inputDataName="AvailableQuantity"
                            value={inputData.AvailableQuantity}
                            setData={setDataHandler}
                            errorMsg={errorInfo.AvailableQuantity}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            label="MOQ"
                            inputDataName="moq"
                            value={inputData.moq}
                            setData={setDataHandler}
                            errorMsg={errorInfo.moq}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <CountrySelector
                                setInisiate
                                label="Country"
                                inputDataName="country"
                                value={inputData.country}
                                countryHandleChange={countryHandleChange}
                                errorMsg={errorInfo.country}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            label="Description"
                            inputDataName="Description"
                            value={inputData.Description}
                            setData={setDataHandler}
                            errorMsg={errorInfo.Description}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                            label="Date Code"
                            inputDataName="dateCode"
                            value={inputData.dateCode}
                            setData={setDataHandler}
                            errorMsg={errorInfo.dateCode}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Package
                            </label>
                            <Select 
                                name="pckage"
                                value={pckage}
                                onChange={handlePackageChange}
                                options={packages}
                                classNames={{
                                    menuButton: () => (
                                        `h-12 flex p-1 text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none`
                                    ),
                                    menu: "absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700",
                                    listItem: ({ isSelected }) => (
                                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                                            isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                        }`
                                    ),
                                    searchBox: "rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500"
                                }}
                                />
                            {errorInfo.package &&
                                <ErrorInput error={errorInfo.package}/>
                            }
                            { pckage?.value == "other" && 
                            <InputForm
                                inputDataName="package"
                                value={inputData.package}
                                setData={setDataHandler}
                                errorMsg={errorInfo.package}
                            />
                            }
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Packaging
                            </label>
                            <Select 
                                name="packaging"
                                value={packaging}
                                onChange={handlePackagingChange}
                                options={packagings}
                                classNames={{
                                    menuButton: () => (
                                        `h-12 flex p-1 text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none`
                                    ),
                                    menu: "absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700",
                                    listItem: ({ isSelected }) => (
                                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                                            isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                        }`
                                    ),
                                    searchBox: "rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500"
                                }}
                                />
                            {errorInfo.packaging &&
                                <ErrorInput error={errorInfo.packaging}/>
                            }
                            { packaging?.value == "other" && 
                            <InputForm
                                inputDataName="packaging"
                                value={inputData.packaging}
                                setData={setDataHandler}
                                errorMsg={errorInfo.packaging}
                            />
                            }
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6 mt-20">
                            <div className="mb-6">
                                {!isLoading && 
                                    <button
                                        type="submit"

                                        className="w-1/2 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-orange-500 active:bg-orange-400 uppercase text-sm shadow hover:shadow-lg"
                                    >
                                    Update
                                    </button>
                                }
                                {isLoading && 
                                    <button
                                        disabled
                                        type="submit"
                                        className="w-1/2 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-orange-200 uppercase text-sm shadow"
                                    >
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                    </button>
                                }
                            </div>
                        </div>

                        
                    </form>
                </div>
            </div>
        </>
    );
}

EditProduct.layout = Admin;
