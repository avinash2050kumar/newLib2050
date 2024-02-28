export type TransactionType =
	| 'disbursement'
	| 'repayment'
	| 'late_fee'
	| 'markup'

export type TransactionStatus =
	| 'processing'
	| 'rejected'
	| 'approved'
	| 'paid'
	| 'cancelled'

export type DestinationType = 'bank' | 'cash' | 'ecofin' | 'cheque'

export type PaymentMethod =
	| 'bank_transfer'
	| 'cash_via_fso'
	| 'one_bill'
	| 'online_cash_deposit'
	| 'clearing_cheque_deposit'

export interface statusObject {
	status: TransactionStatus
	timestamp: Date
	updated_by: string
	comment?: string
}

export interface Destination {
	id?: string
	type: DestinationType
}

export interface ILoanTransaction {
	_id: string
	user_id: string
	loan_id: string
	type: TransactionType
	statuses: statusObject[]
	payment_date: Date
	amount: number
	method: PaymentMethod
	status: TransactionStatus
	transaction_image: string
	destination: Destination
	is_reconciled: boolean
	reconciled_amount?: number
	invoice_id?: string
	created_at?: Date
	updated_at?: Date
}
