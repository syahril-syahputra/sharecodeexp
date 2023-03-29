export default function CategoriesCard({label}){
    return (
        <div className="max-w-sm bg-white border border-gray-200 shadow-md">
            <div className="flex flex-col items-center px-1 py-1 text-center">
                <h3 className="mb-1 text-md text-blueGray-500">{label}</h3>
            </div>
        </div>
    )
}
