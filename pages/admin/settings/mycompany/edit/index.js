import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { useSession } from "next-auth/react";
import Link from "next/link";

// components
import InputForm from "@/components/Shared/InputForm";
import CountrySelector from "@/components/Shared/CountrySelector";


// layout for page
import Admin from "layouts/Admin.js";

export default function MyCompany() {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    const session = useSession()
    const [user, setUser] = useState({
        accessToken: ''
    })

    useEffect(() => { 
        setUser({accessToken: session.data?.accessToken})
    }, [session])

    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [companyStatus, setCompanyStatus] = useState()
    const getData = async () =>{
        if(!!user.accessToken){
        setIsLoading(true)
        const response = await axios.get(`/company`,
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setInputData(result)
                console.log(1)
            }).catch((error) => {
                console.log(1)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }
    useEffect(() => {
        getData()
    }, [user])


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
        console.log("submited")
        // if(!!user.accessToken){
        // setIsLoading(true)
        // const response = await axios.get(`/company`,
        //     {
        //         headers: {
        //         "Authorization" : `Bearer ${user.accessToken}`
        //         }
        //     }
        //     )
        //     .then((response) => {
        //         let result = response.data.data
        //         setInputData(result)
        //     }).catch((error) => {
        //         // console.log(error.response)
        //     }).finally(() => {
        //         setIsLoading(false)
        //     })
        // }
    }

    const [image, setImage] = useState(null)
    const companyImageHandler = (e) =>{
        let file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            setImage(e.target.result) 
            setInputData({...inputData, company_img:e.target.result})
        }
        fileReader.readAsDataURL(file)
    }

    return (
    <>
        <div className="relative">
            <div className="mb-0 px-4 py-3 border-0 bg-white">
                <div className="flex justify-between">
                    <div className="px-4">
                        <h3
                        className={
                            "font-semibold text-lg text-blueGray-700"
                        }
                        >
                        Edit My Company 
                        </h3>
                    </div>
                    <div className="px-4 mt-2">
                        <Link href="/admin/settings/mycompany/edit" className="relative bg-blueGray-700 p-2 text-white">
                            {/* <i className="mr-2 ml-1 fas fa-pen text-white"></i> */}
                            Back</Link>
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
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Company Logo
                            </label>
                            <div className="p-10 border-dashed border-2 border-indigo-200">
                                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                    <div className='text-center my-auto'>
                                        <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                    </div>
                                    <div className="text-xs ">
                                        <p>JPG, JPEG, PNG file size no more than 10MB</p>
                                        <input 
                                            className="mt-3" 
                                            type="file"
                                            name="company_img"
                                            accept='.png, .jpeg, .jpg'
                                            // onChange={({target}) => 
                                            //     setRegistrationInfo({...registrationInfo, company_img:target.files[0]})
                                            // }
                                            onChange={companyImageHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errorInfo.company_img &&
                                <ErrorInput error={errorInfo.company_img}/>
                            }
                        </div>
                        {image &&<div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Result
                            </label>
                            <div className="p-2 border-dashed border-2 border-indigo-200">
                                <div className='text-center grid gap-4 lg:grid-cols-1 md:grid-cols-1'>
                                    <Image src={image}
                                        className="mx-auto"
                                        height={180}
                                        width={180}>
                                    </Image>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <InputForm
                                isDisabled={isLoading}
                                label="Company Name"
                                inputDataName="name"
                                value={inputData.name}
                                setData={setDataHandler}
                                errorMsg={errorInfo.name}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <InputForm
                                isDisabled={isLoading}
                                label="Sector"
                                inputDataName="company_name"
                                value={inputData.company_name}
                                setData={setDataHandler}
                                errorMsg={errorInfo.company_name}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <InputForm
                                isDisabled={isLoading}
                                label="Phone"
                                inputDataName="name"
                                value={inputData.name}
                                setData={setDataHandler}
                                errorMsg={errorInfo.name}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Address
                            </label>
                            <textarea 
                                value={inputData.address}
                                onChange={({target}) => 
                                    setRegistrationInfo({...inputData, address:target.value})
                                }
                                autoComplete="off" 
                                type="text"
                                className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                            {errorInfo.company_address &&
                                <ErrorInput error={errorInfo.address}/>
                            }
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="relative flex py-5 items-center w-full mx-auto">
                            <div className="flex-shrink mr-4"><h2 className="font-semibold text-xl text-blueGray-500">Documents</h2></div>
                            <div className="flex-grow border-t border-blueGray-700"></div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Company Registration Document 
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
                                                name='company_RequiredDocuments'
                                                // onChange={({target}) => 
                                                //     setRegistrationInfo({...registrationInfo, companyRequiredDocuments:target.files[0]})
                                                // }
                                                onChange={({target}) => 
                                                    setRegistrationInfo({...registrationInfo,company_RequiredDocuments:target.files[0]})
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {errorInfo.company_RequiredDocuments &&
                                    <ErrorInput error={errorInfo.company_RequiredDocuments}/>
                                }
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Certification of Activity
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
                                                name="company_PaymentDocuments"
                                                onChange={({target}) => 
                                                    setRegistrationInfo({...registrationInfo, company_PaymentDocuments:target.files[0]})
                                                }
                                                // onChange={companyReqDocsHandler}

                                            />
                                        </div>
                                    </div>
                                </div>
                                {errorInfo.company_PaymentDocuments &&
                                    <ErrorInput error={errorInfo.company_PaymentDocuments}/>
                                }
                            </div>
                        </div>
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

MyCompany.layout = Admin;
