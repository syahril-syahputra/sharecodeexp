import React from 'react'
import DateTimeDisplay from '../DateTimeDisplay'
import { useCountdown } from '@/hooks/useCountdown'

const ExpiredNotice = ({ setDialogState }) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('end_date')?.length > 0) {
      localStorage.removeItem('end_date')
      setDialogState(false)
    }
  }
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
        <span>{`${minutes} Minutes: ${seconds} seconds`}</span>
      </a>
    </span>
  )
}

const CountdownTimer = ({ targetDate, setDialogState }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice setDialogState={setDialogState} />
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

export { CountdownTimer }
