import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";

import { useRouter } from "next/router";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import LightButton from "@/components/Interface/Buttons/LightButton";
import TextInput from "@/components/Interface/Form/TextInput";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import DangerNotification from "@/components/Interface/Notification/DangerNotification";

export default function EditContributor({session, routerParam}) {    
    const [isLoading, setIsLoading] = useState(true)
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/master/users?query=${routerParam.userid}`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
            let result = response.data.data
            setInputData({
                id: result.id,
                name: result.name,
                email: result.email,
                password: '',
                password_confirmation: '',
            })            
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    useEffect(() => {
        loadData()
    }, [])

    //update data
    const [inputData, setInputData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const setDataHandler = (input) => {
        setInputData({...inputData, [input.name]:input.value})
    }
    const router = useRouter()
    
    const [errorInfo, setErrorInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorInfo({})
        setErrorMessage(null)
        const response = await axios.post(`/master/users/${inputData.id}/update`, inputData, {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            router.push("/admin/member/settings/users");
            toast.success("Your Contributors has been updated succefully", toastOptions)
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorMessage("Please fill your form correctly")
            setErrorInfo(error.data.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }


    return (
        <>
            <PrimaryWrapper>
                <PageHeader
                    leftTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            Edit Contributors
                        </h3>
                    }
                    rightTop={
                        <Link href={`/admin/member/settings/users`}>
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

                <form onSubmit={handleSubmit} className="pl-1 mt-6">
                    <div className="w-full lg:w-1/2 px-3 mb-6">
                        <TextInput
                            disabled={isLoading}
                            required
                            label="Name"
                            name="name"
                            value={inputData.name}
                            onChange={(input) => setDataHandler(input)}
                            errorMsg={errorInfo?.name}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-3 mb-6">
                        <TextInput
                            disabled={isLoading}
                            required
                            label="Email"
                            type="email"
                            name="email"
                            value={inputData.email}
                            onChange={(input) => setDataHandler(input)}
                            errorMsg={errorInfo?.email}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-3 mb-6">
                        <div className="relative">
                            <TextInput
                                disabled={isLoading}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                name="password"
                                value={inputData.password}
                                errorMsg={errorInfo?.password}
                                onChange={(input) => setDataHandler(input)}
                            /> 
                            <div className="absolute inset-y-3 right-4 top-9 flex items-start cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ?  
                                    <i className="fas fa-eye-slash text-slate-500"></i> :
                                    <i className="fas fa-eye text-slate-500"></i>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-3 mb-10">
                        <div className="relative">                                                    
                            <TextInput
                                label="Confirm Password"
                                type={showConfirmationPassword ? 'text' : 'password'}
                                required
                                name="password_confirmation"
                                value={inputData.password_confirmation}
                                errorMsg={errorInfo?.password_confirmation}
                                onChange={(input) => setDataHandler(input)}
                            /> 
                            <div className="absolute inset-y-3 right-4 top-9 flex items-start cursor-pointer" onClick={() => setShowConfirmationPassword(prev => !prev)}>
                                {showConfirmationPassword ?  
                                    <i className="fas fa-eye-slash text-slate-500"></i> :
                                    <i className="fas fa-eye text-slate-500"></i>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-3 mb-6">
                        <Link href={`/admin/superadmin/settings/users`}>
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
        </>
    );
}

EditContributor.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session,
            routerParam: context.query
        }
    }
}