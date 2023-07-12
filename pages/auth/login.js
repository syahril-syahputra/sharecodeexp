/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import { useRouter } from "next/router";

//components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import TextInput from "@/components/Interface/Form/TextInput";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function Login() {
    const router = useRouter();
    const {status} = useSession()
    if(status == 'authenticated'){
        router.replace("/admin/dashboard")
    }
    
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState({
        error: ' ',
        status: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMessage({error: ' ', status: ''})
        setIsLoading(true)
        const request = await signIn('credentials', {
            email: enteredEmail,
            password: enteredPassword,
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                setErrMessage(res)
                setIsLoading(false)
            } 
        }).catch((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <PageSEO title="Exepart - Login" description={siteMetadata.description} />
            <IndexNavbar fixed hideLogin/>
            <section className="relative bg-white pb-36 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-5">
                            <ImageLogo
                                size={250}
                            />
                        </div>
                        <div className="justify-center text-center flex flex-wrap mb-20">
                            <div className="w-full md:w-4/12 md:shadow-md p-5 bg-white">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="font-semibold text-2xl">Sign in to EXEpart</h2>
                                    <div className="p-1 h-10">
                                        <p className="text-red-500 text-lg italic">{errMessage.error}</p>
                                    </div>
                                    <div className="text-center items-stretch mb-3">
                                        <TextInput
                                            className="w-full md:w-11/12"
                                            required
                                            name="email"
                                            placeholder="email"
                                            setIcon="fas fa-user"
                                            value={enteredEmail}
                                            onChange={(input) => setEnteredEmail(input.value)}
                                        />                                        
                                    </div> 
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <TextInput
                                                className="w-full md:w-11/12"
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="password"
                                                setIcon="fas fa-lock"
                                                value={enteredPassword}
                                                onChange={(input) => setEnteredPassword(input.value)}
                                            /> 
                                        <div className="absolute inset-y-0 right-8 flex items-center cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                            {showPassword ?  
                                                <i className="fas fa-eye-slash text-slate-500"></i> :
                                                <i className="fas fa-eye text-slate-500"></i>
                                            }
                                        </div>
                                    </div>
                                    <div className="text-right items-stretch mb-5 md:px-5">
                                        <p className="text-blueGray-400 hover:text-blueGray-700"><Link href="/auth/forgotpassword">Forgot Password</Link></p>
                                    </div>
                                    <div className="text-center mt-2">
                                        <PrimaryButton
                                            disabled={isLoading}
                                            type="submit"
                                            className="w-full md:w-11/12 font-bold uppercase"
                                        >
                                            {isLoading &&
                                                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                                            }
                                            Login
                                        </PrimaryButton>                                    
                                    </div>
                                </form>
                                <div className="relative flex mt-5 items-center w-full md:w-10/12 mx-auto">
                                    <div className="flex-grow border-t border-blueGray-700"></div>
                                    <div className="flex-shrink mx-4"><p className="text-blueGray-400">Or</p></div>
                                    <div className="flex-grow border-t border-blueGray-700"></div>
                                </div>
                                <div className="text-center mt-5 mb-10">
                                    <p className="text-blueGray-400">Didn't have account? <Link href="/auth/register" className="text-blueGray-400 hover:text-blueGray-700 underline">Register instead</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
