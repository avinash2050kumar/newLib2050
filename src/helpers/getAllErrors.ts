import type { IAPIError, IAPIErrorResponse } from '../typings'

export const getAllErrors = (e: IAPIErrorResponse) => {
	const fieldErrors: { [key: string]: string } = {}
	const messageErrors: Pick<IAPIError, 'message'>[] = []

	if (e.errors) {
		e.errors.map(d => {
			if (d.field) {
				fieldErrors[d.field] = d.message
			} else {
				messageErrors.push(d)
			}
		})
	}

	return { messageErrors, fieldErrors }
}
