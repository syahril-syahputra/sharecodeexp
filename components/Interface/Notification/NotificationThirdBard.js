import React from 'react'
import InfoNotification from './InfoNotification'

export default function NotificationThirdBard({ data }) {
  if (
    data.additional_order_notification &&
    parseInt(data.is_active) === 1 &&
    data.admin_receipt_path
  ) {
    return (
      <InfoNotification
        detail={data.additional_order_notification.payment_released_to_seller}
      />
    )
  }
  return null
}
