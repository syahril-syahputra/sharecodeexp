import { useState } from "react"
import TextInput from "../Interface/Form/TextInput";
import InfoButton from "../Interface/Buttons/InfoButton";
import PrimaryButton from "../Interface/Buttons/PrimaryButton";

export default function MiniSearchBar(props){
    const [search, setSearch] = useState('')
    const handleEnter = (e) => {
        if (e.key === 'Enter' && !!search) {
            props.searchItem(search)
        }
    }
    const onSubmit = () => {
        props.searchItem(search)
    }

    const onReset = () => {
        setSearch('')
        props.searchItem('')
    }

    return (
        <>
            <div className="relative flex">
                <TextInput
                    placeholder="Find here..."
                    value={search}
                    onKeyDown={handleEnter}
                    onChange={(input) => setSearch(input.value)}  
                />
                <PrimaryButton
                    type="button"
                    className="mr-2"
                    onClick={onSubmit}                  
                >
                    Search
                </PrimaryButton>   
                <InfoButton
                    type="button"
                    onClick={onReset}                  
                >
                    <i className="fas fa-refresh"></i>
                </InfoButton>          
            </div>
        </>
    )
}