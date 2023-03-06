/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Link from "next/link";

//components
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useRouter } from "next/router";

export default function Index() {
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
                    </div>
                    <div className="text-center mt-10 mb-36">
                        <h1 className="text-2xl">Your Registration is Successfull!</h1>
                        <h2 className="text-blueGray-500">your account need a confirmation from EXEPART admin, please <Link href="/auth/login" className="text-blueGray-700 underline">login</Link> to check your account</h2>
                    </div>
                </div>
            </section>
                
            <Footer />
        </>
    );
}
