import React from 'react'
import Image from 'next/image'

export default function ImageLogo({
  size = 100,
  color = 'gradient',
  className,
}) {
  return (
    <Image
      src={`/exepart.svg`}
      alt="Exepart-logo"
      height={size}
      width={size}
      className={`${className ? className : 'mx-auto'}`}
    />
  )
}
