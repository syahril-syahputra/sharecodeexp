import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
import calculateTimeDifferenceForNotif from '@/lib/calculateTimeDifferenceForNotif'

export default function NotificationCard(props) {
  const session = useSession()
  const date = moment(props.date).local().format('ddd, D MMM YYYY')
  const [isLoading, setisLoading] = useState(false)
  const [isReaded, setisReaded] = useState(props.readed)
  const [notifCount, setnotifCount] = props.notifCount

  const unreadHandler = async (event) => {
    setisLoading(true)

    try {
      await axios.patch(
        `/admin/global-notifications/${props.id}/mark-as-unread`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      setnotifCount(notifCount + 1)
      setisReaded(false)
    } catch (error) {
      //   event.preventDefault()
    } finally {
      setisLoading(false)
    }
  }
  const handleClick = async (event) => {
    if (isReaded) {
      return
    }
    if (isLoading) {
      event.preventDefault()
      return
    }
    setisLoading(true)

    try {
      await axios.patch(
        `/admin/global-notifications/${props.id}/mark-as-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      setnotifCount(notifCount - 1)
      setisReaded(true)
    } catch (error) {
      //   event.preventDefault()
    } finally {
      setisLoading(false)
    }
  }

  const createUrl = () => {
    if (props.category === 'order') {
      return '/admin/superadmin/orders/details/' + props.slug
    }
  }
  return (
    <div
      className={`p-2 space-y-2 text-sm  rounded border-gray-300 ${
        isReaded ? 'border-b bg-transparent' : ' bg-blue-50 border'
      }`}
    >
      <Link href={createUrl()} className="block" passHref>
        <div
          onClick={handleClick}
          className={isLoading ? 'cursor-progress' : 'cursor-pointer'}
        >
          <h className="font-bold">{props.name}</h>
          <div>{props.desc}</div>
        </div>
      </Link>
      <div className="text-sm pt-2 capitalize flex justify-between items-center">
        <span>
          <b>{props.category}</b> .{' '}
          {calculateTimeDifferenceForNotif(props.date)}
        </span>

        <span>
          {isLoading && (
            <i className="px-3 fas fa-hourglass fa-spin text-blue-500 float-right"></i>
          )}
          {isReaded && !isLoading && (
            <a
              onClick={unreadHandler}
              className="text-blue-500 cursor-pointer hover:text-blue-300"
            >
              Mark as unread
            </a>
          )}
        </span>
      </div>
    </div>
  )
}
