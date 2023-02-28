export default function ErrorInput({error="This field is required"}){
    return(
        <p className="mt-1 text-red-500 text-md italic">{ error }</p>
    )
}