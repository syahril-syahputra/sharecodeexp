import React, {useState, useMemo} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// layout for page
import Admin from "layouts/Admin.js";
import LoadingState from "@/components/Interface/Loader/LoadingState";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import Link from "next/link";
import SelectInput from "@/components/Interface/Form/SelectInput";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// components

export default function DownloadOrdersData({session, buyersData, orderStatusesData}) {
    //data search
    const [isLoading, setIsLoading] = useState(false)
    const [downloadLink, setDownloadLink] = useState('')

    const [buyerId, setBuyerId] = useState('')
    const [selectedBuyerId, setSelectedBuyerId] = useState('');
    const buyers = useMemo(() => buyersData, [])
    const handleBuyerChange = (value) => {
        setBuyerId(value)
        setSelectedBuyerId(value.value)
    }

    const [orderStatusId, setOrderStatusId] = useState('')
    const [selectedOrderStatusId, setSelectedOrderStatusId] = useState('');
    const orderStatuses = useMemo(() => orderStatusesData, [])
    const handleStatusChange = (value) => {
        setOrderStatusId(value)
        setSelectedOrderStatusId(value.value)
    }

    const generateLink = async (e) =>{
        e.preventDefault()
        setIsLoading(true) 
        const response = await axios.get(`/admin/orders/download?buyer_id=${selectedBuyerId}&orderStatus_id=${selectedOrderStatusId}`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                toast.success("Link Generated Successfully", toastOptions)
                setDownloadLink(response.data.data)

                setOrderStatusId('')
                setSelectedOrderStatusId('')
                setBuyerId('')
                setSelectedBuyerId('')
            }).catch((err) => {
                toast.error("Something went wrong. Can not generate link", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    
    return (
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3 className="font-semibold text-lg text-blueGray-700">
                        Download Orders Data
                    </h3>
                }
            ></PageHeader>

            <div className="p-4 ">
                <form onSubmit={generateLink} className="w-full lg:w-1/2">
                    <div className="text-slate-500 italic text-sm mb-4">
                        <p>Optional selection</p>
                    </div>
                    <div className="mb-4">
                        <SelectInput
                            searchable
                            disabled={isLoading}                              
                            label="Select Buyer"
                            name="reason"
                            value={buyerId}
                            options={buyers}
                            onChange={handleBuyerChange}
                        />                        
                    </div>
                    <div className="mb-8">
                        <SelectInput
                            searchable
                            disabled={isLoading}                              
                            label="Select Status"
                            name="orderStatus_id"
                            value={orderStatusId}
                            options={orderStatuses}
                            onChange={handleStatusChange}
                        />                        
                    </div>
                    <PrimaryButton
                        disabled={isLoading}
                        type="submit"
                        className="mr-2"
                    >   
                        {isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Generate Download Link
                    </PrimaryButton>
                    <Link target="_blank" href={downloadLink}>
                        <SecondaryButton
                            disabled={!downloadLink}                        
                            >Download
                        </SecondaryButton>
                    </Link>
                </form>
                {downloadLink &&
                    <div className="text-slate-500 italic pt-10">
                        <p className="text-sm">if the Download button is unavailable use this link bellow, or copy into your browser</p>
                        <a target="_blank" className="text-sm text-blue-500 underline" href={downloadLink}>{downloadLink}</a>
                    </div>
                }
            </div>


        </PrimaryWrapper>
    );
}
    
DownloadOrdersData.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    let buyersData = null;
    const loadBuyers = await axios.get(`/admin/companiesData`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((res) => {
            buyersData = res.data.data
        })
        .catch((err) => {
            buyersData = []
        })

    let orderStatusesData = null;
    const loadOrderStatuses = await axios.get(`/allstatus?drop=1`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((res) => {
            orderStatusesData = res.data.data
        })
        .catch((err) => {
            orderStatusesData = []
        })

    return {
        props: {
            session,
            buyersData,
            orderStatusesData
        }
    }
}