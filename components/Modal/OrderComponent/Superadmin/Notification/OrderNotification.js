import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'

export default function OrderNotification(props) {
  switch (props.order_status?.slug) {
    case ('inquiry-sent', 'inquiry-verified'):
      return (
        <PrimaryNotification
          message={props.order_status?.name}
          detail={props.order_status?.admin_notification?.message}
        ></PrimaryNotification>
      )
    case 'request-payment-update':
      return (
        <>
          <WarningNotification
            message={props.order_status?.name}
            detail={props.order_status?.admin_notification?.message}
          ></WarningNotification>
          <InfoNotification
            message={props.order_status?.name}
            detail={props.order_status?.admin_notification?.message}
          ></InfoNotification>
        </>
      )
  }
}
