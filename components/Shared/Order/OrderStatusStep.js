export default function OrderStatusStep(props){
    return (
        <div className="px-4 py-3 border-0 bg-white">
            <div className="flex justify-center">
                <div className={`${props.orderStatus?.id == 1? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Inquired
                </div>
                <div className={`${props.orderStatus?.id == 2? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Verified
                </div>
                <div className={`${props.orderStatus?.id == 3? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Quotation Approval
                </div>
                <div className={`${props.orderStatus?.id == 4? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Quotation Rejected
                </div>
                <div className={`${props.orderStatus?.id == 5? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Quotation Approved
                </div>                
                <div className={`${props.orderStatus?.id == 6? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Proforma Invoice Send
                </div>
                <div className={`${props.orderStatus?.id == 7? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Payment Verification
                </div>
                <div className={`${props.orderStatus?.id == 15? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Payment Incorrect
                </div>
                <div className={`${props.orderStatus?.id == 8? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Payment Completed
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <div className={`${props.orderStatus?.id == 9? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Preparing Shipment
                </div>
                <div className={`${props.orderStatus?.id == 10? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Order Shiped
                </div>
                <div className={`${props.orderStatus?.id == 11? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Order Returned
                </div>
                <div className={`${props.orderStatus?.id == 12? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Order Accepted
                </div>
                <div className={`${props.orderStatus?.id == 13? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Order Completed
                </div>
                <div className={`${props.orderStatus?.id == 14? 'bg-blue-500 text-white' : 'bg-white'} mr-1 p-2  border text-sm text-center`}>
                    Order Cancelled
                </div>
            </div>
        </div>
    )
}