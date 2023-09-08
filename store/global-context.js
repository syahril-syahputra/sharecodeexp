import React from "react";

const GlobalContext = React.createContext({
    //sidebar counter
    //seller
    incomingInquiry: 0,
    updateIncomingInquiry: (token) => {},

    //buyer
    inquiryList: 0,
    updateInquiryList: (token) => {},
    inquiredComponents: 0,
    updateInquiredComponent: (token) => {},
    //above this will be deleted

    //logged user
    username: '...',
    loadUsername: (token) => {},

    //buyer sidebar counter
    buyerSidebarCounter: {},
    loadBuyerSidebarCounter: (token) => {},

    //seller sidebar counter
    sellerSidebarCounter: {},
    loadSellerSidebarCounter: (token) => {},

    //admin sidebar counter
    adminSidebarCounter: {},
    loadAdminSidebarCounter: (token) => {},

})

export default GlobalContext