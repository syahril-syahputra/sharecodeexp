import Image from "next/image"

export default function ImageLogo({size=100, color="black"}){
    return (
        <Image
            src={`/img/exepart-${color}.png`}
            alt="Exepart-logo"
            height={size}
            width={size}
            className="mx-auto"
        />
    )
}

