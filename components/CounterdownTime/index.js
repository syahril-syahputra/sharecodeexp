import React from 'react'
import DateTimeDisplay from '../DateTimeDisplay'
import { useCountdown } from '@/hooks/useCountdown'

const ExpiredNotice = () => {
  return (
    <span>
      <span>Expired!!!</span>
    </span>
  )
}

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <span className="show-counter">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </a>
    </span>
  )
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }
}

export { ShowCounter, ExpiredNotice }
