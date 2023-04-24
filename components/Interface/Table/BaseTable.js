export default function BaseTable({header, tableData, isBusy}){
    return (
        <div className="bg-slate-100">
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
                <div className=''>
                    <i className="my-8 fas fa-hourglass fa-spin text-blueGray-500 fa-2xl"></i>
                </div>
            }
        </div>
    )
}