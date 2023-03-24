import { useState } from "react"

export default function MiniSearchBar(props){
    const [search, setSearch] = useState()
    const handleEnter = (e) => {
        if (e.key === 'Enter' && !!search) {
            props.searchItem(search)
        }
    }
    return (
        <>
            <div className="relative mb-4 flex md:w-1/2 w-full flex-wrap items-stretch mt-4">
                <input
                    type="text"
                    onChange={({target}) => setSearch(target.value)}
                    onKeyDown={handleEnter}
                    className="shadow relative m-0 block w-[1px] min-w-0 placeholder-slate-300 flex-auto border-0 bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition ease-in-out focus:z-[3] focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    placeholder="Search"/>
                <button
                    onClick={() => props.searchItem(search)}
                    className="font-bold relative z-[2] bg-blueGray-700 active:bg-blueGray-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:z-[3] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                >
                    Search
                </button>
            </div>
        </>
    )
}