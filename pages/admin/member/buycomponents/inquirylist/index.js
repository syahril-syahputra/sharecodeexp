import React, {useState, useEffect, useContext} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import GlobalContext from "@/store/global-context";

// components
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import ComponentList from "@/components/Table/Member/InquiryList/ComponentList"
import EditQuantityModal from "@/components/Modal/InquiryComponent/EditQuantity"
import InquiryNowModal from "@/components/Modal/InquiryComponent/InquiryNow"
import DeleteInquireModal from "@/components/Modal/InquiryComponent/DeleteInquire";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"


// layout for page
import Admin from "layouts/Admin.js";

export default function InquiryList({session}) {
    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [metaData, setMetaData] = useState({
        total: 0,
        perPage: 0,
        lastPage: 0
    })
    const searchData = async (page=1) =>{
        setIsLoading(true)
        const response = await axios.get(`/Wishlist?page=${page}`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                setLinks(result.links)
                setMetaData({
                    total: result.total,
                    perPage: result.per_page,
                    lastPage: result.last_page,
                    currentPage: result.current_page,
                    nextPage: result.next_page_url ? true : false,
                    prevPage: result.prev_page_url ? true : false
                })
            }).catch((error) => {
                toast.error('Something went wrong. Can not load Inquiry List', toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const setPage = (item) => {
        searchData(item)
    }
    useEffect(() => {
        searchData()
    }, [])

    const handleSearch = (item) =>{
        setSearch(item)
        searchData()
    }

    const [orderQuantity, setOrderQuantity] = useState(0)
    const [listId, setListid] = useState(0)
    const [itemSingleValue, setItemSingleValue] = useState(0)
    const [errorInfo, setErrorInfo] = useState({})

    const [showEditQuantityModal, setShowEditQuantityModal] = useState(false)
    const handleEdit = (listId, qty, itemValue) => {
        setErrorInfo({})
        setOrderQuantity(qty)
        setListid(listId)
        setItemSingleValue(itemValue)
        setShowEditQuantityModal(true)
    }
    const handleEditSubmitQuantity = async (qty) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/updateWish`, {
            id: listId,
            qty: qty
        }, {
        headers: {
            "Authorization" : `Bearer ${session.accessToken}`
        }
        })
        .then(() => {
            toast.success("Component has been edited", toastOptions)
            searchData()
            setShowEditQuantityModal(false)
            setOrderQuantity(0)
            setListid(0)
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })

    }

    //context
    const {updateInquiryList, updateInquiredComponent} = useContext(GlobalContext)

    const [showInquiryNowModal, setShowInquiryNowModal] = useState(false)
    const handleInquiryNow = (listId, qty, itemValue) => {
        setErrorInfo({})
        setListid(listId)
        setOrderQuantity(qty)
        setItemSingleValue(itemValue)
        setShowInquiryNowModal(true)
    }
    const handleSubmitInquiryNow = async (qty) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/InquiryWishList`, {
            id: listId
        }, {
        headers: {
            "Authorization" : `Bearer ${session.accessToken}`
        }
        })
        .then(() => {
            updateInquiredComponent(session.accessToken)
            updateInquiryList(session.accessToken)
            toast.success("Component has been inquired", toastOptions)
            searchData()
            setShowInquiryNowModal(false)
            setOrderQuantity(0)
            setListid(0)
        }).catch(() => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo()
            setIsLoading(false)
        })

    }

    const [showDeleteInquireModal, setShowDeleteInquireModal] = useState(false)
    const handleDeleteInquire = (listId, itemValue) => {
        setErrorInfo({})
        setListid(listId)
        setItemSingleValue(itemValue)
        setShowDeleteInquireModal(true)
    }
    const handleSubmitDeleteInquire = async () => {
        setIsLoading(true)
        const response = await axios.delete(`/removefromWish`, {
          headers: {
            "Authorization" : `Bearer ${session.accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            id: listId
          }
        })
        .then(() => {
            updateInquiryList(session.accessToken)
            toast.success("Your Inquire Component Successfully Deleted", toastOptions)
            setShowDeleteInquireModal(false)
            searchData()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong", toastOptions)
        }).finally(() => {
          setIsLoading(false)
        })
    }

    return (
        <>
            <div className="">
                <div className="mb-5 w-full lg:w-1/2">
                    <MiniSearchBar searchItem={handleSearch}/>
                </div>
                <ComponentList
                    title="Inquiry List"
                    setPage={setPage}
                    isLoading={isLoading}
                    data={data}
                    links={links}
                    metaData={metaData}
                    handleEdit={handleEdit}
                    handleInquiryNow={handleInquiryNow}
                    handleDelete={handleDeleteInquire}
                ></ComponentList>
            </div>

            {showEditQuantityModal ? (
                <EditQuantityModal
                    isLoading={isLoading}
                    setShowModal={setShowEditQuantityModal}
                    orderQuantity={orderQuantity}
                    title={itemSingleValue}
                    acceptModal={handleEditSubmitQuantity}
                    errorMsg={errorInfo?.qty}
                />
            ) : null}

            {showInquiryNowModal ? (
                <InquiryNowModal
                    isLoading={isLoading}
                    title={itemSingleValue}
                    orderQuantity={orderQuantity}
                    setShowModal={setShowInquiryNowModal}
                    acceptModal={handleSubmitInquiryNow}
                />
            ) : null}

            {showDeleteInquireModal ? (
                <DeleteInquireModal
                    isLoading={isLoading}
                    title={itemSingleValue}
                    setShowModal={setShowDeleteInquireModal}
                    acceptModal={handleSubmitDeleteInquire}
                />
            ) : null}

        </>
    );
}

InquiryList.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}