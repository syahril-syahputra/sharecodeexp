export default function ItemStatuses(props){
    return (
        <>
            {props.status == "pending" && 
                <>
                    <i title={props.title} className="mr-2 ml-1 fas fa-clock text-orange-500"></i> 
                </>
            }
            {props.status == "accepted" && 
                <>
                    <i title={props.title} className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>
                </>
            }
            {props.status == "rejected" && 
                <>
                    <i title={props.title} className="mr-2 ml-1 fas fa-circle-xmark text-red-500"></i>
                </>
            }
        </>
    )
}