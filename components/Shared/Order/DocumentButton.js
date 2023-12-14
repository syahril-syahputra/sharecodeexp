import React from 'react'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import Link from 'next/link'

export default function DocumentButton(props) {
  const { title, isActive, onClick, href, isLoading } = props

  return (
    <div className="flex  justify-between items-center py-2 odd:bg-gray-50 even:bg-gray-100 px-2">
      <span>{title}</span>
      {href ? (
        isActive ? (
          <Link href={href} target="_blank">
            <PrimaryButton size="sm">VIew</PrimaryButton>
          </Link>
        ) : (
          <PrimaryButton size="sm" disabled={true}>
            VIew
          </PrimaryButton>
        )
      ) : (
        <PrimaryButton
          size="sm"
          onClick={onClick}
          disabled={isLoading || !isActive}
        >
          {isLoading ? 'Loading' : 'VIew'}
        </PrimaryButton>
      )}
    </div>
  )
}
