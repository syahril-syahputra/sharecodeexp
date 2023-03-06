// import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // if (typeof window !== "undefined") {
  //   const {data, status} = useSession()

  //   if(status)

  // }

  // const session = useSession()
  // const [user, setUser] = useState({
  //   accessToken: ''
  // })
  // useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

  // if(typeof window !== "undefined"){
  //   if(!!user){
  //     localStorage.setItem('token', 1)
  //     localStorage.setItem('user', 2)
  //   }
  // }
  // console.log(pageProps)

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
