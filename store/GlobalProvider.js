import React, { useState } from 'react'
import GlobalContext from './global-context'
import axios from '@/lib/axios'

const BUYER = 'buyer'
const SELLER = 'seller'

const GlobalProvider = (props) => {
  const [incomingInquiry, setIncomingInquiry] = useState(0)
  const updateIncomingInquiry = async (token) => {
    const response = await axios
      .get(`/seller/order/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIncomingInquiry(response.data.data)
      })
      .catch(() => {
        setIncomingInquiry(0)
      })
  }

  const [inquiryList, setInquiryList] = useState(0)
  const updateInquiryList = async (token) => {
    let newInquiryList
    const response = await axios
      .get(`/countWish`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInquiryList(response.data.data)
      })
      .catch(() => {
        setInquiryList(0)
      })
  }

  const [inquiredComponent, setInquiredComponent] = useState(0)
  const updateInquiredComponent = async (token) => {
    const response = await axios
      .get(`/buyer/order/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInquiredComponent(response.data.data)
      })
      .catch(() => {
        setInquiredComponent(0)
      })
  }

  const [username, setUsername] = useState('...')
  const loadUsername = async (token) => {
    if (username === '...') {
      const response = await axios
        .get(`/my-account`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.data.name)
        })
        .catch(() => {
          setUsername('Please Logout')
        })
    }
  }

  let buyerSidebarInitialState = {
    order: {
      active: 0,
      inquiries_rejected: 0,
      quotation_rejected: 0,
      complete: 0,
      not_arrived: 0,
    },
  }
  const [buyerSidebarCounter, setBuyerSidebarCounter] = useState(
    buyerSidebarInitialState
  )
  const loadBuyerSidebarCounter = async (token) => {
    const response = await axios
      .get(`/buyer/sidebar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBuyerSidebarCounter(response.data.data)
      })
      .catch(() => {
        setBuyerSidebarCounter(buyerSidebarInitialState)
      })
  }

  let sellerSidebarInitialState = {
    product: {
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    order: {
      active: 0,
      inquiries_rejected: 0,
      quotation_rejected: 0,
      bad_result: 0,
      complete: 0,
    },
  }
  const [sellerSidebarCounter, setSellerSidebarCounter] = useState(
    sellerSidebarInitialState
  )
  const loadSellerSidebarCounter = async (token) => {
    const response = await axios
      .get(`/seller/sidebar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSellerSidebarCounter(response.data.data)
      })
      .catch(() => {
        setSellerSidebarCounter(sellerSidebarInitialState)
      })
  }

  let adminSidebarInitialState = {
    registry: {
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    product: {
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    order: {
      active: 0,
      inquiries_rejected: 0,
      quotation_rejected: 0,
      complete: 0,
      not_arrived: 0,
    },
  }
  const [adminSidebarCounter, setAdminSidebarCounter] = useState(
    adminSidebarInitialState
  )
  const loadAdminSidebarCounter = async (token) => {
    const response = await axios
      .get(`/admin/sidebar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminSidebarCounter(response.data.data)
      })
      .catch(() => {
        setAdminSidebarCounter(adminSidebarInitialState)
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

    //Buyer
    buyerSidebarCounter,
    loadBuyerSidebarCounter,

    //Seller
    sellerSidebarCounter,
    loadSellerSidebarCounter,

    //Administrator
    adminSidebarCounter,
    loadAdminSidebarCounter,
  }

  return (
    <GlobalContext.Provider value={globalContext}>
      {props.children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider
