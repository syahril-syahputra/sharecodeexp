import classNames from '@/utils/classNames'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NotificationCard from './NotificationCard'

export default function GlobalNotification() {
  const [isShow, setisShow] = useState(false)

  const items = Array.from({ length: 100 }, (_, index) => (
    <NotificationCard
      name="Testing"
      desc="Example"
      date="2020"
      key={index}
      category="Testing"
    />
  ))

  return (
    <div className="md:relative">
      <FontAwesomeIcon
        icon={faBell}
        className={classNames(
          ' w-8 h-8 cursor-pointer  rounded-full rotate-45  active:text-gray-700',
          isShow
            ? 'bg-blue-300 text-blue-600  p-1.5'
            : 'bg-white text-gray-500  p-1'
        )}
        onClick={() => setisShow(!isShow)}
      />
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute border border-gray-200 space-y-4 left-0 md:left-auto right-0 p-4 top-16 md:top-10 min-h-[300px] md:w-[500px] max-h-screen mb-16 overflow-y-scroll  bg-white shadow-lg"
          >
            {items}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
