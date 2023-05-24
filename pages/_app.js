// import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalProvider from '../store/GlobalProvider';

import { SessionProvider, useSession } from 'next-auth/react';
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <main className={roboto.className}>
      <SessionProvider session={pageProps.session}>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer/>
          </Layout>
        </GlobalProvider>
      </SessionProvider>
    </main>
  )
}
