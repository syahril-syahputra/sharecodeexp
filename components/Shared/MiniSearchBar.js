import { useState } from "react"
import SecondaryButton from "../Interface/Buttons/SecondaryButton";
import TextInput from "../Interface/Form/TextInput";

export default function MiniSearchBar(props){
    const [search, setSearch] = useState()
    const handleEnter = (e) => {
        if (e.key === 'Enter' && !!search) {
            props.searchItem(search)
        }
    }
    return (
        <>
            <div className="relative flex">
                <TextInput
                    placeholder="Find here..."
                    onKeyDown={handleEnter}
                    onChange={(input) => setSearch(input.value)}  
                />
                <SecondaryButton
                    onClick={() => props.searchItem(search)}                  
                >
                    Search
                </SecondaryButton>            
            </div>
        </>
    )
}