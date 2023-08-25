export default function PrimaryWrapper({children, className}){
    return(
        <div className={`relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg ${className}`}
        >
            {children}
        </div>
    )
}