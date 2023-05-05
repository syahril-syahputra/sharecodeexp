export default function NoData({colSpan, children}){
    return(
        <tr className='text-center my-auto mt-10 text-lg p-5'>
            <td colSpan={colSpan} className="p-5 italic ">
                {children ? children : 'You have no data to show'}
            </td>
        </tr>
    )
}