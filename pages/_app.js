// import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
