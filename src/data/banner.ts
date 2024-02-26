import type { BannerType } from '../typings/business'

export type BannerDataType = {
	title: string
	description: string
	actionTitle?: string
	type: BannerType
}

export const BANNER_DATA = (description?: string, action?: string) => {
	return {
		REGISTER: {
			title: 'Register now to set up OrdrFinance.',
			description:
				'Please complete your profile to set up your account for financing.',
			actionTitle: 'Register for Financing',
			type: 'REGISTER_FOR_FINANCING'
		},
		APPROVED: {
			title: 'Your signatures are required on the financing contract.',
			description:
				'Please review and sign the contract to finalize the terms of future financing.',
			actionTitle: action || 'Review and sign contract',
			type: 'REVIEW_SIGN_CONTRACT'
		},
		/*APPLY_FINANCING: {
			title: 'You have successfully register with OrdrFinance.',
			description: 'Apply for financing',
			actionTitle: 'Apply for Financing',
			type: 'APPLY_FINANCING'
		},*/
		PENDING: {
			title: "Your submitted business information is currently being verified. We'll get back to you shortly.",
			description:
				'You will be notified via email about your profile status.'
		},
		REJECTED: {
			title: 'Your business registration application was unsuccessful.',
			description: description || '',
			actionTitle: 'Register Again',
			type: 'REGISTER_AGAIN'
		}
	}
}
