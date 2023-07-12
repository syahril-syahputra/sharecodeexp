import { useEffect, useState } from "react";
import axios from "@/lib/axios";

import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import BaseTable from "@/components/Interface/Table/BaseTable";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import NoData from "@/components/Interface/Table/NoData";

export default function ModalOrderStatusList(props){
    const [isLoading, setIsLoading] = useState(true)
    const [orderStatus, setOrderStatus] = useState([])
    const loadOrder = () => {
        setIsLoading(true)
        const request = axios.get('/allstatus')
            .then((response) => {
                setOrderStatus(response.data.data)
            })
            .catch((err) => {
                toast.error("Cannot load order status list.", toastOptions)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => loadOrder(), [])

    return (
        <BaseModalLarge
            title="Order Status List"
            onClick={() => props.closeModal()}
            body={
                <>
                    <BaseTable
                        isBusy={isLoading}              
                        header={
                            <>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </>
                        }
                        tableData={
                            <>
                                {orderStatus.map((item, index) => {
                                    return(
                                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                            <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                                {index+1}
                                            </td>
                                            <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                        </tr>
                                    )
                                })}
                                {orderStatus.length === 0 &&
                                    <NoData colSpan={2}/>
                                }
                            </>
                        } 
                    ></BaseTable>
                </>
            }
            action={
                <>
                    <LightButton
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                        >
                        Close
                    </LightButton>

                </>
            }
        ></BaseModalLarge>
    )
}


