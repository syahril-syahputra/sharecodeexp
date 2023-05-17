import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import VerifyInquiryModal from "@/components/Modal/OrderComponent/Seller/VerifyInquiry"
import EditVerifiedOrderModal from "@/components/Modal/OrderComponent/Seller/EditVerifiedOrder"
import SendTrackerModal from "@/components/Modal/OrderComponent/Seller/SendTracker"
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import OrderStatus from "@/components/Shared/Order/OrderStatus";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";

export default function InquiryDetails({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const [isOrderValid, setIsOrderValid] = useState(true)
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/seller/${routeParam.orderid}/data`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                // console.log(response)
                let result = response.data.data
                setData(result)
                loadTodoAction(result.order_status.id)
                setIsOrderValid(true)
            }).catch(() => {
                // console.log(error.response)
                setIsOrderValid(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])

    const [todoValue, setTodoValue] = useState()
    const loadTodoAction = async (order_status_id) => {
        const request = await axios.get(`/seller/notification/${order_status_id}`, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
            setTodoValue(response.data.data.message)
        })
    }

    const [errorInfo, setErrorInfo] = useState({})
    const [verifyInquiryModal, setVerifyInquiryModal] = useState(false)
    const verifyInquiryModalHandle = async (inputData) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/seller/UpdateToVerified`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been verified", toastOptions)
            setVerifyInquiryModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [editVerifiedOrderModal, setEditVerifiedOrderModal] = useState(false)
    const editVerifiedOrderModalHandle = async (inputData) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/seller/EditWrongVerify`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been verified", toastOptions)
            setEditVerifiedOrderModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [sendTrackerModal, setSendTrackerModal] = useState(false)
    const sendTrackerModalHandle = async (sellerTracker, paymentAccount) => {
        setIsLoading(true)
        setErrorInfo({})

        let formData = new FormData();
        formData.append("PaymentDocSeller", paymentAccount);
        formData.append("trackingSeller", sellerTracker);
        formData.append("id", data.id)  
        const response = await axios.post(`/seller/UpdateToPreparingShipment`, formData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Tracker has been set", toastOptions)
            setSendTrackerModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    if(!isOrderValid) {
        return (
            <>
                <PrimaryWrapper>
                    <PageHeader
                        leftTop={
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                Incoming Inquiry : Order Detail
                            </h3>
                        }
                        rightTop={
                            <Link href={`/admin/member/sellcomponents/incominginquiry`}>
                                <LightButton 
                                    size="sm" 
                                    className="mr-2">
                                    <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                                    Back
                                </LightButton>
                            </Link>
                        }
                    ></PageHeader>
                    <div className="h-64 px-4 py-3 border-0 mt-2">
                        <div className="flex justify-center">
                            <div className=" text-center">
                                <h4 className="font-semibold text-xl italic">Your Order is Not Found</h4>
                            </div>
                        </div>
                    </div>
                </PrimaryWrapper>
            </>
        )
    }

    return (
        <>
            <PrimaryWrapper>
                <PageHeader
                    leftTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            Incoming Inquiry : Order Detail
                        </h3>
                    }
                    rightTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            Seller
                        </h3>
                    }
                ></PageHeader>

                <OrderStatus 
                    status={data.order_status?.name}
                    action={todoValue}
                />

                {data.reason && 
                    <div className="px-4 py-3 border-0 bg-red-400 mt-2">
                        <div className="flex justify-center">
                            <div className=" text-center">
                                <h4
                                    className="font-semibold text-sm text-white italic">
                                    Rejection: {data.reason}
                                </h4>
                            </div>
                        </div>
                    </div>
                }
                <OrderStatusStep orderStatus={data.order_status}/>
            </PrimaryWrapper>
            
            {/* tracker for seller */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Tracker Number
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    {data.trackingSeller ? data.trackingSeller : 'No Data'}
                </div>
            </PrimaryWrapper>

            {/* product images */}
            <PrimaryWrapper>
                <div className="w-full">
                    <div className="px-3 mb-6 md:mb-0 text-center">
                        <div className="p-24 border mx-2 my-4">product image</div>
                    </div>
                </div>
                <div className="text-center">
                    <p>Product Description</p>
                </div>
                <div className="text-center mb-10">
                    <p>{data.companies_products?.Description}</p>
                </div>
                {/*  table component */}
                <div className="overflow-x-auto mb-5 flex justify-center">
                    <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Manufacturer Part Number
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Manufacturer
                                </th>   
                                <th scope="col" className="text-center px-6 py-3">
                                    Available Quantity
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    MOQ
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Country
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Packaging
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Category
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Sub-Category
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white hover:bg-gray-50">
                                <td scope="row" className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.ManufacturerNumber}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.Manufacture}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.AvailableQuantity}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.moq}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.country}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.packaging}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.subcategory?.name}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.subcategory?.category?.name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* table order information */}
                <div className="overflow-x-auto mb-10 flex justify-center">
                    <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                        <thead className="text-xs text-white uppercase bg-blue-500">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3">
                                    Order Quantity
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Date Code
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Price (per item) / Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white hover:bg-gray-50">
                                <td className="text-center text-sm px-6 py-4">
                                    {data.qty}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.dateCode}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    ${data.price} / ${parseFloat(data.price) * parseInt(data.qty)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {data.price_profite &&
                    <div className="text-center mb-10 w-1/2 mx-auto">
                        <i className="text-light italic text-red-500">Note: Price is only for the product. The order type is Ex-works. The price you see on screen does not include logistical costs, customs, tax, insurance or any additional expenses that may occur.</i>
                    </div>
                }
            </PrimaryWrapper>

            {/* documents */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Documents
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/shipinfoforseller/" + data.shipinfoforseller}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.shipinfoforseller ? false : true} size="sm">
                                Shipment Info 
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/PaymentDocSeller/" + data.PaymentDocSeller}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.PaymentDocSeller ? false : true} size="sm">
                                Seller's Invoice
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/PaymentProof/" + data.PaymentProof}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.PaymentProof ? false : true} size="sm">
                                Payment Receipt for Seller
                            </SecondaryButton>
                        </Link>
                    </div>           
                </div>
            </PrimaryWrapper>

            {/* action */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Actions
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 1 ? false : true} 
                            size="sm"
                            onClick={() => setVerifyInquiryModal(true) }
                        >
                            Edit & Verify
                        </WarningButton>
                    </div>   
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 2 ? false : true} 
                            size="sm"
                            onClick={() => setEditVerifiedOrderModal(true) }
                        >
                            Edit Verified Order
                        </WarningButton>
                    </div>   
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 8 ? false : true} 
                            size="sm"
                            onClick={() => setSendTrackerModal(true) }
                        >
                            Send Document & Tracker
                        </WarningButton>
                    </div>     
                </div>
            </PrimaryWrapper>

            {/* modal */}
            <>
                {verifyInquiryModal && 
                    <VerifyInquiryModal
                        isLoading={isLoading}
                        orderId={data.id}
                        orderQty={data.qty}
                        availableQty={data.companies_products?.AvailableQuantity}
                        moq={data.companies_products?.moq}
                        dateCode={data.companies_products?.dateCode}
                        closeModal={() => setVerifyInquiryModal(false)}
                        acceptance={verifyInquiryModalHandle}
                        errorInfo={errorInfo}
                    />
                }

                {editVerifiedOrderModal && 
                    <EditVerifiedOrderModal
                        isLoading={isLoading}
                        orderId={data.id}
                        orderQty={data.qty}
                        availableQty={data.companies_products?.AvailableQuantity}
                        moq={data.companies_products?.moq}
                        price={data.price}
                        dateCode={data.companies_products?.dateCode}
                        closeModal={() => setEditVerifiedOrderModal(false)}
                        acceptance={editVerifiedOrderModalHandle}                        
                        errorInfo={errorInfo}
                    />
                }

                {sendTrackerModal && 
                    <SendTrackerModal
                        isLoading={isLoading}
                        closeModal={() => setSendTrackerModal(false)}
                        acceptance={sendTrackerModalHandle}
                        errorInfo={errorInfo}
                    />
                }
            </>
        </>
    );
}
    
InquiryDetails.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session,
            routeParam: context.query
        }
    }
}