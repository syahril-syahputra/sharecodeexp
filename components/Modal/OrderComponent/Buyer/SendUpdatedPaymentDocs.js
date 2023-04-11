import { useState } from "react"
import AcceptButton from "@/components/Buttons/AcceptButton";
import ErrorInput from '@/components/Shared/ErrorInput';
import Select from 'react-tailwindcss-select';
export default function SendUpdatedPaymentDocs(props){
    const [couriers, setCouriers] = useState(props.couriers)
    const [paymentDocs, setPaymentDocs] = useState()
    const [shipmentInfo, setShipmentInfo] = useState()

    const [courier, setCourier] = useState(null);
    const [selectedCourier, setSelectedCourier] = useState(null);
    const handleCourierChange = value => {
        setCourier(value);
        setSelectedCourier(value.value)
    };

    const [buyerAccountInformation, setBuyerAccountInformation] = useState()

    const handleSubmit = () => {
        props.acceptance(shipmentInfo, paymentDocs, selectedCourier, buyerAccountInformation)
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                        Update Payment
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => props.closeModal()}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                    {/* <form onSubmit={handleSubmit} ref={refdata}> */}
                    <form>
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Payment Receipt Document
                            </label>
                            <div className="p-5 border-dashed border-2 border-indigo-200">
                                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                    <div className='text-center my-auto'>
                                        <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                    </div>
                                    <div className="text-xs ">
                                        <p>PDF file size no more than 10MB</p>
                                        <input 
                                            className="mt-3" 
                                            type="file"
                                            name='payment_docs'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setPaymentDocs(target.files[0])
                                            }
                                            // onChange={({target}) => 
                                            //     setRegistrationInfo({...registrationInfo,company_RegistrationDocument:target.files[0]})
                                            // }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo?.Payment_doc &&
                                <ErrorInput error={props.errorInfo?.Payment_doc}/>
                            }
                        </div>
                        <div className="w-full px-3 mb-6 mt-10">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Buyer’s Shipment Address
                            </label>
                            <textarea 
                                value={shipmentInfo}
                                onChange={({target}) => 
                                    setShipmentInfo(target.value)
                                }
                                autoComplete="off" 
                                type="text"
                                className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                            {props.errorInfo?.shipinfobuyer &&
                                <ErrorInput error={props.errorInfo?.shipinfobuyer}/>
                            }
                        </div>                        
                        <div className="w-full md:w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Courier
                            </label>
                            <Select 
                                name="courier"
                                value={courier}
                                onChange={handleCourierChange}
                                options={couriers}
                                classNames={{
                                    menuButton: () => (
                                        `h-12 flex p-1 text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none`
                                    ),
                                    menu: "absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700",
                                    listItem: ({ isSelected }) => (
                                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                                            isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                        }`
                                    ),
                                    searchBox: "rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500"
                                }}
                                />
                            {props.errorInfo?.courier &&
                                <ErrorInput error={props.errorInfo?.courier}/>
                            }
                        </div>
                        <div className="w-full px-3 mb-6 mt-10">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Buyer’s Courier Account Information
                            </label>
                            <textarea 
                                value={buyerAccountInformation}
                                onChange={({target}) => 
                                    setBuyerAccountInformation(target.value)
                                }
                                autoComplete="off" 
                                type="text"
                                className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                            {props.errorInfo?.shipinfobuyer &&
                                <ErrorInput error={props.errorInfo?.shipinfobuyer}/>
                            }
                        </div>
                    </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => props.closeModal()}
                    >
                        Close
                    </button>
                    <AcceptButton
                        buttonTitle="Send"
                        isLoading={props.isLoading}
                        onClick={handleSubmit}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}