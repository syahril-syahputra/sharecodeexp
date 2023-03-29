// import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { SessionProvider, useSession } from 'next-auth/react';

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer/>
      </Layout>
    </SessionProvider>
  )
}
