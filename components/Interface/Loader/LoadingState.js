export default function LoadingState({className}) {
    return (
        <div className={`text-center ${className}`}>
            <i className="my-8 fas fa-hourglass fa-spin text-blueGray-500 fa-2xl"></i>
        </div>
    )
}