import DangerButton from "@/components/Interface/Buttons/DangerButton";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import BaseTable from "@/components/Interface/Table/BaseTable";
import HeaderTable from "@/components/Interface/Table/HeaderTable";
import NoData from "@/components/Interface/Table/NoData";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import Link from "next/link";

export default function UsersList(props){
    return(
        <PrimaryWrapper>
            <HeaderTable
                title={props.title}
                action={
                    <Link href="/admin/member/settings/users/add">
                        <SecondaryButton
                            size="sm"
                        >
                            <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                            Add Account
                        </SecondaryButton>
                    </Link>
                }
            ></HeaderTable>
            <BaseTable
                isBusy={props.isLoading}
                header={
                    <>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email Verified At
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Act.
                        </th>
                    </>
                }
                tableData={
                    <>
                        {props.data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email_verified_at}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex">
                                            <Link href={`/admin/member/settings/users/edit/${item.id}`}>
                                                <WarningButton
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                Edit
                                            </WarningButton>
                                            </Link>
                                            <DangerButton
                                                size="sm"
                                                onClick={() => props.deleteAccount(item)}
                                            >
                                                Delete
                                            </DangerButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {!props.isLoading && props.data.length === 0 &&
                            <NoData colSpan={4}/>
                        }
                    </>
                }
            ></BaseTable>
        </PrimaryWrapper>
    )
}