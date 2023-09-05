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

    //logged user
    username: '...',
    loadUsername: (token) => {},

})

export default GlobalContext