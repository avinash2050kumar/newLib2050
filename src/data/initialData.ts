import type { IBusiness } from '../typings/business'
import { filterArrays, objectOmit, objectPick } from '../helpers'

export const CBFS_INITIAL_DATA = {
	contactNumber: '',
	businessRole: '',
	business: '',
	fullName: '',
	email: '',
	businessName: '',
	businessType: 'partnership',
	businessAddress: '',
	ntn: '',
	partnerCnic: [],
	partnershipDeed: [],
	incorporationCertificate: [],
	authorityLetter: []
}

export const BusinessType = {
	partnership: {
		partnerCnic: [],
		partnershipDeed: [],
		incorporationCertificate: [],
		authorityLetter: []
	},
	company: {
		directorsResolution: [],
		memorandumArticlesAssociation: [],
		boardMemberCnic: [],
		pocCnic: [],
		beneficialOwnerCnic: []
	},
	soleProprietorship: {
		cnicFront: [],
		cnicBack: [],
		proprietorshipDeclaration: [],
		ntnCertificate: [],
		bankStatement: []
	}
}

export const BUSINESS_TYPE = [
	{
		name: 'Partnership',
		value: 'partnership'
	},
	{
		name: 'Company',
		value: 'company'
	},
	{
		name: 'Sole Proprietorship',
		value: 'soleProprietorship'
	}
]

export const TRANSACTION_METHOD = [
	{ value: 'bank_transfer', label: 'Bank Transfer' },
	{ value: 'cash_via_fso', label: 'Cash Via Fso' },
	{ value: 'one_bill', label: 'One Bill' },
	{ value: 'online_cash_deposit', label: 'Online Cash Deposit' },
	{ value: 'clearing_cheque_deposit', label: 'Clearing Cheque Deposit' }
]

export const getRegistrationFormInitialData = (data: IBusiness) => {
	return {
		...data.user.personalDetails,
		email: data.user.email,
		contactNumber: data.kyb.contactNumber.replace('+92', ''),
		...objectPick(data.kyb, 'businessAddress', 'ntn'),
		...objectOmit(filterArrays(data.kyb), 'statuses', 'facilities')
	}
}

export const CREATE_LOAN = {
	invoice_data: [
		{
			name: 'Avinash',
			size: 4090,
			resourceURL: 'https://www.pic2map.com/photos/thumbs/aitnms.jpg'
		}
	],
	required_financing: 0,
	tenure: 0
}

export type PERDICTION = {
	amountPending: number
	amountRepaid: number
	lateFeesPending: number
	lateFeesRepaid: number
	markupPending: number
	markupRepaid: number
	statementTransactions: any[]
}
