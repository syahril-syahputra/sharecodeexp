import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import IndexUserDropdown from "components/Dropdowns/IndexUserDropdown.js";
import UserPopover from "components/Shared/Popover/UserPopover"
import LogoutModal from "@/components/Modal/Logout/Logout";
import PrimaryButton from "../Interface/Buttons/PrimaryButton";

export default function Component() {
    // const {data, status} = useSession();
    const session = useSession()
    const [user, setUser] = useState({
        name: '...'
    })
    useEffect(() => { setUser({name: session.data?.name}) }, [session])
    const [logoutModal, setLogoutModal] = useState(false)
    if (session.status === 'authenticated') {
        return (
        <>
            <li>
                <IndexUserDropdown />
            </li>
            <li className="flex items-center ml-4">
                <Link href="/admin/dashboard">
                    <i className="text-blueGray-400 fas fa-home text-lg leading-lg " />
                    <span className="lg:hidden inline-block ml-2">Dashboard</span>
                </Link>
            </li>
            <li  title="Logout">
                <button title="Logout"
                    onClick={() => setLogoutModal(true)}
                    className="p-1 ml-4"
                    type="button"
                >
                    <i className="fas fa-right-from-bracket text-blueGray-400"></i> 
                    <span className="lg:hidden inline-block ml-2">Logout</span>
                </button>
            </li>  
            
            {logoutModal && 
                <LogoutModal 
                    closeModal={() => setLogoutModal(false)}
                    acceptance={() => {
                        signOut({
                            callbackUrl: `${window.location.origin}`
                        });
                    }}
                />
            }
        </>
        )
    }
    return (
        <>
            <PrimaryButton
                size="sm"
                className="uppercase px-4"
                onClick={() => {
                    signIn();
                }}
            >
                <i className="fas fa-user mr-2"></i> 
                Sign In 
            </PrimaryButton>
        </>
    )
}