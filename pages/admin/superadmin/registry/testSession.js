import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import CompanyList from "@/components/Table/Superadmin/Registry/CompanyList";
import Cookies from "js-cookie";
// layout for page
import Admin from "layouts/Admin.js";

export default function Company() {
    // Cookies.get('accessToken')
    const session = useSession()


    return (
        <>
            <div className="relative">
            </div>
        </>
    );
}


Company.layout = Admin;
