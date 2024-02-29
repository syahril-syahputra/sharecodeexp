import classNames from '@/utils/classNames'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NotificationCard from './NotificationCard'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import SkeletonNotification from './SkeletonNotification'
import { Menu, Transition } from '@headlessui/react'

export default function GlobalNotification() {
  const [isShow, setisShow] = useState(false)
  const session = useSession()
  const [data, setdata] = useState([])
  const [isLoadingFirst, setisLoadingFirst] = useState(false)
  const [isLoadMore, setisLoadMore] = useState(false)
  const notificationRef = useRef(null)
  const [currentPage, setcurrentPage] = useState(0)
  const [lastPage, setlastPage] = useState(0)
  const [notifCount, setnotifCount] = useState(0)
  const [arrayOfNotif, setarrayOfNotif] = useState([])

  const userRole = parseInt(session.data.user.userDetail.role_id)
  const url = userRole === 1 ? 'admin' : 'member'
  const memberstatus = session.data.user.dashboardStatus || ''

  const getCount = async () => {
    try {
      const response = await axios.get(
        `/${url}/global-notifications/count/?` +
          '&dashboard_status=' +
          memberstatus,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      setnotifCount(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  const readAllHandler = async (event) => {
    setisLoadingFirst(true)

    const body = arrayOfNotif.reduce(function (result, value, index) {
      var propertyName = 'array_of_notification_id' + '[' + index + ']'
      result[propertyName] = value
      return result
    }, {})
    try {
      await axios.patch(
        `/${url}/global-notifications/mark-all-as-read`,
        {
          array_of_notification_id: arrayOfNotif,
        },
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      getData(1)
    } catch (error) {
      toast.error('Something went wrong. Cannot load order.', toastOptions)
      setisLoadingFirst(false)
    }
  }
  const getData = async (page) => {
    if (page === 1) {
      setarrayOfNotif([])
      setisLoadingFirst(true)
    } else {
      setisLoadMore(true)
    }
    try {
      const response = await axios.get(
        `/${url}/global-notifications?page=` +
          page +
          '&dashboard_status=' +
          memberstatus.toUpperCase(),
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      if (page === 1) {
        setdata(response.data.data.notifications.data)
        setarrayOfNotif([...response.data.data.array_of_notification_id])
      } else {
        setdata([...data, ...response.data.data.notifications.data])

        setarrayOfNotif([
          ...arrayOfNotif,
          ...response.data.data.array_of_notification_id,
        ])
      }

      setlastPage(response.data.data.notifications.last_page)
    } catch (error) {
      console.log(error)
    } finally {
      getCount()
      setisLoadingFirst(false)
      setisLoadMore(false)
      setcurrentPage(page)
    }
  }
  useEffect(() => {
    getCount()
    if (isShow) {
      getData(1)
    }
  }, [isShow])
  useEffect(() => {
    const handleScroll = () => {
      const element = notificationRef.current

      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        // Scroll berada di paling bawah

        if (!isLoadMore && currentPage < lastPage) {
          getData(currentPage + 1)
        }
      }
    }

    const element = notificationRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [notificationRef.current, isLoadMore, currentPage, lastPage, getData])

  return (
    <Menu as="div" className="md:relative">
      <div>{}</div>
      <Menu.Button
        className="-m-1.5 flex items-center p-1.5"
        onClick={() => setisShow(!isShow)}
      >
        <div className="relative">
          {notifCount > 0 && (
            <div className=" absolute left-5  top-0 bg-red-500 rounded-md text-sm px-1 z-10 text-white -mr-10">
              {notifCount}
            </div>
          )}
          <FontAwesomeIcon
            icon={faBell}
            className={classNames(
              ' w-8 h-8 cursor-pointer  rounded-full rotate-45  active:text-gray-700 bg-white text-gray-500  p-1'
            )}
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        show={isShow}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          ref={notificationRef}
          className="absolute bg-red-290 bg-white shadow-xl  border border-gray-200  overflow-x-hidden p-4  space-y-4 left-0 md:left-auto right-0 top-16 md:top-12  md:w-[400px] max-h-[50%] md:max-h-[1000px] overflow-y-scroll "
        >
          <h1 className="flex items-center justify-between font-bold text-xl text-gray-500 border-b border-gray-300 pb-2">
            <span>Notification</span>
            {!isLoadingFirst && (
              <a
                onClick={readAllHandler}
                className="text-blue-500 text-sm cursor-pointer hover:text-blue-300"
              >
                Mark all as read
              </a>
            )}
          </h1>
          {isLoadingFirst ? (
            <>
              <SkeletonNotification />
              <SkeletonNotification />
            </>
          ) : (
            data.map((item, index) => (
              <NotificationCard
                id={item.id}
                slug={item.category_item_slug}
                name={item.name}
                desc={item.description}
                date={item.created_at}
                key={index}
                readed={item.is_read}
                category={item.category}
                blinked={item.is_action_required}
                notifCount={[notifCount, setnotifCount]}
                show={[isShow, setisShow]}
              />
            ))
          )}
          {isLoadMore && (
            <>
              <SkeletonNotification />
              <SkeletonNotification />
            </>
          )}
        </div>
      </Transition>
    </Menu>
  )
}
