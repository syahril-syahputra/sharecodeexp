export default function Pagination(props){
    const metaData = props.metaData
    const links = props.links
    
    const setPaginationLabel = (item, index) => {
        if(item.label === "&laquo; Previous") {
            return (
                <button 
                    disabled={!metaData.prevPage}
                    onClick={() => props.setPage(metaData.currentPage - 1)}
                    key={index} 
                    className={`
                        ${!metaData.prevPage ? 'border border-solid border-blueGray-400' : 'border border-solid border-blueGray-500 text-blueGray-700'}
                        text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
                >
                    <i className={`${!metaData.prevPage ? 'text-blueGray-400' : 'text-blueGray-700'} fas fa-angle-left my-auto mx-10 fa-xl`}></i>
                </button>
            )
        }

        if(item.label === "Next &raquo;") {
                return (
                    <button 
                        disabled={!metaData.nextPage}
                        onClick={() => props.setPage(metaData.currentPage + 1)}
                        key={index} 
                        className={`
                            ${!metaData.nextPage ? 'border border-solid border-blueGray-400' : 'border border-solid border-blueGray-500 text-blueGray-700'}
                            text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
                    >
                        <i className={`${!metaData.nextPage ? 'text-blueGray-400' : 'text-blueGray-700'} fas fa-angle-right my-auto mx-10 fa-xl`}></i>
                    </button>
                )
            }

        return(
            <button 
                onClick={() => props.setPage(item.label)}
                key={index} 
                className={`${item.active ? 'bg-blueGray-700 text-white' : 'border border-solid border-blueGray-500 text-blueGray-700'} text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
            >
                {item.label}
            </button>
        )
    }

    return (
        <div className="flex mt-10 mx-auto justify-center">
            {links.map((item, index) => {
                return setPaginationLabel(item, index)
            })}
        </div>
    )
}