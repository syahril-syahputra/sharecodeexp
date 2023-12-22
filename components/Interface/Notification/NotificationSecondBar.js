import React from 'react'
import InfoNotification from './InfoNotification'

export default function NotificationSecondBar({ data, notification }) {
  const finder = notification.find(
    (item) => parseInt(data.order_status?.id) === item.id
  )
  if (finder) {
    return <InfoNotification detail={data[finder.field]} />
  }
  return null
}
