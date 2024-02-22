

export type AwsResponsePropS = {
	signedRequest: string
	url: string
	uniqueFileName: string
	expiresIn: {
		amount: number
		unit: string
	}
}
