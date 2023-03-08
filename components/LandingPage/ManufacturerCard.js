export default function ManufacturerCard({imageSrc, label}){
    return (
        <div className="max-w-sm bg-white border border-gray-200 shadow-md">
            <div className="flex flex-col items-center p-5">
                <img className="object-contain mb-3 h-60" 
                    src={imageSrc} 
                    alt={label}/>
                <h3 className="mb-1 text-xl font-medium text-blueGray-500">{label}</h3>
            </div>
        </div>
    )
}
