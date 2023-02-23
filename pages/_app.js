// import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
