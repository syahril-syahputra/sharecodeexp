import React, { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function restrictedMember() {
  const { update } = useSession()
  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()

  const updateStatusnull = async () => {
    setisLoading(true)
    await update({
      dashboardStatus: 'delete',
    })
    router.push('/admin/member')
  }

  return (
    <div className="relative p-2 bg-white">
      <div className="text-center pb-10 mt-10">
        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
          <p>Restricted Member</p>
        </h3>
        <h3 className="text-md font-semibold leading-normal text-blue-700  mb-2">
          {isLoading ? (
            <span>
              <i className="px-3 fas fa-hourglass fa-spin"></i> please wait
            </span>
          ) : (
            <span
              onClick={updateStatusnull}
              className="cursor-pointer hover:text-blue-300"
            >
              Please Back To Admin Dashboard
            </span>
          )}
        </h3>
      </div>
    </div>
  )
}
