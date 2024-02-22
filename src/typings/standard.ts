export interface IAPIError {
	message: string
	field?: string
}

export interface IAPIErrorResponse {
	errors: IAPIError[]
}
