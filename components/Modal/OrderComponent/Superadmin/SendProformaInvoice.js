import { useState } from "react"
import { BaseModalXLarge } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import ImageLogo from "@/components/ImageLogo/ImageLogo";
export default function SendProformaInvoice(props){
    const [proformaDocs, setProformaDocs] = useState()

    return (
        <>
            <BaseModalXLarge
                title="Proforma Invoice"
                onClick={() => props.closeModal()}
                body={
                    <>  
                        <span className="italic text-sm">*preview it on desktop</span>
                        <div className="mt-5 w-full border-2 border-blue-200 p-5">
                            <ImageLogo className="ml-0" size={200}></ImageLogo>
                            <label className="block uppercase tracking-wide text-gray-700 text-md font-bold my-4" htmlFor="grid-last-name">
                                Proforma Invoice Document
                            </label>

                            <div className="lg:flex lg:justify-around mb-5">
                                <div className="w-full lg:w-2/3 mr-4">
                                    <div className="my-1 text-md font-bold">
                                        From
                                    </div>
                                    <div className="my-1 text-md">
                                        EXEpart Electronics INC.
                                    </div>
                                    <table className="text-sm w-full text-left table-fixed mr-4">
                                        <tbody>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 w-40 font-medium text-gray-900 whitespace-nowrap">
                                                    Address
                                                </th>
                                                <td className="w-5">
                                                    :
                                                </td>
                                                <td className="">
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab 
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab White Horse Test Lab
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Contact Name
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    Kadek Cahya
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Phone Number
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    +555 555 555
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Email
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    my@email.com
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>                                    
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <div className="my-1 text-md font-bold">
                                        PI Number
                                    </div>
                                    <div className="my-1 text-md">
                                        [Order Number]
                                    </div>
                                    <div className="my-1 text-md font-bold">
                                        PI Date
                                    </div>
                                    <div className="my-1 text-md">
                                        [PI Date]
                                    </div>
                                </div>
                            </div>
                            <div className="lg:flex lg:justify-around mb-10">
                                <div className="w-full lg:w-1/2 mr-4">
                                    <div className="my-1 text-md font-bold">
                                        Bill To
                                    </div>
                                    <div className="my-1 text-md">
                                        EXEpart Electronics INC.
                                    </div>
                                    <table className="text-sm w-full text-left table-fixed mr-4">
                                        <tbody>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 w-40 font-medium text-gray-900 whitespace-nowrap">
                                                    Address
                                                </th>
                                                <td className="w-5">
                                                    :
                                                </td>
                                                <td className="">
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab 
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab White Horse Test Lab
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Contact Name
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    Kadek Cahya
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Phone Number
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    +555 555 555
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Email
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    my@email.com
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="my-1 text-md font-bold">
                                        Ship To
                                    </div>
                                    <div className="my-1 text-md">
                                        EXEpart Electronics INC.
                                    </div>
                                    <table className="text-sm w-full text-left table-fixed mr-4">
                                        <tbody>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 w-40 font-medium text-gray-900 whitespace-nowrap">
                                                    Address
                                                </th>
                                                <td className="w-5">
                                                    :
                                                </td>
                                                <td className="">
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab 
                                                    White Horse Test Lab White Horse Test Lab White Horse Test Lab White Horse Test Lab
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Contact Name
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    Kadek Cahya
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Phone Number
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    +555 555 555
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    Email
                                                </th>
                                                <td className="">
                                                    :
                                                </td>
                                                <td className="">
                                                    my@email.com
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                            
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                P/N
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Mfg
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                DC
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Unit Price (USD)
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Price (USD)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="px-6 py-4">
                                                Silver
                                            </td>
                                            <td className="px-6 py-4">
                                                Laptop
                                            </td>
                                            <td className="px-6 py-4">
                                                $2999
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                QQQ
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                $$$$
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                $2999
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="px-6 py-4">
                                                Silver
                                            </td>
                                            <td className="px-6 py-4">
                                                Laptop
                                            </td>
                                            <td className="px-6 py-4">
                                                $2999
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                QQQ
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                $$$$
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                $2999
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:flex lg:justify-around mt-5 mb-5">
                                <div className="w-full lg:w-2/3 mr-4"></div>
                                <div className="w-full lg:w-1/3">
                                    <div className="mx-2 my-1 border-b">
                                        <div className="flex flex-wrap justify-between">
                                            <span className="uppercase text-md">Subtotal</span>
                                            <span className="uppercase text-md pr-4">$$$$</span>
                                        </div>
                                    </div>
                                    <div className="mx-2 my-1">
                                        <div className="flex flex-wrap justify-between">
                                            <span className="uppercase text-md">TOTAL (USD)</span>
                                            <span className="uppercase text-md pr-4">$$$$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="my-1 text-md font-bold">
                                    Terms & Conditions
                                </div>
                                <div className="my-1 text-sm">
                                    1. Below Terms and Conditions of Sale applies to all orders supplied by Exepart.
                                </div>
                                <div className="my-1 text-sm">
                                    2. Below Terms and Conditions of Sale applies to all orders supplied by Exepart.
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="my-1 text-md font-bold">
                                    BANK ACCOUNT INFORMATION
                                </div>
                                <table className="text-sm w-full text-left table-fixed mr-4">
                                    <tbody>
                                        <tr className="bg-white">
                                            <th className="font-medium w-48 text-gray-900 whitespace-nowrap">
                                                Bank Name
                                            </th>
                                            <td className="w-5">
                                                :
                                            </td>
                                            <td className="">
                                                White Horse Test
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                Bank Address
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                White Horse Test
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                Account Holder's Name
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                Account Holder's Name
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                Account Holder's Address
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                Account Holder's Address
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                Account Holder's No
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                Account Holder's No
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                ABA Routing No
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                Account Holder's No
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th className="font-medium text-gray-900 whitespace-nowrap">
                                                BIC/SWIFT Code
                                            </th>
                                            <td className="">
                                                :
                                            </td>
                                            <td className="">
                                                Account Holder's No
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>
                        </div>                        
                    </>
                }
                action={
                    <>
                        <LightButton
                            disabled={props.isLoading}
                            size="sm"
                            className="mr-2"
                            onClick={() => props.closeModal()}
                            >
                            No, Close
                        </LightButton>

                        <PrimaryButton
                            disabled={props.isLoading}
                            size="sm"
                            onClick={() => props.acceptance(proformaDocs)}>
                            {props.isLoading &&
                                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                            }
                            Send Proforma Invoice
                        </PrimaryButton>
                    </>
                }
            ></BaseModalXLarge>
        </>
    )
}