/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from "next/router";

//components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

import TextInput from "@/components/Interface/Form/TextInput";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";

export default function ForgotPassword() {
    const router = useRouter();

    const [enteredEmail, setEnteredEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState({})
    const [succesMessage, setSuccesMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setSuccesMessage('Your email has been sent')
        router.push("/auth/resetpassword")
        console.log(enteredEmail)
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
                                    <h2 className="font-semibold text-4xl">Forgot Password</h2>
                                    {succesMessage &&
                                        <div className="mx-auto md:w-8/12">
                                            <div className="text-left text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-emerald-500">
                                                <span className="text-xl inline-block mr-5 align-middle">
                                                    <i className="fas fa-bell"></i>
                                                </span>
                                                <span className="inline-block align-middle mr-8">
                                                    <b className="capitalize">{succesMessage}</b>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    <div className="mx-auto mt-5">
                                        <TextInput
                                            setIcon="fas fa-envelope mt-1"
                                            className="w-full md:w-8/12"
                                            type="text" 
                                            disabled={isLoading}
                                            value={enteredEmail}
                                            placeholder="email" 
                                            onChange={(input) => setEnteredEmail(input.value)}
                                        />
                                    </div>
                                    <div className="mx-auto mt-5 mb-10">
                                        <SecondaryButton 
                                            type="submit"
                                            className="w-full md:w-8/12 font-bold uppercase"
                                            disabled={isLoading}
                                        >                                            
                                            {isLoading && 
                                                <>  
                                                    <i className="fas fa-hourglass fa-spin mr-2"></i>
                                                    Sending Email
                                                </>
                                            }
                                            {!isLoading && 
                                                <>
                                                    Send Email
                                                </>
                                            }
                                        
                                        </SecondaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
