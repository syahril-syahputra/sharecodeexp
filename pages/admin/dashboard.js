import { getSession } from "next-auth/react";


export default function Dashboard(){}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {
          message: "Your session has expired."
      }
    };
  }

  // redirection member or superadmin
  let nextDestination = "/admin/member"
  if(session.user.userDetail.role_id == 1) {
    nextDestination = "/admin/superadmin"
  }

  return {
    redirect: {
      permanent: false,
      destination: nextDestination,
    },
    props: {
        session: session
    }
  };

}
