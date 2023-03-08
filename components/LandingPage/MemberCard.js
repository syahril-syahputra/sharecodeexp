// import Image from "next/image"

// export default function MemberCard(){
//     return (
//         <div className="bg-white border border-grey-500 shadow-md px-5 pt-5 pb-4">
//             <Image
//                 src="/img/exepart-black.png"
//                 alt="Picture of the author"
//                 height={700}
//                 width={700}
//                 className="mx-auto mb-5"
//             />
//             <p className="text-center text-blueGray-500">EXEpart mmbr</p>
//         </div>
//     )
// }


export default function MemberCard({imageSrc, label}){
    return (
        <div className="max-w-sm bg-white border border-gray-200 shadow-md">
            <div className="flex flex-col items-center p-5">
                <img className="object-contain mb-3 h-24" 
                    src={imageSrc} 
                    alt={label}/>
                <h3 className="mb-1 text-md  text-blueGray-500">{label}</h3>
            </div>
        </div>
    )
}
