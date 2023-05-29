export default function ErrorInput({errors}){
    return(
        <ul className="mt-1 max-w-md list-disc list-inside">
            {errors.map((error, index) => 
                <p key={index} className="text-left text-red-500 text-md italic">{ error }</p>
            )}
        </ul>
    )
}