import axios from 'lib/axios'
import { getSession } from 'next-auth/react'

export default function Dashboard({ session }) {}

async function fetchUser(context, accessToken) {
  try {
    const data = await axios.get(`/my-account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const result = await fetchUser(context, session.accessToken)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {
        message: 'Your session has expired.',
      },
    }
  }

  // redirection member or superadmin
  let nextDestination = '/admin/member'

  if (result?.data?.data?.email_verified_at === null) {
    nextDestination = '/verify/email'
  }

  if (session.user.userDetail.role_id == 1) {
    nextDestination = '/admin/superadmin'
  }

  return {
    redirect: {
      permanent: false,
      destination: nextDestination,
    },
    props: {
      session: session,
    },
  }
}
