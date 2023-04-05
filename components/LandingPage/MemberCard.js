export default function MemberCard({imageSrc, label}){
    return (
        <div className="max-w-sm bg-white border border-gray-200 shadow-md h-50">
            <div className="flex flex-col items-center p-5">
                <img className="object-contain mb-3 h-24" 
                    src={imageSrc} 
                    alt={label}/>
            </div>
            <div className="h-16">
                <h3 className="mb-1 text-md text-blueGray-500 text-center">{label}</h3>
            </div>
        </div>
    )
}
