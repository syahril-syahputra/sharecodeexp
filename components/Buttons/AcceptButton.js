export default function AcceptButton({onClick, isLoading, buttonTitle}){
    return (
        <button
            disabled={isLoading}
            className={`${isLoading ? 'bg-blue-300' : 'bg-blue-500 active:bg-blue-600' }  text-white font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type="button"
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    )
}