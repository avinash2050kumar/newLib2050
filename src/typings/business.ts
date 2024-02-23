import type { IKyb } from './kyb'
import type { ISMEUser } from './user'

export type IBusiness = {
	kyb: IKyb & { _id: string }
	user: ISMEUser & { _id: string }
}

export type BannerType =
	| 'REGISTER_FOR_FINANCING'
	| 'REVIEW_SIGN_CONTRACT'
	| 'REGISTER_AGAIN'
	| 'APPLY_FINANCING'
