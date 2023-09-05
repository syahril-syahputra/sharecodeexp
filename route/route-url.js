export const MyAccountUrl = {
    view: "/admin/myaccount",
    edit: "/admin/myaccount/edit"
}

export const PublicUrl = {
    termOfUse: "/resources/term-of-use",
    conditionOfSale: "/resources/condition-of-sale",
    privacyPolicy: "/resources/privacy-policy",
    conditionOfExport: "/resources/condition-of-export",
    cookiePolicy: "/resources/cookie-policy",
    contactUs: "contactus"
}

export const AdminUrl = {
    dahsboard: "/admin/superadmin",
    registry: {
        pending: "/admin/superadmin/registry/pendingcompany",
        approved: "/admin/superadmin/registry/approvedcompany",
        rejected: "/admin/superadmin/registry/rejectedcompany",
        detailCompany: "/admin/superadmin/registry/company/"
    },
    propductManagement: {
        pending: "/admin/superadmin/components/pending",
        accepted: "/admin/superadmin/components/accepted",
        rejected: "/admin/superadmin/components/rejected",
    },
    orderProduct: {
        allOrders: "/admin/superadmin/orders/allorders",
        activeOrders: "/admin/superadmin/orders/activeorders",
        completedOrder: "/admin/superadmin/orders/completedorders",
        rejectedQuotation: "/admin/superadmin/orders/rejectedquotation",
        rejectedOrders: "/admin/superadmin/orders/rejectedorders",
        cancelledOrders: "/admin/superadmin/orders/cancelledorders",
        companyOrderBuyer: "/admin/superadmin/orders/companyorderbuyer",
        companyOrderSeller: "/admin/superadmin/orders/companyorderseller",
        pendingPayment: "/admin/superadmin/orders/pendingpayment",
        pendingShipment: "/admin/superadmin/orders/pendingshipment",
        completedShipment: "/admin/superadmin/orders/completedshipment"        
    },
    statistic: {
        unfoundComponents: "/admin/superadmin/statistics/unfoundcomponent",
        memberStatistics: "/admin/superadmin/statistics/memberstatistic",
        orderStatistics: "/admin/superadmin/statistics/orderstatistic",
        databaseStatistics: "/admin/superadmin/statistics/databasestatistic"
    },
    userControl: {
        vendors: "/admin/superadmin/usercontrol/vendors",
        contributors: "/admin/superadmin/usercontrol/contributors",       
    },
}


export const VendorUrl = {
    dahsboard: "/admin/member",
    sellerDahsboard: "/admin/member/seller/dashboard",
    buyerDahsboard: "/admin/member/buyer/dashboard",
    sellingProduct: {
        product : {
            index: "/admin/member/seller/product",
            insert: "/admin/member/seller/product/add",
            bulkInsert: "/admin/member/seller/product/bulk-insert",
            detail: "/admin/member/seller/product/details",
            edit: "/admin/member/seller/product/edit",
        },
        incomingInquiries: {
            index: "/admin/member/seller/incoming-inquiry",
            detail: "/admin/member/seller/incoming-inquiry/detail"
        }
    },
    buyingProduct: {
        product: {
            detail: "/admin/member/buyer/product/details"
        },
        inquiredProduct: {
            index: "/admin/member/buyer/inquired-product",
            detail: "/admin/member/buyer/inquired-product/details",
        }
    },
    // sellingComponent: {
    //     stocks : {
    //         approved: "/admin/member/sellcomponents/component",
    //         pending: "/admin/member/sellcomponents/component/pending",
    //         rejected: "/admin/member/sellcomponents/component/rejected",
    //         insert: "/admin/member/sellcomponents/component/add",
    //         bulkInsert: "/admin/member/sellcomponents/component/bulkInsert",
    //         detail: "/admin/member/sellcomponents/component/view/",
    //         edit: "/admin/member/sellcomponents/component/edit/",
    //     },
    //     incomingInquiries: {
    //         index: "/admin/member/sellcomponents/incominginquiry",
    //         detail: "/admin/member/sellcomponents/incominginquiry/detail/"
    //     }
        
    // },
    // buyingComponent: {
    //     inquiryList: {
    //         index: "/admin/member/buycomponents/inquirylist",
    //         detail: "/admin/member/buycomponents/inquirylist/details/"
    //     },
    //     inquiredComponents: {
    //         index: "/admin/member/buycomponents/inquiredcomponents",
    //         detail: "/admin/member/buycomponents/inquiredcomponents/detail/",
    //     }
    // },

    management: {
        myCompany: {
            details: "/admin/member/company/my-company",
            update: "/admin/member/company/my-company/edit",
            additionalDocument: "/admin/member/company/my-company/additional-docs"
        },
        contributors: {
            index: "/admin/member/settings/users",
            insert: "/admin/member/settings/users/add",
            edit: "/admin/member/settings/users/edit"
        }
    },
}