import React, { useState, useEffect, useRef } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';
import ErrorInput from '@/components/Shared/ErrorInput';
import { useRouter } from "next/router";

// components
import CountrySelector from "@/components/Shared/CountrySelector";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import LightButton from "@/components/Interface/Buttons/LightButton";
import DangerNotification from "@/components/Interface/Notification/DangerNotification";
import TextInput from "@/components/Interface/Form/TextInput";
import SelectInput from "@/components/Interface/Form/SelectInput";
import AreaInput from "@/components/Interface/Form/AreaInput";
import WarningButton from "@/components/Interface/Buttons/WarningButton";

export default function MyCompany({session, sectorlist}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR

    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [companyStatus, setCompanyStatus] = useState()
    const getData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/company`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setInputData({
                    name: result.name,
                    address: result.address,
                    country: result.country,
                    sector: result.sector,
                    phone: result.phone
                })

                //set sector
                let oldSector = sectors.find(item => item.value == result.sector)
                if(oldSector) {
                    setSector({value: result.sector, label: result.sector})
                } else {
                    setSector({value: 'other', label: 'Other'})
                }
            }).catch((error) => {
                toast.error("Something went wrong. Can not load company data.", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])


  // update data
    const [inputData, setInputData] = useState({
        name: '',
        address: '',
        country: '',
        sector: '',
        phone: ''
    });
    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const setDataHandler = (input) => {
        setInputData({...inputData, [input.name]:input.value})
    }

    //country handle
    const [country, setCountry] = useState()
    const countryHandleChange = (value) => {
        setInputData({...inputData, country:value.label})
        setCountry(value)
    }

    //option
    //packaging option
    const [sectors, setSectors] = useState([...sectorlist, {value: 'other', label: 'Other'}])

    const [sector, setSector] = useState(null);
    const handleSectorChange = value => {
        setInputData({...inputData, sector:''})
        setSector(value);
        if(value.value != 'other') {
            setInputData({...inputData, sector:value.value})
        }
    };

    //update handler
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorInfo({})
        setErrorMessage(null)

        let formData = new FormData();
        for (const key in inputData) {
            formData.append(key, inputData[key]);
        }

        const response = await axios.post(`/master/company/update`, formData, {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                router.replace('/admin/member')
                toast.success("Your company have been updated successfully.", toastOptions)
            }).catch((error) => {
                setErrorMessage("Please fill your form correctly")
                toast.error("Something went wrong.", toastOptions)
                setErrorInfo(error.data.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return(
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3
                        className="font-semibold text-lg text-blueGray-700"
                    >
                        Edit My Company 
                    </h3>
                }
                rightTop={
                    <Link href="/admin/member/company/mycompany">
                        <LightButton
                            size="sm"
                        >   
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
            <form onSubmit={handleSubmit} className="p-2">
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <TextInput
                            label="Company Name"
                            className="w-full"
                            required
                            name="name"
                            value={inputData.name}
                            errorMsg={errorInfo?.name}
                            onChange={(input) => setDataHandler(input)}
                        /> 
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <SelectInput
                            searchable                                
                            label="Sectors"
                            name="sector"
                            value={sector}
                            options={sectors}
                            errorMsg={errorInfo?.sector}
                            onChange={handleSectorChange}
                        />
                        { sector?.value == "other" && 
                            <div className='mt-2'>
                                <TextInput
                                    className="w-full"
                                    required
                                    name="sector"
                                    value={inputData.sector}
                                    errorMsg={errorInfo?.sector}
                                    onChange={(input) => setDataHandler(input)}
                                /> 
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <TextInput
                            label="Phone"
                            className="w-full"
                            required
                            name="phone"
                            value={inputData.phone}
                            errorMsg={errorInfo?.phone}
                            onChange={(input) => setDataHandler(input)}
                        /> 
                    </div>
                    <div className="w-full md:w-1/2 px-3">
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
                        <AreaInput
                            label="Address"
                            name="address"
                            required
                            value={inputData.address}
                            errorMsg={errorInfo?.address}
                            onChange={(input) => setDataHandler(input)}
                        />
                    </div>
                </div>
                <div className="mt-8 mb-20">
                    <div className="relative flex py-5 items-center w-full mx-auto">
                        <div className="flex-grow border-t border-blueGray-700"></div>
                        <div className="flex-shrink mx-4"><h2 className="font-semibold text-xl text-blueGray-500">Documents</h2></div>
                        <div className="flex-grow border-t border-blueGray-700"></div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Company Registration Document (Upload if only change)
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
                                            accept='.pdf'
                                            name='RegistrationDocument'
                                            onChange={({target}) => 
                                                setInputData({...inputData, RegistrationDocument:target.files[0]})
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {errorInfo.RegistrationDocument &&
                                <ErrorInput error={errorInfo.RegistrationDocument}/>
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Certification of Activity (Upload if only change)
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
                                            accept='.pdf'
                                            name="CertificationofActivity"
                                            onChange={({target}) => 
                                                setInputData({...inputData, CertificationofActivity:target.files[0]})
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {errorInfo.CertificationofActivity &&
                                <ErrorInput error={errorInfo.CertificationofActivity}/>
                            }
                        </div>
                    </div>
                </div>
                
                <div className="text-center mb-10 w-1/2 mx-auto">
                    <i className="text-light italic text-red-500">Note: Updating your Company causing your Member Status become pending.</i>
                </div>
                <div className="px-3 mb-6 flex">
                    <div className="w-full pr-2">
                        <Link href="/admin/member/company/mycompany">
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
            </form>
        </PrimaryWrapper>
    )

}

MyCompany.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const loadSectors = await axios.get(`/sectorlist`)
    const sectorlist = loadSectors.data.data

    return {
        props: {
            session,
            routeParam: context.query,
            sectorlist
        }
    }
}