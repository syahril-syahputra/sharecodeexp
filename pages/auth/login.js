/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'

//components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useRouter } from "next/router";

export default function Index() {
    const router = useRouter();
    const {status} = useSession()
    if(status == 'authenticated'){
        router.replace("/")
    }
    
    const [userInfo, setUserInfo] = useState({email: '', password: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState({
        error: ' ',
        status: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMessage({error: ' ', status: ''})
        setIsLoading(true)
        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false
        }).then((res) => {
            if (res?.error) {
                setErrMessage(res)
                setIsLoading(false)
            } else {
                router.push("/");
            }
        }).catch((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <PageSEO title="Exepart - Login Page" description={siteMetadata.description} />
            <IndexNavbar fixed />
            <section className="mt-20 md:mt-20 pb-40 relative bg-white">
                <div className="container mx-auto">
                    <div className="mt-36">
                        <div className="px-5 pt-5 pb-4">
                            <ImageLogo
                                size={300}
                            />
                        </div>
                        <div className="justify-center text-center flex flex-wrap mb-20">
                            <div className="w-full md:w-6/12 px-12 md:px-4 shadow-md p-5">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="font-semibold text-4xl">Sign In</h2>
                                    <div className="mt-5 p-1 h-10">
                                        <p className="text-red-500 text-lg italic">{errMessage.error}</p>
                                    </div>
                                    <div className="text-center items-stretch mb-3 mt-6">
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent text-lg items-center justify-center w-8 pl-3 py-3">
                                            <i className="fas fa-user mt-2"></i>
                                        </span>
                                        <input 
                                            value={userInfo.email} 
                                            onChange={({target}) => 
                                                setUserInfo({...userInfo, email:target.value})
                                            }
                                            type="text" 
                                            placeholder="email" 
                                            className="md:w-8/12 shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pl-10"/>
                                    </div> 
                                    <div className="text-center items-stretch mb-3 mt-2">
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent text-lg items-center justify-center w-8 pl-3 py-3">
                                            <i className="fas fa-lock mt-2"></i>
                                        </span>
                                        <input 
                                            value={userInfo.password} 
                                            onChange={({target}) => 
                                                setUserInfo({...userInfo, password:target.value})
                                            }
                                            type="password" 
                                            placeholder="password" 
                                            className="md:w-8/12 shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pl-10"/>
                                    </div>
                                    <div className="text-center mt-10">
                                        <p className="text-blueGray-400 hover:text-blueGray-700"><Link href="/auth/forgotpassword">Forgot Password</Link></p>
                                    </div>
                                    <div className="text-center mb-6">
                                        {!isLoading && 
                                            <button
                                                type="submit"
                                                className="w-full md:w-8/12 mt-4 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-indigo-900 active:bg-indigo-800 uppercase text-sm shadow hover:shadow-lg"
                                            >
                                            Login
                                            </button>
                                        }
                                        {isLoading && 
                                            <button
                                                disabled
                                                type="submit"
                                                className="w-full md:w-8/12 mt-4 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-indigo-400 uppercase text-sm"
                                            >
                                                <i className="fas fa-circle-notch fa-spin"></i>
                                            </button>
                                        }
                                        
                                    </div>
                                </form>
                                <div className="relative flex py-5 items-center w-full md:w-8/12 mx-auto">
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
