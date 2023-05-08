export default function PageHeader({leftTop, rightTop}){
    return (
        <div className="px-4 py-3">        
            <div className="flex flex-wrap items-center justify-between">
                {/* top left  */}
                <div className="">
                    {leftTop}
                </div>

                {/* top right */}
                <div className="">
                    {rightTop}
                </div>
            </div>
        </div>
    )
}