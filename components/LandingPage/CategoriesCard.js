import Link from "next/link"
export default function CategoriesCard({label}){
    return (
        <div className="max-w-sm bg-white border border-gray-200 h-20 my-auto">
            <div className="flex flex-col items-center p-5">
                <Link href={`/categories#${label}`}>
                    <h3 className="mb-1 text-md inline text-blueGray-500">{label}</h3>            
                </Link>
            </div>
        </div>
    )
}
