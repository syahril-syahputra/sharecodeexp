import React from 'react'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import Link from 'next/link'

function NavigationViewButton({ navigationId, disabled }) {
  return (
    <Link href={`/admin/superadmin/orders/details/${navigationId}`}>
      <PrimaryButton size="sm" disabled={disabled}>
        View
      </PrimaryButton>
    </Link>
  )
}

export default NavigationViewButton
