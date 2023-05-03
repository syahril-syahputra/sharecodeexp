import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep";
import OrderTodo from "@/components/Shared/Order/OrderTodo"
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

export default function InquiryDetails({session, routeParam, couriers}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
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
            }).catch((error) => {
                // console.log(error.response)
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

    return (
        <>
            <div className="relative bg-white">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                My Inquiry : Order Detail
                            </h3>
                        </div>
                        <div className="px-4 flex-initial w-64">

                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 border-0 bg-blue-500">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold uppercase text-xl text-white">
                                {data.order_status?.name}
                            </h4>
                        </div>
                    </div>
                </div>
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
                <OrderTodo action={todoValue}/>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        <div className="px-3 mb-5">
                            <div className="p-24 border mx-2 my-4">{"component image"}</div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                       This is components description
                    </div>
                    {/*  table A */}
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
                    {/* table B */}
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
                                        ${data.price_profite} / ${parseFloat(data.price_profite) * parseFloat(data.qty)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {data.trackingBuyer && 
                <div className="px-4 py-3 border-0 bg-slate-200 mb-5">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Tracker Number : {data.trackingBuyer}
                            </h4>
                        </div>
                    </div>
                </div>
                }

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Documents
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        {data.proforma_doc ? 
                            <Link target="_blank" href={publicDir + "/uploads/proforma_doc/" + data.proforma_doc}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Proforma Invoice
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Proforma Invoice
                            </button>
                        }
                        {data.Payment_doc ? 
                            <Link target="_blank" href={publicDir + "/uploads/Payment_doc/" + data.Payment_doc}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Payment Receipt
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Payment Receipt
                            </button>
                        }
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Actions
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">

                        {data.order_status_id == 3 ?
                            <button onClick={()=> setAcceptQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Accept Quotation
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Accept Quotation
                            </button>
                        }

                        {data.order_status_id == 3 ?
                            <button onClick={()=> setRejectQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Reject Quotation
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Reject Quotation
                            </button>
                        }
                        
                        {data.order_status_id == 6?
                            <button onClick={()=> setSendPaymentDocsModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Payment Receipt
                            </button>
                            :
                            <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Payment Receipt
                            </button>
                        }
                        {data.order_status_id == 15 &&
                            <button onClick={()=> setSendUpdatedPaymentDocsModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Update Payment Receipt
                            </button>
                        }

                        {data.order_status_id == 10?
                            <button onClick={()=> setAcceptOrderModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Accept Order
                            </button>
                            :
                            <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Accept Order
                            </button>
                        }

                        {data.order_status_id == 10?
                            <button onClick={()=> setRejectOrderModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Reject Order
                            </button>
                            :
                            <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Reject Order
                            </button>
                        }

                    </div>
                </div>

                {acceptQuotationModal && 
                    <AcceptQuotationModal
                        isLoading={isLoading}
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
            </div>
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