import { getSession } from 'next-auth/react'

export default function Dashboard({ session }) {
  console.log(session, '<<<session')
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log(session, '<<<<sessionDashboard')
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
  if (session.user.email_verified_at === null) {
    nextDestination = '/verify/email'
  }
  if (session.user.userDetail.role_id == 1) {
    nextDestination = '/admin/superadmin'
  }
  if (session.user?.userDetail?.email_verified_at === null) {
    nextDestination = '/verify/email'
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
