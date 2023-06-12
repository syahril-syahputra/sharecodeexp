import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";
import moment from "moment";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep";
import AcceptQuotationModal from "@/components/Modal/OrderComponent/Buyer/AcceptQuotation"
import RejectQuotationModal from "@/components/Modal/OrderComponent/Buyer/RejectQuotation"
import SendPaymentDocsModal from "@/components/Modal/OrderComponent/Buyer/SendPaymentDocs"
import SendUpdatedPaymentDocsModal from "@/components/Modal/OrderComponent/Buyer/SendUpdatedPaymentDocs"
import AcceptOrderModal from "@/components/Modal/OrderComponent/Buyer/AcceptOrder"
import RejectOrderModal from "@/components/Modal/OrderComponent/Buyer/RejectOrder"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import OrderStatus from "@/components/Shared/Order/OrderStatus";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";

export default function InquiryDetails({session, routeParam, couriers}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [isOrderValid, setIsOrderValid] = useState(true)
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/buyer/${routeParam.orderid}/data`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                loadTodoAction(result.order_status.id)
                setIsOrderValid(true)
            }).catch(() => {
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
        const request = await axios.get(`/buyer/notification/${order_status_id}`, 
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

    const [acceptQuotationModal, setAcceptQuotationModal] = useState(false)
    const acceptQuotationModalHandle = async () => {

        setIsLoading(true)
        const response = await axios.post(`/buyer/AcceptOrder`, 
            {
              id:  data.id
            },
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then(() => {
                toast.success("Quotation has been accepted", toastOptions)
                setAcceptQuotationModal(false)
                loadData()
            }).catch((error) => {
                console.log(error)
                toast.error("Something went wrong", toastOptions)
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })


    }

    const [rejectionReason, setRejectionReasons] = useState([{value: 'other', label: 'Other'}])
    const loadRejectionReason = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/reason`)
            .then((response) => {
                let result = response.data
                setRejectionReasons([...result.data, {value: 'other', label: 'Other'}])
            }).catch((error) => {
                console.log(error)
                toast.error("Failed to load rejection reason", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadRejectionReason()
    }, [])
    const [rejectQuotationModal, setRejectQuotationModal] = useState(false)
    const rejectQuotationModalHandle = async (value) => {
        setIsLoading(true)
        const response = await axios.post(`/buyer/RejectOrder`, 
        {
            id:  data.id,
            reason: value
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Quotation has been rejected", toastOptions)
            setRejectQuotationModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [sendPaymentDocsModal, setSendPaymentDocsModal] = useState(false)
    const sendPaymentDocsModalHandle = async (shipment, paymentDocs, courier, accountInfo, receiversName) => {    
        let formData = new FormData();
        if(!shipment){
            setErrorInfo({shipinfobuyer: "This field can't be empty"})
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
            return
        }
        formData.append("Payment_doc", paymentDocs);
        formData.append("addressBuyer", shipment);
        formData.append("courier", courier);
        formData.append("fullnameReceiving", receiversName);
        formData.append("AccountInformation", accountInfo);
        formData.append("id", data.id)        
        setIsLoading(true)
        const response = await axios.post(`/buyer/SendPayment`, 
            formData,
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Payment has been sent", toastOptions)
            setSendPaymentDocsModal(false)
            loadData()
        }).catch((error) => {
            setErrorInfo(error.data.data)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [sendUpdatedPaymentDocsModal, setSendUpdatedPaymentDocsModal] = useState(false)
    const sendUpdatedPaymentDocsModalHandle = async (shipment, paymentDocs, courier, accountInfo, receiversName) => {
        let formData = new FormData();
        if(!shipment){
            setErrorInfo({shipinfobuyer: "This field can't be empty"})
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
            return
        }
        formData.append("Payment_doc", paymentDocs);
        formData.append("addressBuyer", shipment);
        formData.append("courier", courier);
        formData.append("fullnameReceiving", receiversName);
        formData.append("AccountInformation", accountInfo);
        formData.append("id", data.id)   
        setIsLoading(true)
        const response = await axios.post(`/buyer/SendPayment?update=1`, 
            formData,
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Payment has been updated", toastOptions)
            setSendUpdatedPaymentDocsModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            setErrorInfo(error.data.data)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const acceptOrderModalHandle = async () => {
        setIsLoading(true)
        const response = await axios.post(`/buyer/OrderAcc`, 
        {
            id:  data.id
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been Accepted", toastOptions)
            setAcceptOrderModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const rejectOrderModalHandle = async (rejection) => {
        setIsLoading(true)
        const response = await axios.post(`/buyer/ReturnOrder`, 
        {
            id:  data.id,
            reason: rejection
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been Rejected", toastOptions)
            setRejectOrderModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            setErrorInfo(error.data.data)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
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
                                Inquired Component: Order Details
                            </h3>
                        }
                        rightTop={
                            <Link href={`/admin/member/buycomponents/inquiredcomponents`}>
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
                        <h3
                            className="font-semibold text-lg text-blueGray-700">
                            Inquired Component: Order Details
                        </h3>
                    }
                    rightTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            Buyer
                        </h3>
                    }
                ></PageHeader>
                <OrderStatus 
                    status={data.order_status?.name}
                    action={todoValue}
                />
                {data.reason && data.order_status_id == 4 &&
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
            <div className="lg:flex lg:justify-around">
                <div className="w-full lg:w-1/2 mr-4">
                    <PrimaryWrapper>
                        <div className="m-2 p-2 text-md uppercase border-b text-center">
                            Tracker Number
                        </div>
                        <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                            {data.trackingBuyer ? data.trackingBuyer : 'No Data'}
                        </div>
                    </PrimaryWrapper>
                </div>
                <div className="w-full lg:w-1/2">
                    <PrimaryWrapper>
                        <div className="m-2 p-2 text-md uppercase border-b text-center">
                            Expected Shipment Date
                        </div>
                        <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                            {data.expectedShippingDateBuyer ? moment(data.expectedShippingDateBuyer).format('dddd, D MMMM YYYY') : 'No Data'}
                        </div>
                    </PrimaryWrapper>
                </div>                
            </div>
            
            {/* product images */}
            <PrimaryWrapper>
                <div className="w-full">
                    {data.companies_products?.img ? 
                        <div className="p-16 border mx-2 my-4">
                            <img className="object-contain mb-3 h-40 mx-auto" 
                            alt={data.companies_products.ManufacturerNumber}
                            src={publicDir + "/product_images/" + data.companies_products.img}/>
                        </div>
                    :
                        <div className="px-3 mb-6 md:mb-0 text-center">
                            <div className="p-24 border mx-2 my-4">product image {data.companies_products?.ManufacturerNumber}</div>
                        </div>
                    } 
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
                <div className="text-center mt-5 mb-2 w-1/2 mx-auto">
                    <span className="text-light text-slate-500">Order Created: {moment(data.created_at).format('dddd, D MMMM YYYY')}</span>
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
                                    ${data.price_profite} / ${data.price_profite ? (parseFloat(data.price_profite) * parseFloat(data.qty)) : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </PrimaryWrapper>

            {/* documents */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Documents
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/proforma_doc/" + data.proforma_doc}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.proforma_doc ? false : true} size="sm">
                                Proforma Invoice
                            </SecondaryButton>
                        </Link>
                    </div>    
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/Payment_doc/" + data.Payment_doc}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.Payment_doc ? false : true} size="sm">
                                Payment Document
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
                            disabled={data.order_status_id == 3 ? false : true} 
                            size="sm"
                            onClick={() => setAcceptQuotationModal(true) }
                        >
                            Accept Quotation
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 3 ? false : true} 
                            size="sm"
                            onClick={() => setRejectQuotationModal(true) }
                        >
                            Reject Quotation
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 6 ? false : true} 
                            size="sm"
                            onClick={() => setSendPaymentDocsModal(true) }
                        >
                            Send Payment Receipt
                        </WarningButton>
                    </div> 
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 15 ? false : true} 
                            size="sm"
                            onClick={() => setSendUpdatedPaymentDocsModal(true) }
                        >
                            Update Payment Receipt
                        </WarningButton>
                    </div>  
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 10 ? false : true} 
                            size="sm"
                            onClick={() => setAcceptOrderModal(true) }
                        >
                            Accept Order
                        </WarningButton>
                    </div>   
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 10 ? false : true} 
                            size="sm"
                            onClick={() => setRejectOrderModal(true) }
                        >
                            Reject Order
                        </WarningButton>
                    </div>        
                </div>
            </PrimaryWrapper>

            {/* modal */}
            <>
                {acceptQuotationModal && 
                    <AcceptQuotationModal
                        isLoading={isLoading}
                        expirationDate={data.quotation_expiration_date}
                        closeModal={() => setAcceptQuotationModal(false)}
                        acceptance={acceptQuotationModalHandle}
                    />
                }

                {rejectQuotationModal && 
                    <RejectQuotationModal
                        isLoading={isLoading}
                        rejectionReason={rejectionReason}
                        closeModal={() => setRejectQuotationModal(false)}
                        acceptance={rejectQuotationModalHandle}
                        errorInfo={errorInfo}
                    />
                }

                {sendPaymentDocsModal && 
                    <SendPaymentDocsModal
                        isLoading={isLoading}
                        closeModal={() => setSendPaymentDocsModal(false)}
                        acceptance={sendPaymentDocsModalHandle}
                        couriers={couriers}
                        errorInfo={errorInfo}
                    />
                }

                {sendUpdatedPaymentDocsModal && 
                    <SendUpdatedPaymentDocsModal
                        isLoading={isLoading}
                        closeModal={() => setSendUpdatedPaymentDocsModal(false)}
                        acceptance={sendUpdatedPaymentDocsModalHandle}
                        couriers={couriers}
                        errorInfo={errorInfo}
                    />
                }

                {acceptOrderModal && 
                    <AcceptOrderModal
                        isLoading={isLoading}
                        closeModal={() => setAcceptOrderModal(false)}
                        acceptance={acceptOrderModalHandle}
                    />
                }

                {rejectOrderModal && 
                    <RejectOrderModal
                        isLoading={isLoading}
                        closeModal={() => setRejectOrderModal(false)}
                        acceptance={rejectOrderModalHandle}
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
    const loadCouriers = await axios.get('/courierlist')
    const couriers = loadCouriers.data.data

    return {
        props: {
            session,
            routeParam: context.query,
            couriers
        }
    }
}