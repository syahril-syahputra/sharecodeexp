/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useMemo, useEffect } from 'react';
import axios from "lib/axios";
import Image from 'next/image';
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import Link from 'next/link'

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import ErrorInput from '@/components/Shared/ErrorInput';
import TextInput from "@/components/Interface/Form/TextInput";
import SelectInput from "@/components/Interface/Form/SelectInput";
import AreaInput from "@/components/Interface/Form/AreaInput"

import countryList from 'react-select-country-list';
import DangerNotification from '@/components/Interface/Notification/DangerNotification';
import CountrySelector from '@/components/Shared/CountrySelector';
import { PublicUrl } from '@/route/route-url';

export default function Index() {
    const [isAgreeTermCondtionOfSale, setIsAgreeTermCondtionOfSale] = useState(false)
    const [isAgreeTermCondtionOfSaleMessage, setIsAgreeTermCondtionOfSaleMessage] = useState('')
    const [isAgreeTermCondtionOfExport, setIsAgreeTermCondtionOfExport] = useState(false)
    const [isAgreeTermCondtionOfExportMessage, setIsAgreeTermCondtionOfExportMessage] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)
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
            company_address_2: "",
            postal_code: "",
            province: "",

            //Documents
            company_img: "",
            company_RegistrationDocument: "",
            company_CertificationofActivity: ""
        }
    )

    const handleStringValueChange = (input) => {
        setRegistrationInfo({...registrationInfo, [input.name]:input.value})
    }

    const [firstAddressCharacterCount, setFirstAddressCharacterCount] = useState(0)
    const firstAddressCharacterLimit = 100
    const firstAddressHandler = (input) => {
        setFirstAddressCharacterCount(input.value.length)
        setRegistrationInfo({...registrationInfo, [input.name]:input.value})
    }

    const [secondAddressCharacterCount, setSecondAddressCharacterCount] = useState(0)
    const secondAddressCharacterLimit = 100
    const secondAddressHandler = (input) => {
        setSecondAddressCharacterCount(input.value.length)
        setRegistrationInfo({...registrationInfo, [input.name]:input.value})
    }
    
    const countries = useMemo(() => countryList().getData(), [])
    const [country, setCountry] = useState(null);
    const countryHandleChange = value => {
        setCountry(value);
        setRegistrationInfo({...registrationInfo, company_country:value.label})
    };

    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [succesStatus, setSuccesStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isAgreeTermCondtionOfSale){
            setIsAgreeTermCondtionOfSaleMessage('Please agreed the Term and Conditions of Sale before continue.')
            return
        }
        if(!isAgreeTermCondtionOfExport){
            setIsAgreeTermCondtionOfExportMessage('Please agreed the Term and Conditions of Export before continue.')
            return
        }
        setErrorMessage(null)
        setErrorInfo(null)
        setIsLoading(true)

        let formData = new FormData();
        for (const key in registrationInfo) {
            formData.append(key, registrationInfo[key]);
        }

        const request = await axios.post("/registration", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setSuccesStatus(true)
            setErrorMessage(null)
            setErrorInfo(null)
        }).catch((error) => {
            setErrorInfo(error.data.data)
            setErrorMessage("Please fill your form correctly")
        }).finally(() => {
            setIsLoading(false)
        })

    }

    const handleisAgreeTermCondtionOfSale= () => {
        setIsAgreeTermCondtionOfSale(prev => !prev)

        if(!isAgreeTermCondtionOfSale){
            setIsAgreeTermCondtionOfSaleMessage()
        }
    }

    const handleisAgreeTermCondtionOfExport = () => {
        setIsAgreeTermCondtionOfExport(prev => !prev)

        if(!isAgreeTermCondtionOfExport){
            setIsAgreeTermCondtionOfExportMessage()
        }
    }

    const [image, setImage] = useState(null)
    const companyImageHandler = (e) =>{
        let file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            setImage(e.target.result) 
            setRegistrationInfo({...registrationInfo, company_img:file})
        }
        fileReader.readAsDataURL(file)
    }

    //option
    //sector option
    const [sectors, setSectors] = useState([{value: 'other', label: 'Other'}])
    const loadSectors = async () => {
        const response = await axios.get(`/sectorlist`)
        .then((response) => {
            setSectors([...response.data.data, {value: 'other', label: 'Other'}])
        }).catch((error) => {
            console.log('failed to load sectors')
        })
    }
    useEffect(() => {
        loadSectors()
    },[])

    const [sector, setSector] = useState(null);
    const handleSectorChange = value => {
        setRegistrationInfo({...registrationInfo, company_sector:''})
        setSector(value);
        if(value.value != 'other') {
            setRegistrationInfo({...registrationInfo, company_sector:value.value})
        }
    };

    //checking register button status enable or disable
    const registerButtonStatusDisabled = () => {
        if(isLoading) return true;

        if(!isAgreeTermCondtionOfSale) return true;

        if(!isAgreeTermCondtionOfExport) return true;

        if(firstAddressCharacterCount > firstAddressCharacterLimit) return true;

        if(secondAddressCharacterCount > secondAddressCharacterLimit) return true;

        return false
    }

    return (
        <>
            <PageSEO title="Exepart - Register" description={siteMetadata.description} />
            <IndexNavbar fixed hideLogin/>
            <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-4">
                            <ImageLogo
                                size={250}
                            />
                        </div>
                        <div className="justify-center flex flex-wrap mb-20 ">
                            <div className="w-full md:w-10/12 md:shadow-md p-5 bg-white">                            
                                {!succesStatus && 
                                    <form onSubmit={handleSubmit} className='pb-20'>
                                        <h2 className="font-semibold text-2xl text-center">Registration</h2>
                                        {errorMessage &&
                                            <DangerNotification 
                                                message={errorMessage}
                                                onCloseNotification={() => setErrorMessage(null)}
                                            />
                                        }
                                        <div className="mt-8">
                                            <div className="relative flex py-5 items-center w-full mx-auto">
                                                <div className="flex-shrink mr-4"><h2 className="font-semibold text-xl text-blueGray-500">Main Account Information</h2></div>
                                                <div className="flex-grow border-t border-blueGray-700"></div>
                                            </div>
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <TextInput
                                                        label="Main Account Name"
                                                        className="w-full"
                                                        required
                                                        name="name"
                                                        value={registrationInfo.name}
                                                        errorMsg={errorInfo?.name}
                                                        onChange={(input) => handleStringValueChange(input)}
                                                    /> 
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <TextInput
                                                        label="Main Account Email"
                                                        type="email"
                                                        className="w-full"
                                                        required
                                                        name="email"
                                                        value={registrationInfo.email}
                                                        errorMsg={errorInfo?.email}
                                                        onChange={(input) => handleStringValueChange(input)}
                                                    /> 
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <div className="relative">
                                                        <TextInput
                                                            label="Password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="w-full"
                                                            required
                                                            name="password"
                                                            value={registrationInfo.password}
                                                            errorMsg={errorInfo?.password}
                                                            onChange={(input) => handleStringValueChange(input)}
                                                        /> 
                                                        <div className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                                            {showPassword ?  
                                                                <i className="fas fa-eye-slash text-slate-500"></i> :
                                                                <i className="fas fa-eye text-slate-500"></i>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <div className="relative">                                                    
                                                        <TextInput
                                                            label="Confirm Password"
                                                            type={showConfirmationPassword ? 'text' : 'password'}
                                                            className="w-full"
                                                            required
                                                            name="password_confirmation"
                                                            value={registrationInfo.password_confirmation}
                                                            errorMsg={errorInfo?.password_confirmation}
                                                            onChange={(input) => handleStringValueChange(input)}
                                                        /> 
                                                        <div className="absolute inset-y-0 right-4 top-9 flex items-start cursor-pointer" onClick={() => setShowConfirmationPassword(prev => !prev)}>
                                                            {showConfirmationPassword ?  
                                                                <i className="fas fa-eye-slash text-slate-500"></i> :
                                                                <i className="fas fa-eye text-slate-500"></i>
                                                            }
                                                        </div>
                                                    </div>
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
                                                                    onChange={companyImageHandler}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorInfo?.company_img &&
                                                        <ErrorInput error={errorInfo?.company_img}/>
                                                    }
                                                </div>
                                                {image &&<div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        Result
                                                    </label>
                                                    <div className="p-2 border-dashed border-2 border-indigo-200">
                                                        <div className='text-center grid gap-4 lg:grid-cols-1 md:grid-cols-1'>
                                                            <Image src={image}
                                                                alt="image_logo"
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
                                                    <TextInput
                                                        label="Company Name"
                                                        className="w-full"
                                                        required
                                                        name="company_name"
                                                        value={registrationInfo.company_name}
                                                        errorMsg={errorInfo?.company_name}
                                                        onChange={(input) => handleStringValueChange(input)}
                                                    /> 
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <SelectInput
                                                        searchable                                
                                                        label="Sectors"
                                                        name="sector"
                                                        value={sector}
                                                        options={sectors}
                                                        errorMsg={errorInfo?.company_sector}
                                                        onChange={handleSectorChange}
                                                    />
                                                    { sector?.value == "other" && 
                                                        <div className='mt-2'>
                                                            <TextInput
                                                                className="w-full"
                                                                required
                                                                name="company_sector"
                                                                value={registrationInfo.company_sector}
                                                                errorMsg={errorInfo?.company_sector}
                                                                onChange={(input) => handleStringValueChange(input)}
                                                            /> 
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <TextInput
                                                        type="tel"
                                                        label="Phone"
                                                        className="w-full"
                                                        required
                                                        name="company_phone"
                                                        value={registrationInfo.company_phone}
                                                        errorMsg={errorInfo?.company_phone}
                                                        onChange={(input) => handleStringValueChange(input)}
                                                    /> 
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap mb-6">                                                
                                                <div className="w-full md:w-1/2 px-3">
                                                    <div className="w-1/2 md:w-1/2">
                                                        <TextInput
                                                            label="Postal Code"
                                                            className="w-full"
                                                            required
                                                            name="postal_code"
                                                            value={registrationInfo.postal_code}
                                                            errorMsg={errorInfo?.postal_code}
                                                            onChange={(input) => handleStringValueChange(input)}
                                                        /> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md:w-1/2 px-3">
                                                    <CountrySelector
                                                        name="country"
                                                        value={country}
                                                        countryHandleChange={countryHandleChange}
                                                        errorMsg={errorInfo?.country}
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <TextInput
                                                        label="Province"
                                                        className="w-full"
                                                        required
                                                        name="province"
                                                        value={registrationInfo.province}
                                                        errorMsg={errorInfo?.province}
                                                        onChange={(input) => handleStringValueChange(input)}
                                                    /> 
                                                </div>
                                            </div>
                                            {/* <div className="flex flex-wrap mb-6">
                                                <div className="w-full  px-3 mb-6 md:mb-0">
                                                <AreaInput
                                                    label="Address"
                                                    name="company_address"
                                                    required
                                                    value={registrationInfo.company_address}
                                                    errorMsg={errorInfo?.company_address}
                                                    onChange={(input) => handleStringValueChange(input)}
                                                />
                                                </div>
                                            </div> */}
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <AreaInput
                                                        rows={5}
                                                        characterCount={firstAddressCharacterCount}
                                                        characterLimit={firstAddressCharacterLimit}
                                                        label="Address 1"
                                                        name="company_address"
                                                        required
                                                        value={registrationInfo.company_address}
                                                        errorMsg={errorInfo?.company_address}
                                                        onChange={(input) => firstAddressHandler(input)}
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <AreaInput
                                                        rows={5}
                                                        characterCount={secondAddressCharacterCount}
                                                        characterLimit={secondAddressCharacterLimit}
                                                        label="Address 2"
                                                        name="company_address_2"
                                                        required
                                                        value={registrationInfo.company_address_2}
                                                        errorMsg={errorInfo?.company_address_2}
                                                        onChange={(input) => secondAddressHandler(input)}
                                                    />
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
                                                                    onChange={({target}) => 
                                                                        setRegistrationInfo({...registrationInfo,company_RegistrationDocument:target.files[0]})
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorInfo?.company_RegistrationDocument &&
                                                        <ErrorInput error={errorInfo?.company_RegistrationDocument}/>
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
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorInfo?.company_CertificationofActivity &&
                                                        <ErrorInput error={errorInfo?.company_CertificationofActivity}/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center mb-6 mt-20">
                                            <div className='text-center'>
                                                <div className="w-full">
                                                    {isAgreeTermCondtionOfSaleMessage &&
                                                        <div>
                                                            <span className=" inline-block mr-2 align-middle">
                                                                <i className="text-red-500 fas fa-bell"></i>
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                <i className="text-red-500 capitalize">{isAgreeTermCondtionOfSaleMessage}</i>
                                                            </span>
                                                        </div>
                                                    }
                                                    <input id="term" type="checkbox" checked={isAgreeTermCondtionOfSale} onChange={handleisAgreeTermCondtionOfSale} className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                                                    <label htmlFor="term" className="ml-2 text-sm font-medium text-gray-900">I agree with the <Link target="_blank" href={PublicUrl.conditionOfSale} className="text-blue-600 hover:underline">Terms and Conditions of Sale</Link>.</label>
                                                </div>
                                                <div className="w-full">
                                                    {isAgreeTermCondtionOfExportMessage &&
                                                        <div>
                                                            <span className=" inline-block mr-2 align-middle">
                                                                <i className="text-red-500 fas fa-bell"></i>
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                <i className="text-red-500 capitalize">{isAgreeTermCondtionOfExportMessage}</i>
                                                            </span>
                                                        </div>
                                                    }
                                                    <input id="policy" type="checkbox" checked={isAgreeTermCondtionOfExport} onChange={handleisAgreeTermCondtionOfExport} className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                                                    <label htmlFor="policy" className="ml-2 text-sm font-medium text-gray-900">I agree with the <Link target="_blank" href={PublicUrl.conditionOfExport} className="text-blue-600 hover:underline">Terms and Conditions of Export</Link>.</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className='mt-5'>
                                                <PrimaryButton
                                                    disabled={registerButtonStatusDisabled()}
                                                    type="submit"
                                                    className="w-full md:w-6/12 font-bold uppercase"
                                                >
                                                    {isLoading &&
                                                        <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                                                    }
                                                    Register
                                                </PrimaryButton> 
                                            </div>
                                        </div>
                                    </form>
                                }
                                {succesStatus &&
                                    <div className="text-center mt-10 mb-14">
                                        <h1 className="text-2xl">Your Registration is Successfull!</h1>
                                        <h2 className="text-blueGray-500">Your account need a confirmation from EXEpart Registration Expert, please <Link href="/auth/login" className="text-blueGray-700 underline">login</Link> to check your account</h2>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
