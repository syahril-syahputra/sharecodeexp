import moment from 'moment'

function calculateTimeDifference(time) {
  const time2 = moment()

  const utcMoment = moment.utc(time, 'YYYY-MM-DD HH:mm:ss')
  const localMoment = utcMoment.local()
  const difference = moment.duration(localMoment.diff(time2))

  const minutes = difference.minutes()
  const seconds = difference.seconds()

  const minutesText = minutes === 1 ? 'minute' : 'minutes'
  const secondsText = seconds === 1 ? 'second' : 'seconds'

  return `${minutes} ${minutesText} ${seconds} ${secondsText}`
}

export default calculateTimeDifference
