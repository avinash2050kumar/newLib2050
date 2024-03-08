import type { IFile, IPartnerSnapshot } from './common'

export enum TransactionType {
	DISBURSEMENT = 'disbursement',
	REPAYMENT = 'repayment',
	LATE_FEE = 'late_fee',
	MARKUP = 'markup'
}

export enum TransactionStatus {
	PROCESSING = 'processing',
	REJECTED = 'rejected',
	APPROVED = 'approved',
	PAID = 'paid',
	CANCELLED = 'cancelled'
}

export enum DestinationType {
	BANK = 'bank',
	CASH = 'cash',
	ECOFIN = 'ecofin',
	CHEQUE = 'cheque'
}

export enum PaymentMethod {
	BANK_TRANSFER = 'bank_transfer',
	CASH_VIA_FSO = 'cash_via_fso',
	ONE_BILL = 'one_bill',
	ONLINE_CASH_DEPOSIT = 'online_cash_deposit',
	CLEARING_CHEQUE_DEPOSIT = 'clearing_cheque_deposit'
}

export interface statusObject {
	status: TransactionStatus
	timestamp: string
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
	payment_date: string
	amount: number
	method: PaymentMethod
	status: TransactionStatus
	transaction_image: string
	destination: Destination
	is_reconciled: boolean
	reconciled_amount?: number
	invoice_id?: string
	created_at?: string
	updated_at?: string
}

export enum Product {
	MOBILE_APP = 'mobile_app',
	WEB_APP = 'web_app'
}

export enum Platform {
	MOBILE = 'mobile',
	WEB = 'web',
	RP_MOBILE_APP = 'rp_mobile_app'
}

export enum LoanType {
	FIXED = 'fixed',
	FLOATING = 'floating',
	DAILY = 'daily'
}

export enum BusinessSegmentType {
	SME = 'sme',
	MSME = 'msme'
}

export interface StatusObject {
	status: FinanceAppState
	updated_by: string
	timestamp: string
	reason?: string
	comment?: string
}

export enum FinanceAppState {
	// initial states
	IN_PROGRESS = 'in_progress',
	UNDER_REVIEW = 'under_review',

	// intermediate - set by admin
	REVISION_REQUESTED = 'revision_requested',
	AWAITING_LM_APPROVAL = 'awaiting_lm_approval',
	AWAITING_ADMIN_APPROVAL = 'awaiting_admin_approval',
	APPROVED = 'approved',
	READY_TO_DISBURSE = 'ready_to_disburse',
	DISBURSED = 'disbursed',

	OVERDUE = 'overdue',
	DEFAULT = 'default',

	// terminal
	REJECTED = 'rejected',
	COMPLETED = 'completed'
}

export interface ILoan {
	_id: string
	display_id: string
	user_id: string
	customer_name: string
	partner?: IPartnerSnapshot
	disbursement_date?: string
	principal_amount?: number
	required_financing?: number
	statuses?: StatusObject[]
	status: FinanceAppState
	type: LoanType
	tenure?: number
	business_type?: BusinessSegmentType // set through discriminator
	markup?: number
	markup_per_day?: number
	due_date?: string
	payments?: {
		principal_repaid: number
		late_fees: number
		markup_fee: number
	}
	pending?: {
		principal: number
		late_fees: number
		markup_fee: number
	}
	meta?: {
		origin: {
			product: Product
			platform: Platform
		}
		assignee?: string
		fi_id?: string
	}
	raw?: string
	created_at?: string
	updated_at?: string
	external_images?: any
}

export type LoanPost = {
	email: string
	invoice_data: IFile[]
	required_financing: number | string
	tenure?: string
}
