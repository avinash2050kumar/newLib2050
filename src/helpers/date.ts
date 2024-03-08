import moment from 'moment'

export const getDateFormat = (date: string) => {
	const daysDifference = moment(date).diff(moment(), 'days')

	const isFuture = daysDifference > 0

	const absoluteDaysDifference = Math.abs(daysDifference)

	return isFuture
		? `${absoluteDaysDifference} days left`
		: `${absoluteDaysDifference} days ago`
}
