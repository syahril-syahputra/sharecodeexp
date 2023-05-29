import LoadingState from "../Loader/LoadingState";

export default function BaseTable({header, tableData, isBusy}){
    return (
        <div className="text-center w-full mx-auto">
            <div className="bg-slate-100 overflow-x-auto">
                <table className='w-full text-sm text-left text-gray-500 shadow-md'>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    {!isBusy && 
                        <tbody className="text-xs text-gray-700 bg-white">
                            {tableData}
                        </tbody>
                    }
                    
                </table>
                {isBusy &&
                    <LoadingState/>
                }
            </div>
        </div>
    )
}