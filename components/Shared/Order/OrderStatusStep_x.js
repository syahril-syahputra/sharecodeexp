// export default function OrderStatusStep(props){
//     return (
//         <div className="px-4 py-3 border-0 bg-white">
//             <div className="flex justify-center">
//                 <i className="fas fa-arrow-right text-blueGray-400 my-auto mr-2"></i> 
//                 <div className={`${props.orderStatus?.id == 1? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Inquired
//                 </div>
//                 <div className={`${props.orderStatus?.id == 2? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Verified
//                 </div>
//                 <div className={`${props.orderStatus?.id == 3? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Quotation Approval
//                 </div>
//                 <div className={`${props.orderStatus?.id == 4? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Quotation Rejected
//                 </div>
//                 <div className={`${props.orderStatus?.id == 5? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Quotation Approved
//                 </div>                
//                 <div className={`${props.orderStatus?.id == 6? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Proforma Invoice Send
//                 </div>
//                 <div className={`${props.orderStatus?.id == 7? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Payment Verification
//                 </div>
//                 <div className={`${props.orderStatus?.id == 15? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Payment Incorrect
//                 </div>
//                 <div className={`${props.orderStatus?.id == 8? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Payment Completed
//                 </div>
//             </div>
//             <div className="flex justify-center mt-2">
//                 <div className={`${props.orderStatus?.id == 9? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Shipment in Progress
//                 </div>
//                 <div className={`${props.orderStatus?.id == 10? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Order Shipped
//                 </div>
//                 <div className={`${props.orderStatus?.id == 11? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Order Returned
//                 </div>
//                 <div className={`${props.orderStatus?.id == 12? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Order Accepted
//                 </div>
//                 <div className={`${props.orderStatus?.id == 13? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Order Completed
//                 </div>
//                 <div className={`${props.orderStatus?.id == 14? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
//                     Order Cancelled
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState } from "react"


export default function OrderStatusStep(props){
    const [showStatuses, setShowStatuses] = useState()
    return (
        <>
            <div className="px-4 py-3 border-0 bg-white">
                <div className="flex justify-center">
                    <i className="fas fa-arrow-right text-blueGray-400 my-auto mr-2"></i> 
                    <div className={`${props.orderStatus?.id == 1? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 1 && props.orderStatus?.id != 2) && '1'}
                        {props.orderStatus?.id == 1 && 'Inquired'}
                        {props.orderStatus?.id == 2 && 'Inquired'}
                    </div>
                    <div className={`${props.orderStatus?.id == 2? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 1 && props.orderStatus?.id != 2 && props.orderStatus?.id != 3) && '2'}
                        {props.orderStatus?.id == 1 && 'Order Verified'}
                        {props.orderStatus?.id == 2 && 'Order Verified'}
                        {props.orderStatus?.id == 3 && 'Order Verified'}
                    </div>
                    <div className={`${props.orderStatus?.id == 3? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 2 && props.orderStatus?.id != 3 && props.orderStatus?.id != 4) && '3'}
                        {props.orderStatus?.id == 2 && 'Quotation Approval'}
                        {props.orderStatus?.id == 3 && 'Quotation Approval'}
                        {props.orderStatus?.id == 4 && 'Quotation Approval'}
                    </div>
                    <div className={`${props.orderStatus?.id == 4? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 3 && props.orderStatus?.id != 4 && props.orderStatus?.id != 5) && '4'}
                        {props.orderStatus?.id == 3 && 'Quotation Rejected'}
                        {props.orderStatus?.id == 4 && 'Quotation Rejected'}
                        {props.orderStatus?.id == 5 && 'Quotation Rejected'}
                    </div>
                    <div className={`${props.orderStatus?.id == 5? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 4 && props.orderStatus?.id != 5 && props.orderStatus?.id != 6) && '5'}
                        {props.orderStatus?.id == 4 && 'Quotation Approved'}
                        {props.orderStatus?.id == 5 && 'Quotation Approved'}
                        {props.orderStatus?.id == 6 && 'Quotation Approved'}
                    </div>                
                    <div className={`${props.orderStatus?.id == 6? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 5 && props.orderStatus?.id != 6 && props.orderStatus?.id != 7) && '6'}
                        {props.orderStatus?.id == 5 && 'Proforma Invoice Send'}
                        {props.orderStatus?.id == 6 && 'Proforma Invoice Send'}
                        {props.orderStatus?.id == 7 && 'Proforma Invoice Send'}
                    </div>
                    <div className={`${props.orderStatus?.id == 7? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 6 && props.orderStatus?.id != 7 && props.orderStatus?.id != 15) && '7'}
                        {props.orderStatus?.id == 6 && 'Payment Verification'}
                        {props.orderStatus?.id == 7 && 'Payment Verification'}
                        {props.orderStatus?.id == 15 && 'Payment Verification'}

                    </div>
                    <div className={`${props.orderStatus?.id == 15? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 7 && props.orderStatus?.id != 15 && props.orderStatus?.id != 8) && '8'}
                        {props.orderStatus?.id == 7 && 'Payment Incorrect'}
                        {props.orderStatus?.id == 15 && 'Payment Incorrect'}
                        {props.orderStatus?.id == 8 && 'Payment Incorrect'}
                    </div>
                    <div className={`${props.orderStatus?.id == 8? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>                    
                        {(props.orderStatus?.id != 15 && props.orderStatus?.id != 8 && props.orderStatus?.id != 9) && '9'}
                        {props.orderStatus?.id == 15 && 'Payment Completed'}
                        {props.orderStatus?.id == 8 && 'Payment Completed'}
                        {props.orderStatus?.id == 9 && 'Payment Completed'}
                    </div>
                    <div className={`${props.orderStatus?.id == 9? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {(props.orderStatus?.id != 8 && props.orderStatus?.id != 9 && props.orderStatus?.id != 10) && '10'}
                        {props.orderStatus?.id == 8 && 'Shipment in Progress'}
                        {props.orderStatus?.id == 9 && 'Shipment in Progress'}
                        {props.orderStatus?.id == 10 && 'Shipment in Progress'}
                    </div>
                    <div className={`${props.orderStatus?.id == 10? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {/* {props.orderStatus?.id == 10 ? 'Order Shipped' : '11'} */}

                        {(props.orderStatus?.id != 9 && props.orderStatus?.id != 10 && props.orderStatus?.id != 11) && '11'}
                        {props.orderStatus?.id == 9 && 'Order Shipped'}
                        {props.orderStatus?.id == 10 && 'Order Shipped'}
                        {props.orderStatus?.id == 11 && 'Order Shipped'}
                    </div>
                    <div className={`${props.orderStatus?.id == 11? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {/* {props.orderStatus?.id == 11 ? 'Order Returned' : '12'} */}

                        {(props.orderStatus?.id != 10 && props.orderStatus?.id != 11 && props.orderStatus?.id != 12) && '12'}
                        {props.orderStatus?.id == 10 && 'Order Returned'}
                        {props.orderStatus?.id == 11 && 'Order Returned'}
                        {props.orderStatus?.id == 12 && 'Order Returned'}
                    </div>
                    <div className={`${props.orderStatus?.id == 12? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {/* {props.orderStatus?.id == 12 ? 'Order Accepted' : '13'} */}

                        {(props.orderStatus?.id != 11 && props.orderStatus?.id != 12 && props.orderStatus?.id != 13) && '13'}
                        {props.orderStatus?.id == 11 && 'Receipt of Shimpent Confirmed'}
                        {props.orderStatus?.id == 12 && 'Receipt of Shimpent Confirmed'}
                        {props.orderStatus?.id == 13 && 'Receipt of Shimpent Confirmed'}
                    </div>
                    <div className={`${props.orderStatus?.id == 13? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                        {/* {props.orderStatus?.id == 13 ? 'Order Completed' : '14'} */}

                        {(props.orderStatus?.id != 12 && props.orderStatus?.id != 13 && props.orderStatus?.id != 14) && '14'}
                        {props.orderStatus?.id == 12 && 'Order Completed'}
                        {props.orderStatus?.id == 13 && 'Order Completed'}
                        {props.orderStatus?.id == 14 && 'Order Completed'}
                    </div>

                    {props.orderStatus?.id != 13 && 
                        <div className={`${props.orderStatus?.id == 14? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                            {/* {props.orderStatus?.id == 14 ? 'Order Cancelled' : '15'} */}

                            {(props.orderStatus?.id != 13 && props.orderStatus?.id != 14) && '15'}
                            {props.orderStatus?.id == 13 && 'Order Cancelled'}
                            {props.orderStatus?.id == 14 && 'Order Cancelled'}
                        </div>
                    }
                </div>
                <div className="text-center mt-1">
                    <span onClick={() => setShowStatuses(true)} className="text-sm text-slate-500 text-center italic underline cursor-pointer">Click for Status Detail</span>
                </div>
            </div>
            {showStatuses && 
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-full max-w-8xl max-h-full">
                        <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                            <h3 className="text-3xl font-semibold">
                            Order Status
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowStatuses(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                            </div>
                            <div className="relative p-6 flex-auto">                            
                                <div className="px-4 py-3 border-0 bg-white">
                                    <div className="flex justify-center">
                                        <div className={`${props.orderStatus?.id == 1? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                1
                                            </div>
                                            Inquired
                                        </div>
                                        <div className={`${props.orderStatus?.id == 2? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                2
                                            </div>
                                            Verified
                                        </div>
                                        <div className={`${props.orderStatus?.id == 3? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                3
                                            </div>
                                            Quotation Approval
                                        </div>
                                        <div className={`${props.orderStatus?.id == 4? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                4
                                            </div>
                                            Quotation Rejected
                                        </div>
                                        <div className={`${props.orderStatus?.id == 5? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                5
                                            </div>
                                            Quotation Approved
                                        </div>                
                                        <div className={`${props.orderStatus?.id == 6? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                6
                                            </div>
                                            Proforma Invoice Send                                            
                                        </div>
                                        <div className={`${props.orderStatus?.id == 7? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                7
                                            </div>
                                            Payment Verification
                                        </div>
                                        <div className={`${props.orderStatus?.id == 15? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                8
                                            </div>
                                            Payment Incorrect
                                        </div>
                                        <div className={`${props.orderStatus?.id == 8? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                9
                                            </div>
                                            Payment Completed
                                        </div>
                                        <div className={`${props.orderStatus?.id == 9? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                10
                                            </div>
                                            Shipment in Progress
                                        </div>
                                        <div className={`${props.orderStatus?.id == 10? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                11
                                            </div>
                                            Order Shipped
                                        </div>
                                        <div className={`${props.orderStatus?.id == 11? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                12
                                            </div>
                                            Order Returned
                                        </div>
                                        <div className={`${props.orderStatus?.id == 12? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                13
                                            </div>
                                            Receipt of Shimpent Confirmed
                                        </div>
                                        <div className={`${props.orderStatus?.id == 13? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                14
                                            </div>
                                            Order Completed
                                        </div>
                                        <div className={`${props.orderStatus?.id == 14? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2 px-3  border text-sm text-center`}>
                                            <div className="rounded-full font-bold w-6 h-6 mx-auto">
                                                15
                                            </div>
                                            Order Cancelled
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowStatuses(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }
        </>
    )
}