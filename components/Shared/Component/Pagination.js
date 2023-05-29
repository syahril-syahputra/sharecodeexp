import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton"

export default function Pagination(props){
    const metaData = props.metaData
    const links = props.links
    
    const setPaginationLabel = (item, index) => {
        if(item.label === "&laquo; Previous") {
            return (
                <PrimaryButton
                    outline
                    size="sm"
                    className="mr-1"
                    disabled={!metaData.prevPage}
                    onClick={() => props.setPage(metaData.currentPage - 1)}
                    key={index} 
                >
                    <i className={`fas fa-angle-left my-auto mx-1 fa-xl`}></i>
                </PrimaryButton>
            )
        }

        if(item.label === "Next &raquo;") {
                return (
                    <PrimaryButton
                        outline
                        size="sm"
                        className="mr-1"
                        disabled={!metaData.nextPage}
                        onClick={() => props.setPage(metaData.currentPage + 1)}
                        key={index} 
                    >
                        <i className={`fas fa-angle-right my-auto mx-1 fa-xl`}></i>
                    </PrimaryButton>
                )
            }

        return(
            <PrimaryButton
                outline={!item.active}
                size="sm"
                className="mr-1"
                onClick={() => props.setPage(item.label)}
                key={index} 
                >
                {item.label}
            </PrimaryButton>
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