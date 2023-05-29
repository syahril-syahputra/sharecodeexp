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
    const onSubmit = (e) => {
        e.preventDefault()
        props.searchItem(search)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="relative flex">
                    <TextInput
                        placeholder="Find here..."
                        onChange={(input) => setSearch(input.value)}  
                    />
                    <SecondaryButton
                        type="submit"                  
                    >
                        Search
                    </SecondaryButton>            
                </div>
            </form>
        </>
    )
}