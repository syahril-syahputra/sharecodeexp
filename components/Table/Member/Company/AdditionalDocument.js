import Link from "next/link";
import BaseTable from "@/components/Interface/Table/BaseTable"
import HeaderTable from "@/components/Interface/Table/HeaderTable"
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import DangerButton from "@/components/Interface/Buttons/DangerButton";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function AdditionalDocument(props){
    const publicDir = process.env.NEXT_PUBLIC_DIR
    return (
        <PrimaryWrapper>
            <HeaderTable
                title={props.title}
            />
            <BaseTable   
                isBusy={props.isLoading}              
                header={
                    <>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Act
                        </th>
                    </>
                }
                tableData={
                    <>
                        {props.items.map((item) => {
                            return(
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link target="_blank" href={publicDir + "/registration/AddtionalDoc/" + item.name}>
                                            <PrimaryButton size="sm" className="mr-1">
                                                View
                                            </PrimaryButton>
                                        </Link>
                                        <WarningButton onClick={() => props.editHandler(item)} size="sm" className="mr-1">
                                            Edit
                                        </WarningButton>
                                        <DangerButton onClick={() => alert(':(')} size="sm" disabled>
                                            Delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                }                    
            />
        </PrimaryWrapper>
    )
}