import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

//data

export default function EditAdmin({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/profile`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                setInputData({
                    name: result.name,
                    email: result.email,
                    password: '',
                    password_confirmation: '',
                })
            }).catch((error) => {
            // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])

    // update data
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [succesMessage, setSuccesMessage] = useState(null)
    const setDataHandler = (item, inputName) => {
        setInputData({...inputData, [inputName]:item.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorInfo({})
        setErrorMessage(null)
        const response = await axios.post(`/admin/profile/update`, inputData, {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
            let result = response.data.data
            setSuccesMessage("Your account has been updated succefully")
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
            setErrorInfo(error.response.data.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }


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
                            Edit Admin 
                            </h3>
                        </div>
                        <div className="px-4 mt-2">
                            <Link href={`/admin/superadmin/usercontrol/admin`} className="relative bg-blueGray-700 p-2 text-white">
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
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                                isDisabled={isLoading}
                                label="Name"
                                inputDataName="name"
                                value={inputData.name}
                                setData={setDataHandler}
                                errorMsg={errorInfo.name}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                                isDisabled={isLoading}
                                label="Email"
                                inputDataName="email"
                                value={inputData.email}
                                setData={setDataHandler}
                                errorMsg={errorInfo.email}
                                inputType="email"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                                isDisabled={isLoading}
                                label="Password"
                                inputDataName="password"
                                value={inputData.password}
                                setData={setDataHandler}
                                errorMsg={errorInfo.password}
                                inputType="password"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-6">
                            <InputForm
                                isDisabled={isLoading}
                                label="Password Confirmation"
                                inputDataName="password_confirmation"
                                value={inputData.password_confirmation}
                                setData={setDataHandler}
                                errorMsg={errorInfo.password_confirmation}
                                inputType="password"
                            />
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

EditAdmin.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session
        }
    }
}

