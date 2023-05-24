import Link from "next/link";
import BaseTable from "@/components/Interface/Table/BaseTable"
import HeaderTable from "@/components/Interface/Table/HeaderTable"
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import NoData from "@/components/Interface/Table/NoData";

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
                                            <SecondaryButton size="sm" className="mr-1">
                                                View
                                            </SecondaryButton>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        {!props.isLoading && props.items.length === 0 &&
                            <NoData colSpan={2}/>
                        }
                    </>
            }                    
        />
        </PrimaryWrapper>
    )
}