import { useState } from "react"
import RejectButton from "@/components/Buttons/RejectButton"
import InputForm from "@/components/Shared/InputForm";
import Select from 'react-tailwindcss-select';
import ErrorInput from '@/components/Shared/ErrorInput';
export default function RejectQuotation(props){
    const [rejectionReason, setRejectionReason] = useState()
    const handleRejectionChange = (value) => {
        setRejectionData('')
        setRejectionReason(value)
        if(value.value != 'other') {
            setRejectionData(value.value)
        }
    }

    const [rejectionData, setRejectionData] = useState()
    const handleRejection = () => {
        props.acceptance(rejectionData)
    }

    const setDataHandler = (item, inputName) => {
        setRejectionData(item.value)
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full h-full max-w-lg md:h-auto">
                {/*content*/}
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                        Reject Quotation
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
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">Reject</span> this Quotation? Select the reason bellow to continue rejecting.
                    </p>
                    <div className="w-full mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Rejection Reason
                        </label>
                        <Select 
                            name="rejectionReason"
                            value={rejectionReason}
                            onChange={handleRejectionChange}
                            options={props.rejectionReason}
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
                        {props.errorInfo.reason &&
                            <ErrorInput error={props.errorInfo.reason}/>
                        }
                        { rejectionReason?.value == "other" && 
                            <InputForm
                                inputDataName="rejectionData"
                                value={rejectionData}
                                setData={setDataHandler}
                                errorMsg={props.errorInfo?.reason}
                            />
                        }
                    </div>

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
                    {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => props.acceptance(rejectionReason)}
                    >
                        Reject
                    </button> */}

                    {rejectionReason &&
                        <RejectButton
                            buttonTitle="Reject Quotaion"
                            isLoading={props.isLoading}
                            onClick={handleRejection}
                        />
                    }

                    {!!rejectionReason == false &&
                        <RejectButton
                            buttonTitle="Reject Quotaion"
                            isLoading={true}
                            onClick={handleRejection}
                        />
                    }
                    

                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}