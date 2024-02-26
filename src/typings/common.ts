export interface IFile {
	name: string
	resourceURL: string
	size: number
	verified?: boolean
}

export type ContractStatus =
	| 'contract_valid'
	| 'contract_expired'
	| 'contract_pending'

export type CustomerStatus = 'in_progress' | 'approved' | 'rejected' | 'pending'

export interface Status {
	status: string
	timestamp: string
	updated_by: string // user_id of LMS personnel
	reason?: string
	comment?: string
}

export interface IFacility {
	id: string
	envelope_id: string
	envelope_url: string
	credit_limit?: number
	markup?: number
	contract_documents: string[]
	contract_details: any
	signing_date: string
	expiry_date: string
	status: ContractStatus
	status_history: Status[]
}

export interface IPartnerSnapshot {
	name: string
	id: string
	loan_id?: string
}

export interface ICreditBureauReport extends Record<string, unknown> {
	_id: string
	keys: string[]
}

export type PaymentMethod = 'cash' | 'card' | 'cheque' | 'online'

export type TransactionType =
	| 'disbursement'
	| 'repayment'
	| 'late_fee'
	| 'markup'

export type TransferType =
	| 'bank_transfer'
	| 'cash_via_fso'
	| 'one_bill'
	| 'online_cash_deposit'
	| 'clearing_cheque_deposit'

export type RepaymentType = {
	user_id: string
	amount: string
	type: TransactionType
	method: TransferType
	payment_date: string
	transaction_image?: string
	maxPayment?: string | number
}
