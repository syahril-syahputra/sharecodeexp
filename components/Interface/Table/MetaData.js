export default function MetaData({total, perPage}){
    return (
        <div className="p-2 text-slate-500">
            <span className="font-thin text-sm">Showing {total <= perPage ? total : perPage } data from {total} data</span>
        </div>
    )
}