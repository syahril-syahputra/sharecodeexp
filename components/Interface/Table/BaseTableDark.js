import LoadingState from '../Loader/LoadingState'

export default function BaseTableDark({ header, tableData, isBusy }) {
  return (
    <div className="text-center w-full mx-auto">
      <div className="bg-slate-100 overflow-x-auto">
        <table className="w-full text-sm text-left border-black text-gray-500 shadow-md rounded-3xl overflow-hidden">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>{header}</tr>
            <tr>
              <td colSpan={10} className="bg-white rounded-t-3xl">
                -
              </td>
            </tr>
          </thead>
          {!isBusy && (
            <tbody className="text-xs text-gray-700 bg-white">
              {tableData}
            </tbody>
          )}
        </table>
        {isBusy && <LoadingState />}
      </div>
    </div>
  )
}
