export function CompanyStatusesIcon({status}){
    return (
        <>
            {status == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
            {status == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
            {status == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}
        </>
    )
}

export function CompanyStatusesText({status}){
    return (
        <>
            {status == "pending" && <i className="text-orange-500">Member Status is Pending</i>}
            {status == "accepted" && <i className="text-blue-700">Member Status is Accepted</i>}
            {status == "rejected" && <i className="text-red-700">Member Status is Rejected</i>}
        </>
    )
}