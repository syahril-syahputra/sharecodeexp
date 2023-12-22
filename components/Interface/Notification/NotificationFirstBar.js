import React from 'react'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'

export default function NotificationFirstBar({
  primary,
  warning,
  danger,
  statusId,
  detail,
}) {
  if (primary.includes(parseInt(statusId))) {
    return <PrimaryNotification detail={detail} />
  }
  if (warning.includes(parseInt(statusId))) {
    return <WarningNotification detail={detail} />
  }
  if (danger.includes(parseInt(statusId))) {
    return <DangerNotification detail={detail} />
  }
  return <PrimaryNotification detail={detail} />
}
