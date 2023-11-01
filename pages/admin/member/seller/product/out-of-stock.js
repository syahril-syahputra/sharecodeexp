import { getSession } from 'next-auth/react'
import React from 'react'
import Admin from 'layouts/Admin.js'

export default function OutofStock({ session }) {
  return <>This page under development</>
}

OutofStock.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
