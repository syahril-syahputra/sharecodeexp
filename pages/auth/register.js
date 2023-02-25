/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useMemo } from 'react';
import Image from "next/image"
import axios from 'axios';

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import ImageLogo from "@/components/ImageLogo/ImageLogo";

import Select from 'react-tailwindcss-select';
import countryList from 'react-select-country-list';

import {register} from 'pages/api/registration/new_reg'

export default function Index() {
    const [registrationInfo, setRegistrationInfo] = useState(
        {
            //Account Information
            name: "",
            email: "",
            password: "",
            confirmPassword: "",

            //Company Information
            companyName: "", 
            companySector: "",
            companyPhone: "",
            companyCountry: "",
            companyAddress: "",

            //Documents
            companyImage: "",
            companyRequiredDocuments: "",
            companyPaymentDocuments: ""
            
        }
    )

    const options = useMemo(() => countryList().getData(), [])
    const countryHandleChange = value => {
        // setCountry(value);
        setRegistrationInfo({...registrationInfo, companyCountry:value})
    };

    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const JSONdata = JSON.stringify(registrationInfo)
        const formData = new FormData();
        formData.append('name', registrationInfo.name)
        formData.append('company_RequiredDocuments', registrationInfo.companyRequiredDocuments)
        
        const response = await fetch("/api/registration/registration", {
            method: 'POST',
            // mode: 'no-cors',
            body: formData,

            headers: { 
                // "Content-Type": "application/json",
                // "Accept": 'application/json, text/plain, */*',
                // 'User-Agent': '*',
            },  
        })
        const result = await response.json()
        if(result.errors){
            setErrorMessage(result.message)
        }
        console.log(result)

    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const response = await register(registrationInfo)
    //     const result = await response.ok()
    //     console.log(result)
    // }

    const [reqDocs, setReqDocs] = useState(null)
    const reqDocHandle = event => {
        let reader = new FileReader() 
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {       
            setRegistrationInfo({...registrationInfo, companyRequiredDocuments:reader.result})
        }
    }

    return (
        <>
            <IndexNavbar fixed />
            <section className="mt-20 md:mt-20 pb-40 relative bg-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-4">
                            <ImageLogo
                                size={300}
                            />
                        </div>
                        <form className="md:shadow-md md:px-24 px-10 py-8" onSubmit={handleSubmit}>
                            <h2 className="font-semibold text-4xl text-center">Registration</h2>
                            <p className="mt-2 text-red-500 text-xs italic">{errorMessage}</p>
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
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
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
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
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
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Confirm Password
                                        </label>
                                        <input 
                                            value={registrationInfo.confirmPassword}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, confirmPassword:target.value})
                                            }
                                            autoComplete="off" 
                                            type="password"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="relative flex py-5 items-center w-full mx-auto">
                                    <div className="flex-shrink mr-4"><h2 className="font-semibold text-xl text-blueGray-500">Company Information</h2></div>
                                    <div className="flex-grow border-t border-blueGray-700"></div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-1/2 md:w-1/2 px-3 mb-6 mx-auto">
                                        <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Company Image
                                        </label>
                                        <div className="flex gap-3 p-10 border-dashed border-2 border-indigo-200">
                                            <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                            <div className="text-xs ">
                                                <p>PNG, JPG, JPEG file size no more than 10MB</p>
                                                <input 
                                                    className="mt-3" 
                                                    type="file"
                                                    name="companyImage"
                                                    onChange={({target}) => 
                                                        setRegistrationInfo({...registrationInfo, companyImage:target.files[0]})
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* <img
                                            alt="not found"
                                            width={"250px"}
                                            src={URL.createObjectURL(registrationInfo.companyImage)}
                                        /> */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Company Name
                                        </label>
                                        <input 
                                            value={registrationInfo.companyName}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, companyName:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Sector
                                        </label>
                                        <input 
                                            value={registrationInfo.companySector}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, companySector:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Phone
                                        </label>
                                        <input 
                                            value={registrationInfo.companyPhone}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, companyPhone:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                        {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Country
                                        </label>
                                        <Select 
                                            isSearchable
                                            name="country"
                                            value={registrationInfo.companyCountry}
                                            onChange={countryHandleChange}
                                            options={options}
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
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Address
                                        </label>
                                        <textarea 
                                            value={registrationInfo.companyAddress}
                                            onChange={({target}) => 
                                                setRegistrationInfo({...registrationInfo, companyAddress:target.value})
                                            }
                                            autoComplete="off" 
                                            type="text"
                                            className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                            {/* <p className="mt-2 text-red-500 text-xs italic">Please fill out this field.</p> */}
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
                                            Required Documents
                                        </label>
                                        <div className="flex gap-3 p-3 border-dashed border-2 border-indigo-200 ">
                                            <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                            <div className="text-xs ">
                                                <p>PDF file size no more than 10MB</p>
                                                <input 
                                                    className="mt-3" 
                                                    type="file"
                                                    onChange={reqDocHandle}
                                                />
                                            </div>
                                        </div>
                                        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Payment Documents
                                        </label>
                                        <div className="flex gap-3 p-3 border-dashed border-2 border-indigo-200 ">
                                            <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                            <div className="text-xs ">
                                                <p>PDF file size no more than 10MB</p>
                                                <input 
                                                    className="mt-3" 
                                                    type="file"
                                                    onChange={({target}) => 
                                                        setRegistrationInfo({...registrationInfo, companyPaymentDocuments:target.value})
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-6 mt-20">
                                <button
                                className="w-full md:w-8/12 mt-4 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                                >
                                Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
