import React, {useState} from "react";
import {PageSEO} from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from "lib/axios";
import Link from 'next/link'

//components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

import TextInput from "@/components/Interface/Form/TextInput";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";

export default function ResetPassword(props) {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errInfo, setErrInfo] = useState({})
    const [errMessage, setErrMessage] = useState('')
    const [succesMessage, setSuccesMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrInfo({})
        setErrMessage('')
        setSuccesMessage('')
        const request = await axios.post("/reset-password",
            {
                token: props.resetpasswordtoken,
                password: enteredPassword,
                password_confirmation: enteredPasswordConfirmation
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                setSuccesMessage('Your password has been reset')
                setEnteredPassword('')
                setEnteredPasswordConfirmation('')
            }).catch((error) => {
                setErrInfo(error.data.data)
                setErrMessage("Something went wrong")
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <PageSEO title="Exepart - Reset Password Page" description={siteMetadata.description} />
            <IndexNavbar fixed />
            <section className="mt-20 md:mt-20 pb-40 relative bg-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-4">
                            <ImageLogo
                                size={300}
                            />
                        </div>
                        {succesMessage &&
                            <div className="justify-center text-center flex flex-wrap mb-20">
                                <div className="w-full lg:w-4/12 md:shadow-md p-5 bg-white">
                                    <div className="p-1">
                                        <p className="text-blue-500 text-lg italic">{succesMessage}</p>
                                        <p className="text-slate-500 text-sm">Try to <Link href="/auth/login" className="text-blueGray-700 underline">login</Link> with your new password</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {!succesMessage &&
                            <div className="justify-center text-center flex flex-wrap mb-20">
                                <div className="w-full lg:w-4/12 md:shadow-md p-5 bg-white">
                                    <form onSubmit={handleSubmit}>
                                        <h2 className="font-semibold text-2xl mb-4">Reset Password</h2>
                                        {errMessage &&
                                            <div className="p-1">
                                                <p className="text-red-500 text-lg italic">{errMessage}</p>
                                            </div>
                                        }
                                        <div className="relative">
                                            <TextInput
                                                className="w-full"
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="password"
                                                setIcon="fas fa-lock"
                                                value={enteredPassword}
                                                onChange={(input) => setEnteredPassword(input.value)}
                                                errorMsg={errInfo?.password}
                                            />
                                            <div className="absolute inset-y-3 right-4 flex items-start cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                                {showPassword ?
                                                    <i className="fas fa-eye-slash text-slate-500"></i> :
                                                    <i className="fas fa-eye text-slate-500"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="relative mt-2">
                                            <TextInput
                                                className="w-full"
                                                required
                                                type={showPasswordConfirmation ? 'text' : 'password'}
                                                name="password_confirmation"
                                                placeholder="password confirmation"
                                                setIcon="fas fa-lock"
                                                value={enteredPasswordConfirmation}
                                                onChange={(input) => setEnteredPasswordConfirmation(input.value)}
                                                errorMsg={errInfo?.password_confirmation}
                                            />
                                            <div className="absolute inset-y-3 right-4 flex items-start cursor-pointer" onClick={() => setShowPasswordConfirmation(prev => !prev)}>
                                                {showPasswordConfirmation ?
                                                    <i className="fas fa-eye-slash text-slate-500"></i> :
                                                    <i className="fas fa-eye text-slate-500"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="text-center mt-6">
                                            <SecondaryButton
                                                disabled={isLoading}
                                                type="submit"
                                                className="w-full font-bold uppercase"
                                            >
                                                {isLoading &&
                                                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                                                }
                                                Reset
                                            </SecondaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const token = context.params
    let validityTokenResponse = null
    const checkValidityToken = await axios.get(`/reset-password/${token.resetpasswordtoken}`)
        .then((res) => {
            validityTokenResponse = res.data.success
        })
        .catch((err) => {
            validityTokenResponse = err.data.success
        })

    if (validityTokenResponse) {
        return {
            props: context.params
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/auth/forgotpassword?redirect=true",
        }
    };
}