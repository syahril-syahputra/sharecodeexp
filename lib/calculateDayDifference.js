import moment from 'moment'

function calculateDayDifference(time) {
  const currentTime = moment()

  const utcMoment = moment.utc(time, 'YYYY-MM-DD HH:mm:ss')

  const localMoment = utcMoment.local()
  const dayDifference = currentTime.diff(localMoment, 'days')

  return dayDifference
}

export default calculateDayDifference
