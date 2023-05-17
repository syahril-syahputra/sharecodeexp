export default function NeedLogin(){
    return (
        <div className="relative p-2 bg-white">
            <div className="text-center pb-10 mt-10">
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
                <p>Unauthenticated</p>
            </h3>
            <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
                <i>Please <Link href="/auth/login" className="text-blueGray-700 underline">login</Link> before accesing this URL</i>
            </h3>
            </div>
        </div> 
    );
}