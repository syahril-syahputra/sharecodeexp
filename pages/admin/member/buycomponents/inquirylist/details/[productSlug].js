import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import GlobalContext from "@/store/global-context";

// layout for page
import Admin from "layouts/Admin.js";

// components
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import ComponentStatus from "@/components/Shared/Component/Statuses";
import NumberInput from "@/components/Interface/Form/NumberInput";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import LoadingState from "@/components/Interface/Loader/LoadingState";
import LightButton from "@/components/Interface/Buttons/LightButton";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";

export default function AddToInquiryList({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    const {updateInquiryList} = useContext(GlobalContext)
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const getData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/product/${routeParam.productSlug}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setData(result)
                setOrderQuantity(result.moq)
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const [orderQuantity, setOrderQuantity] = useState(0)
    const router = useRouter()
    const setDataHandler = (input) => {
        setOrderQuantity(input.value)
    }
    const [errorInfo, setErrorInfo] = useState({})
    const addToListHandle = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/addtoWish`, {
            id: data.id,
            qty: orderQuantity
        }, {
        headers: {
            "Authorization" : `Bearer ${session.accessToken}`
        }
        })
        .then(() => {
            updateInquiryList(session.accessToken)
            router.push(`/admin/member/buycomponents/inquirylist`)
            toast.success("The product has been added to list", toastOptions)
        }).catch((error) => {
            toast.error("Something went wrong. Can not add data to Inquiry List.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    } 

    return (
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3 className="font-semibold text-lg text-blueGray-700">
                        Add To List
                    </h3>
                }
                rightTop={
                    <>
                        <Link target="_blank" href={publicDir + "/product_datasheet/" + data.datasheet}>
                            <SecondaryButton
                                size="sm"
                                className="mr-2"
                                disabled={data.datasheet ? false : true}
                            >   
                                <i className="mr-2 ml-1 fas fa-eye"></i>
                                View Datasheet
                            </SecondaryButton>
                        </Link>
                        <Link href="/product/search">
                            <LightButton 
                                size="sm">
                                Search Another Product
                            </LightButton>
                        </Link>
                    </>
                    
                }
            ></PageHeader>

            <div className="">
                <div className="flex flex-wrap w-full bg-white">
                    <div className="px-3 mb-6 md:mb-0 text-center">
                        {data.img ? 
                            <div className="p-16 border mx-2 my-4">
                                <img className="object-contain mb-3 h-40 mx-auto" 
                                alt={data.ManufacturerNumber}
                                src={publicDir + "/product_images/" + data.img}/>
                            </div>
                        :
                            <div className="px-3 mb-6 md:mb-0 text-center">
                                <div className="p-24 border mx-2 my-4">product image {data.ManufacturerNumber}</div>
                            </div>
                        } 
                    </div>
                    <div className="md:w-25 mt-5">
                        <div>
                            <NumberInput
                                label="QTY(s)"
                                name="qty"
                                disabled={isLoading}
                                value={orderQuantity}
                                onChange={(input) => setDataHandler(input)}
                                errorMsg={errorInfo?.qty}
                                min="1"
                            ></NumberInput>
                        </div>
                        <div className="mt-5">
                            <PrimaryButton
                                disabled={isLoading}
                                size="sm"
                                onClick={addToListHandle}
                            >
                                <i className="mr-2 ml-1 fas fa-cart-shopping text-white"></i>
                                Add to List
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            
            {isLoading ? 
                <LoadingState className="pb-10"/>
            :
                <div className="overflow-x-auto pb-10">
                    <table className="w-50 text-sm text-left text-gray-500 bg-white">
                        <tbody>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Manufacturer Part Number
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.ManufacturerNumber}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Manufacturer
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.Manufacture}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Available Quantity
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.AvailableQuantity}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    MOQ
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.moq}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.country}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.Description}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Date Code
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.dateCode}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Packaging
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.packaging}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.subcategory?.category?.name}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Sub-Category
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    {data.subcategory?.name}
                                </td>
                            </tr>
                            <tr className="text-black hover:bg-slate-100">
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <td scope="row" className="text-sm px-6 py-4">
                                    :
                                </td>
                                <td className="text-sm px-2 py-4">
                                    <ComponentStatus status={data.status} title={`stock status ${data.status}`} label={data.status}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            
        </PrimaryWrapper>
    )
}

AddToInquiryList.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
        return {
            redirect: {
                destination: '/auth/login'
            }
        }
    }
    
    if(session.user.userDetail.role_id == 1){
        return {
            redirect: {
              permanent: false,
              destination: '/admin/superadmin?redirect=true',
            },
            props: {}
          };
    }


    const loadCompany = await axios.get(`/company`, {
        headers: {
        "Authorization" : `Bearer ${session.accessToken}`
        }
    })
    const company = loadCompany.data.data

    if(company.is_confirmed === 'pending' || company.is_confirmed === 'rejected'){
        return {
            redirect: {
              permanent: false,
              destination: '/admin/member?redirect=true',
            },
            props: {
                
            }
          };
    }

    return {
        props: {
            session,
            routeParam: context.query,
        }
    }
}