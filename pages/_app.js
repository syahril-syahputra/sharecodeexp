import React from 'react'
import '@/styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import GlobalProvider from '../store/GlobalProvider'
import classNames from '@/utils/classNames'
import { SessionProvider } from 'next-auth/react'
import { Inter, Manrope, Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '---font-in',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mr',
})

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <main
      className={classNames(
        inter.variable,
        manrope.variable,
        roboto.className,
        ' font-mr '
      )}
    >
      <SessionProvider session={pageProps.session}>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </GlobalProvider>
      </SessionProvider>
    </main>
  )
}
