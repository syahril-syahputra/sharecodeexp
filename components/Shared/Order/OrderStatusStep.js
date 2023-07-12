import { useEffect, useState } from "react"
import ModalOrderStatusList from "./ModalOrderStatusList";


const calculateProgressWidth = (numberOfProgress) =>{
    let progressWidth = 0;
    if (numberOfProgress == null) {
        return {percentage: 0, progressWidth: 0};
    }
    switch(numberOfProgress) {
        case 1: 
            progressWidth = 1
            break;
        case 2: 
            progressWidth = 2
            break;
        case 3: 
            progressWidth = 3
            break;
        case 4: 
        case 5: 
            progressWidth = 4
            break;
        case 6: 
            progressWidth = 5
            break;
        case 7: 
            progressWidth = 6
            break;
        case 8: 
        case 15: 
            progressWidth = 7
            break;
        case 9: 
            progressWidth = 8
            break;
        case 10: 
            progressWidth = 9
            break;
        case 11: 
        case 12: 
            progressWidth = 10
            break;
        case 13:
        case 14:  
            progressWidth = 11
            break;
        default:
            break;
    }
    return {percentage: (progressWidth * 9.09), progressWidth};
}

export default function OrderStatusStep(props){
    const statusProgress = calculateProgressWidth(props.orderStatus?.id);
    const [showStatuses, setShowStatuses] = useState()

    return (
        <>
            <div className="px-4 py-3 border-0 bg-white">
                <div className="flex justify-center">            
                    <div className="relative h-2 bg-gray-200 rounded-full w-full mt-5 mb-5 flex justify-between">
                        <div className="rounded-full h-4 w-4"></div>
                        {Array(11).fill(0).map((_, i) => {
                            if(i+1 <= statusProgress.progressWidth) {
                                return <div key={i} className="bg-blue-700 -mt-1 rounded-full h-4 w-4"></div>   
                            } else {
                                return <div key={i} className="bg-gray-200 -mt-1 rounded-full h-4 w-4"></div>   
                            }
                        })}
                        <div className="absolute top-0 left-0 h-full bg-blue-700 rounded-full" style={{'width' : `${statusProgress.percentage}%`}}></div>                        
                    </div>
                </div>
                <div className="text-center mt-1">
                    <span onClick={() => setShowStatuses(true)} className="text-sm text-slate-500 text-center italic underline cursor-pointer">Click for Status Detail</span>
                </div>
            </div>
            {showStatuses && 
                <>
                    <ModalOrderStatusList closeModal={() => setShowStatuses(false)}/>
                </>
            }
        </>
    )
}