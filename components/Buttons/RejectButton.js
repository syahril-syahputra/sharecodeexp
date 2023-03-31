export default function RejectButton({onClick, isLoading, buttonTitle}){
    return (
        <button
            disabled={isLoading}
            className={`${isLoading ? 'bg-red-300' : 'bg-red-500 active:bg-red-600' }  text-white font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type="button"
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    )
}