export default function AcceptButton({onClick, isLoading, buttonTitle, buttonType}){
    return (
        <button
            disabled={isLoading}
            className={`${isLoading ? 'bg-indigo-300' : 'bg-indigo-900 active:bg-indigo-700' }  text-white font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type={buttonType}
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    )
}