import Image from "next/image"

export default function MemberCard(){
    return (
        <div className="bg-white border border-grey-500 shadow-md px-5 pt-5 pb-4">
            <Image
                src="/img/exepart-black.png"
                alt="Picture of the author"
                height={700}
                width={700}
                className="mx-auto mb-5"
            />
            <p className="text-center text-blueGray-500">EXEpart mmbr</p>
        </div>
    )
}
