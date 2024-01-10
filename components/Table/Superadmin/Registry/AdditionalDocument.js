import Link from "next/link";
import BaseTable from "@/components/Interface/Table/BaseTable"
import HeaderTable from "@/components/Interface/Table/HeaderTable"
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import NoData from "@/components/Interface/Table/NoData";
import PageHeader from "@/components/Interface/Page/PageHeader";
import LightButton from "@/components/Interface/Buttons/LightButton";

export default function AdditionalDocument(props){
    const publicDir = process.env.NEXT_PUBLIC_DIR
    return (
        <PrimaryWrapper>
            <PageHeader
                    leftTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            {props.title}
                        </h3>
                    }
                    rightTop={
                        <Link href={`/admin/superadmin/registry/details/${props.companyId}`}>
                            <LightButton 
                                size="sm" 
                                className="mr-2">
                                <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                                Back
                            </LightButton>
                        </Link>
                    }
                ></PageHeader>
            <BaseTable   
                isBusy={props.isLoading}              
                header={
                    <>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Action
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