import React from 'react'
import NotificationFirstBar from './NotificationFirstBar'
import NotificationSecondBar from './NotificationSecondBar'

function NotificationBarSeller({ data }) {
  const primary = [
    1, 2, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25,
    26, 27, 28,
  ]
  const warning = [3, 5, 9, 16, 23]
  const danger = [29]

  const secondNotification = [
    { id: 3, field: 'inquiry_rejection_reason_other' },
    { id: 5, field: 'quotation_rejection_reason' },
    { id: 23, field: 'request_update_lab_payment_reason' },
    { id: 29, field: 'order_termination_reason' },
  ]

  return (
    <>
      <NotificationFirstBar
        primary={primary}
        warning={warning}
        danger={danger}
        statusId={data.order_status?.id}
        detail={data.order_status?.seller_notification?.message}
      />
      <NotificationSecondBar data={data} notification={secondNotification} />
    </>
  )
}

export default NotificationBarSeller
