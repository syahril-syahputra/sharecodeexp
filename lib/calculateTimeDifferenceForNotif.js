import moment from 'moment'

function calculateTimeDifferenceForNotif(time) {
  const currentTime = moment()
  const utcMoment = moment.utc(time, 'YYYY-MM-DD HH:mm:ss')
  const localMoment = utcMoment.local()
  const duration = moment.duration(currentTime.diff(localMoment))

  const seconds = duration.asSeconds()
  const minutes = duration.asMinutes()
  const hours = duration.asHours()
  const days = duration.asDays()
  const weeks = duration.asWeeks()
  const months = duration.asMonths()
  const years = duration.asYears()

  if (seconds < 60) {
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) === 1 ? '' : 's'
    } ago`
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minute${
      Math.floor(minutes) === 1 ? '' : 's'
    } ago`
  } else if (hours < 24) {
    return `${Math.floor(hours)} hour${Math.floor(hours) === 1 ? '' : 's'} ago`
  } else if (days < 7) {
    return `${Math.floor(days)} day${Math.floor(days) === 1 ? '' : 's'} ago`
  } else if (weeks < 4) {
    return `${Math.floor(weeks)} week${Math.floor(weeks) === 1 ? '' : 's'} ago`
  } else if (months < 12) {
    return `${Math.floor(months)} month${
      Math.floor(months) === 1 ? '' : 's'
    } ago`
  } else {
    return `${Math.floor(years)} year${Math.floor(years) === 1 ? '' : 's'} ago`
  }
}

export default calculateTimeDifferenceForNotif
