export default function OrderStatusStep(){
    return (
        <div className="px-4 py-3 border-0 bg-white">
            <div className="flex justify-center">
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Order Inquired
                </div>
                <div className="mr-1 p-2 bg-blue-500 border text-white text-sm text-center">
                    Information Verified
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Quoted for Approval
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Quote Approve / Rejected
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    PI sent for Payment
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Payment Verified
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Preparing for Shipment
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Order Shiped
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Order Accepted / Rejected
                </div>
                <div className="mr-1 p-2 bg-white border text-sm text-center">
                    Order Complete
                </div>
            </div>
        </div>
    )
}