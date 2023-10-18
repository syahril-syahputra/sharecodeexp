import React, { Fragment, useEffect, useState } from 'react'
import axios from 'lib/axios'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from '@/components/Footers/Footer'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import Link from 'next/link'
import { AdminUrl } from '@/route/route-url'
import LightButton from '@/components/Interface/Buttons/LightButton'
import { Router } from 'next/router'
import { getSession } from 'next-auth/react'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import LogoutModal from '@/components/Modal/Logout/Logout'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
// import CountdownTimer from '@/components/CounterdownTime'
import { ShowCounter, ExpiredNotice } from '@/components/CounterdownTime'
import { useCountdown } from '@/hooks/useCountdown'
import Countdown from 'react-countdown'

export default function DetailProduct({ session }) {
  const [logoutModal, setLogoutModal] = useState(false)
  const [resendModal, setResendModal] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  const [isSucces, setIsSucces] = useState(false)
  const [counter, setCounter] = useState(0)
  const [timerObject, setTimerObj] = useState({})
  const NOW_IN_MS = new Date().getTime()
  const [data, setData] = useState(
    { date: new Date().getTime(), delay: 60000, is_completed: false } //10 seconds
  )
  console.log(data, '<<<data')
  const wantedDelay = 60000
  useEffect(() => {
    const item_value = JSON.parse(sessionStorage.getItem('timer'))
    setCounter(item_value)
    setTimerObj({
      minutes: item_value?.minutes,
      seconds: item_value?.seconds,
    })
  }, [isSucces])
  const minutes = parseInt(counter?.minutes || 0)
  const seconds = parseInt(counter?.seconds || 0)
  const THREE_DAYS_IN_MS = 1 * 1 * minutes * seconds * 1000
  const dateTimeAfterThreeDays = THREE_DAYS_IN_MS + NOW_IN_MS

  // const getLocalStorageValue = (s) => localStorage.getItem(s)
  // const savedDate = getLocalStorageValue('end_date')
  // useEffect(() => {
  //   const savedDate = getLocalStorageValue('end_date')
  //   console.log(savedDate, '<<<savedDate')
  //   if (savedDate != null && !isNaN(savedDate)) {
  //     const currentTime = Date.now()
  //     const delta = parseInt(savedDate, 10) - currentTime
  //     console.log(delta, parseInt(savedDate, 10), '<<<delta')
  //     if (delta > wantedDelay) {
  //       console.log(delta, '<<delt')
  //       if (localStorage.getItem('end_date').length > 0)
  //         localStorage.removeItem('end_date')
  //     }
  //   } else {
  //     setData({ date: currentTime, delay: delta })
  //   }
  // }, [])

  useEffect(() => {}, [])

  const Completionist = () => <span>You are good to go!</span>

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }

  const CounterDataFunc = () => {
    return (
      <Countdown
        date={data.date + data.delay}
        renderer={renderer}
        onComplete={() => {
          // if (localStorage.getItem('end_date') != null) {
          //   localStorage.removeItem('end_date')
          //   setData({ ...data, is_completed: true })
          // }
        }}
      />
    )
  }

  const handleResendEmail = async () => {
    await axios
      .post(
        `/email/resend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response?.data?.message}`, toastOptions)
        setIsSucces(true)
        setDialogState(true)
        setResendModal(false)
        // localStorage.setItem('end_date', JSON.stringify(data.date + data.delay))
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        setIsSucces(false)
        setResendModal(false)
      })
  }

  return (
    <Fragment>
      <PageSEO title={siteMetadata?.title} />
      <IndexNavbar fixed />
      <section className="relative py-14 overflow-hidden h-3/6 ">
        <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
          {dialogState ? (
            <PrimaryNotification
              message={'Email notification has been resend successfully'}
              // timer={CounterDataFunc()}
            />
          ) : null}
          <PrimaryWrapper className={'mt-6'}>
            {
              <div className="text-center pb-20 pt-20">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                  <ImageLogo size={250} />
                </div>
                <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                  Your email verification has been sent,
                  <br />
                  please verify the email.
                </h3>
                <div className="mt-20">
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    disabled={dialogState}
                    onClick={() => setResendModal(true)}
                  >
                    Resend
                  </PrimaryButton>
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    onClick={() => setLogoutModal(true)}
                  >
                    Logout
                  </PrimaryButton>
                </div>
              </div>
            }
          </PrimaryWrapper>
        </div>
      </section>
      <Footer />
      {logoutModal && (
        <LogoutModal
          closeModal={() => setLogoutModal(false)}
          acceptance={() => {
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }}
        />
      )}
      {resendModal ? (
        <ResendEmailVerification
          closeModal={setResendModal}
          acceptance={handleResendEmail}
        />
      ) : null}
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
