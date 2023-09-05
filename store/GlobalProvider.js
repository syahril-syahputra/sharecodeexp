import { useState } from "react"
import GlobalContext from "./global-context"
import axios from "@/lib/axios";

const BUYER = 'buyer';
const SELLER = 'seller';

const GlobalProvider = props => {
    const [incomingInquiry, setIncomingInquiry] = useState(0)
    const updateIncomingInquiry = async (token) => {
        const response = await axios.get(`/seller/order/count`,
        {
            headers: {
            "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => {       
            setIncomingInquiry(response.data.data)
        }).catch(() => {
            setIncomingInquiry(0)
        })

    }

    const [inquiryList, setInquiryList] = useState(0)
    const updateInquiryList = async (token) => {
        let newInquiryList;
        const response = await axios.get(`/countWish`,
        {
            headers: {
            "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => {        
            setInquiryList(response.data.data)
        }).catch(() => {
            setInquiryList(0)
        })
    }

    const [inquiredComponent, setInquiredComponent] = useState(0)
    const updateInquiredComponent = async (token) => {
        const response = await axios.get(`/buyer/order/count`,
        {
            headers: {
            "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => {       
            setInquiredComponent(response.data.data)
        }).catch(() => {
            setInquiredComponent(0)
        })

    }

    const [username, setUsername] = useState('...')
    const loadUsername = async (token) => {
        if(username === '...'){
            const response = await axios.get(`/my-account`,
            {
                headers: {
                "Authorization" : `Bearer ${token}`
                }
            })
            .then((response) => {       
                setUserPermission({
                    role: response.data.data.roles.id,
                    status: response.data.data.status.id
                })
                setUsername(response.data.data.name)
            }).catch(() => {
                setUsername('Please Logout')
            })
        }        
    }

    const [userPermission, setUserPermission] = useState({isLoading: true, role: 0, status: 0})
    const loadUserPermission = async (token) => {
        const response = await axios.get(`/my-account`,
        {
            headers: {
            "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => {       
            setUserPermission({
                isLoading: false,
                role: response.data.data.roles.id,
                status: response.data.data.status.id
            })
        }).catch(() => {
            setUsername({isLoading: false, role: 0, status: 0})
        })
    }

    const globalContext = {

        //sidebar seller
        incomingInquiry,
        updateIncomingInquiry,

        //sidebar buyer
        inquiryList,
        updateInquiryList,
        inquiredComponent,
        updateInquiredComponent,

        //loggeduser
        username,
        loadUsername,
        
        //load user permission
        userPermission,
        loadUserPermission,
    }

    return (
        <GlobalContext.Provider value={globalContext}>
            {props.children}
        </GlobalContext.Provider>
    )

}
export default GlobalProvider