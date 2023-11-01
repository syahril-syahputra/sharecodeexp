import { getSession } from 'next-auth/react'
import React from 'react'
import MiniSearchBar from '@/components/Shared/MiniSearchBar'
import Admin from 'layouts/Admin.js'

export default function ReimbursementActive({ session }) {
  return (
    <>
      <div className="mb-10">
        <div className="mb-5 w-full lg:w-1/2">
          {/* <MiniSearchBar searchItem={handleSearch} /> */}
        </div>
        This Page Under Development
      </div>
    </>
  )
}

ReimbursementActive.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
