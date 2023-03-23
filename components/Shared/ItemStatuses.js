// export default function ItemStatuses(props){
//     let value = props.status
//     let title = ''
//     switch(value) {
//         case "1":
//             title = "pending"
//             break;
//         case "2":
//             title = "accepted"
//             break;
//         case "3":
//             title = "rejected"
//             break;
//     }
//     return (
//         <>
//             {props.status == "1" && 
//                 <>
//                     <i title={title} className="mr-2 ml-1 fas fa-clock text-orange-500"></i> 
//                 </>
//             }
//             {props.status == "2" && 
//                 <>
//                     <i title={title} className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>
//                 </>
//             }
//             {props.status == "3" && 
//                 <>
//                     <i title={title} className="mr-2 ml-1 fas fa-circle-xmark text-red-500"></i>
//                 </>
//             }
//         </>
//     )
// }

export default function ItemStatuses(props){
    let value = props.status
    let title = props.status
    return (
        <>
            {props.status == "pending" && 
                <>
                    <i title={title} className="mr-2 ml-1 fas fa-clock text-orange-500"></i> 
                </>
            }
            {(props.status == "accepted" || props.status == "approved") && 
                <>
                    <i title={title} className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>
                </>
            }
            {props.status == "rejected" && 
                <>
                    <i title={title} className="mr-2 ml-1 fas fa-circle-xmark text-red-500"></i>
                </>
            }
        </>
    )
}