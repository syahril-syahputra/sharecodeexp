/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useMemo, useRef } from 'react';
import axios from "lib/axios";
import Image from 'next/image';
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import ErrorInput from '@/components/Shared/ErrorInput';

import Select from 'react-tailwindcss-select';
import countryList from 'react-select-country-list';
import { useRouter } from 'next/router';

//data
import {sectorOptions} from "data/optionData"

export default function Index() {
    const refdata = useRef()
    const router = useRouter()
    const [registrationInfo, setRegistrationInfo] = useState(
        {
            //Account Information
            name: "",
            email: "",
            password: "",
            password_confirmation: "",

            //Company Information
            company_name: "", 
            company_sector: "",
            company_phone: "",
            company_country: "",
            company_address: "",

            //Documents
            company_img: "",
            company_RegistrationDocument: "",
            company_CertificationofActivity: ""
            
        }
    )

    const countries = useMemo(() => countryList().getData(), [])
    const [country, setCountry] = useState(null);
    const countryHandleChange = value => {
        setCountry(value);
        setRegistrationInfo({...registrationInfo, company_country:value.label})
    };

    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [succesMessage, setSuccesMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage(null)
        setIsLoading(true)
        let datasend = registrationInfo
            datasend.company_RegistrationDocument = refdata?.current?.elements?.company_RegistrationDocument?.files[0]
            datasend.company_CertificationofActivity = refdata?.current?.elements?.company_CertificationofActivity?.files[0]
            datasend.company_img = refdata?.current?.elements?.company_img?.files[0]
            // datasend.company_country = registrationInfo.company_country?.label

        let formData = new FormData();
        for (const key in datasend) {
            formData.append(key, datasend[key]);
        }

        const response = await axios.post("/registration", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setSuccesMessage(response.data.message)
            router.push("/auth/registrationsuccessfull")
        }).catch((error) => {
            // console.log(error.response.data.data)
            setErrorInfo(error.data.data)
            setErrorMessage("Please fill your form correctly")
        }).finally(() => {
            setIsLoading(false)
        })

    }

    const [image, setImage] = useState(null)
    const companyImageHandler = (e) =>{
        let file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            setImage(e.target.result) 
            setRegistrationInfo({...registrationInfo, company_img:e.target.result})
        }
        fileReader.readAsDataURL(file)
    }


    //option
    //sector option
    const [sectors, setSectors] = useState([...sectorOptions, {value: 'other', label: 'Other'}])
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setErrorMessage(null)
    //     setIsLoading(true)
    //     let datasend = registrationInfo
    //         datasend.company_RegistrationDocument = refdata?.current?.elements?.company_RegistrationDocument?.files[0]
    //         datasend.company_CertificationofActivity = refdata?.current?.elements?.company_CertificationofActivity?.files[0]
    //         datasend.company_img = refdata?.current?.elements?.company_img?.files[0]
    //         // datasend.company_country = registrationInfo.company_country?.label

    //     let formData = new FormData();
    //     for (const key in datasend) {
    //         formData.append(key, datasend[key]);
    //     }

    //     const response = await axios.post("/registration", formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then((response) => {
    //         setSuccesMessage(response.data)
    //     })

    // }

    const [sector, setSector] = useState(null);
    const handleSectorChange = value => {
        setRegistrationInfo({...registrationInfo, company_sector:''})
        setSector(value);
        if(value.value != 'other') {
            setRegistrationInfo({...registrationInfo, company_sector:value.value})
        }
    };

    // const tempOptions = regionOptions.map(option => ({
    //     value: option.id,
    //     label: option.label
    //   }));


    //option
    //packaging option
    const [packagings, setPackagings] = useState(sectorOptions)

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
            <PageSEO title="Exepart - Register Page" description={siteMetadata.description} />
            <IndexNavbar fixed />
            <section className="mt-20 md:mt-20 pb-40 relative bg-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-4">
                            <ImageLogo
                                size={300}
                            />
                        </div>
                        <form className="md:shadow-md md:px-24 px-10 py-8" onSubmit={handleSubmit} ref={refdata}>
                            <h2 className="font-semibold text-4xl text-center">Registration</h2>
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
                            <div className="mt-8">
                                <div className="relative flex py-5 items-center w-full mx-auto">
                                    <div className="flex-shrink mr-4"><h2 className="font-semibold text-xl text-blueGray-500">Account Information</h2></div>
                                    <div className="flex-grow border-t border-blueGray-700"></div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Name
                                        </label>
                                        <input 
                                            value={registrationInfo.name}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, name:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"/>
                                        {errorInfo.name &&
                                            <ErrorInput error={errorInfo.name}/>
                                        }
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Email
                                        </label>
                                        <input 
                                            value={registrationInfo.email}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, email:target.value})
                                            }
                                            autoComplete="off" 
                                            type="email"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.email &&
                                            <ErrorInput error={errorInfo.email}/>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Password
                                        </label>
                                        <input 
                                            value={registrationInfo.password}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, password:target.value})
                                            }
                                            autoComplete="off" 
                                            type="password"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.password &&
                                            <ErrorInput error={errorInfo.password}/>
                                        }
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Confirm Password
                                        </label>
                                        <input 
                                            value={registrationInfo.password_confirmation}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, password_confirmation:target.value})
                                            }
                                            autoComplete="off" 
                                            type="password"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.password_confirmation &&
                                            <ErrorInput error={errorInfo.password_confirmation}/>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="relative flex py-5 items-center w-full mx-auto">
                                    <div className="flex-shrink mr-4"><h2 className="font-semibold text-xl text-blueGray-500">Company Information</h2></div>
                                    <div className="flex-grow border-t border-blueGray-700"></div>
                                </div>
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
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Company Name
                                        </label>
                                        <input 
                                            value={registrationInfo.company_name}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, company_name:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.company_name &&
                                            <ErrorInput error={errorInfo.company_name}/>
                                        }
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Sector
                                        </label>
                                        <Select 
                                            name="sector"
                                            value={sector}
                                            onChange={handleSectorChange}
                                            options={sectors}
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
                                        {errorInfo.company_sector &&
                                            <ErrorInput error={errorInfo.company_sector}/>
                                        }
                                        { sector?.value == "other" && 
                                            <div className='mt-2'>
                                                <input 
                                                    value={registrationInfo.company_sector}
                                                    onChange={({target}) => 
                                                        setRegistrationInfo({...registrationInfo, company_sector:target.value})
                                                    }
                                                    autoComplete="off" 
                                                    type="text"
                                                    className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-200"/>
                                                {errorInfo.company_sector &&
                                                    <ErrorInput error={errorInfo.company_sector}/>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Phone
                                        </label>
                                        <input 
                                            value={registrationInfo.company_phone}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, company_phone:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.company_phone &&
                                            <ErrorInput error={errorInfo.company_phone}/>
                                        }
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Country
                                        </label>
                                        <Select 
                                            isSearchable
                                            name="country"
                                            value={country}
                                            onChange={countryHandleChange}
                                            options={countries}
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
                                        {errorInfo.company_country &&
                                            <ErrorInput error={errorInfo.company_country}/>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Address
                                        </label>
                                        <textarea 
                                            value={registrationInfo.company_address}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, company_address:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {errorInfo.company_address &&
                                            <ErrorInput error={errorInfo.company_address}/>
                                        }
                                    </div>
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
                                                        name='company_RegistrationDocument'
                                                        accept='.pdf'
                                                        // onChange={({target}) => 
                                                        //     setRegistrationInfo({...registrationInfo, companyRequiredDocuments:target.files[0]})
                                                        // }
                                                        onChange={({target}) => 
                                                            setRegistrationInfo({...registrationInfo,company_RegistrationDocument:target.files[0]})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {errorInfo.company_RegistrationDocument &&
                                            <ErrorInput error={errorInfo.company_RegistrationDocument}/>
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
                                                        name="company_CertificationofActivity"
                                                        accept='.pdf'
                                                        onChange={({target}) => 
                                                            setRegistrationInfo({...registrationInfo, company_CertificationofActivity:target.files[0]})
                                                        }
                                                        // onChange={companyReqDocsHandler}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {errorInfo.company_CertificationofActivity &&
                                            <ErrorInput error={errorInfo.company_CertificationofActivity}/>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-6 mt-20">
                                {!isLoading && 
                                    <button
                                        type="submit"
                                        className="w-full md:w-8/12 mt-4 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-indigo-900 active:bg-indigo-800 uppercase text-sm shadow hover:shadow-lg"
                                    >
                                    {succesMessage ? 'Success' : 'Register'}
                                    </button>
                                }
                                {isLoading && 
                                    <button
                                        disabled
                                        type="submit"
                                        className="w-full md:w-8/12 mt-4 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-blueGray-400 uppercase text-sm shadow"
                                    >
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
