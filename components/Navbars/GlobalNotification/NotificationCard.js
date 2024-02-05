import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
import calculateTimeDifferenceForNotif from '@/lib/calculateTimeDifferenceForNotif'
import Blinking from './Blinking'

export default function NotificationCard(props) {
  const session = useSession()
  const date = moment(props.date).local().format('ddd, D MMM YYYY')
  const [isLoading, setisLoading] = useState(false)
  const [isReaded, setisReaded] = useState(props.readed)
  const [notifCount, setnotifCount] = props.notifCount

  const [isShow, setisShow] = props.show
  const userRole = parseInt(session.data.user.userDetail.role_id)
  const url = userRole === 1 ? 'admin' : 'member'
  const unreadHandler = async (event) => {
    setisLoading(true)

    try {
      const response = await axios.patch(
        `/${url}/global-notifications/${props.id}/mark-as-unread`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      setnotifCount(response.data.data.counter)
      setisReaded(false)
    } catch (error) {
      //   event.preventDefault()
    } finally {
      setisLoading(false)
    }
  }
  const handleClick = async (event) => {
    if (isReaded) {
      setisShow(false)
      return
    }
    if (isLoading) {
      event.preventDefault()
      return
    }
    setisLoading(true)

    try {
      const response = await axios.patch(
        `/${url}/global-notifications/${props.id}/mark-as-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      setnotifCount(response.data.data.counter)
      setisReaded(true)
      setisShow(false)
    } catch (error) {
      //   event.preventDefault()
    } finally {
      setisLoading(false)
    }
  }

  const createUrl = () => {
    return userRole === 1 ? createUrlAdmin() : createUrlMember()
  }
  const createUrlMember = () => {
    const memberstatus = session.data.user.dashboardStatus || ''
    if (props.category === 'order') {
      const orderUrl =
        memberstatus === 'buyer' ? 'inquired-product' : 'incoming-inquiry'
      return `/admin/member/${memberstatus}/${orderUrl}/details/` + props.slug
    }
    if (props.category === 'registry') {
      return '/admin/member/company/my-company'
    }
    if (props.category === 'product') {
      return `/admin/member/${memberstatus}/product/details/` + props.slug
    }
    if (props.category === 'excel') {
      return `/admin/member/${memberstatus}/product/uploaded/` + props.slug
    }

    return '/'
  }
  const createUrlAdmin = () => {
    if (props.category === 'order') {
      return '/admin/superadmin/orders/details/' + props.slug
    }
    if (props.category === 'registry') {
      return '/admin/superadmin/registry/details/' + props.slug
    }
    if (props.category === 'product') {
      return '/admin/superadmin/product/details/' + props.slug
    }
    if (props.category === 'excel') {
      return '/admin/superadmin/product/excel/' + props.slug
    }

    return '/'
  }
  return (
    <div
      className={`p-2 space-y-2 text-sm  rounded border-gray-300 ${
        isReaded ? 'border-b bg-transparent' : ' bg-blue-50 border'
      }`}
    >
      <Link href={createUrl()} className="block" passHref shallow>
        <div
          onClick={handleClick}
          className={isLoading ? 'cursor-progress' : 'cursor-pointer'}
        >
          <div className="font-bold flex space-x-2 items-start">
            <span className="flex-1">{props.name}</span>
            {props.blinked && <Blinking />}
          </div>
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
