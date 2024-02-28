export const LOAN_COLOR: any = {
	in_progress: 'warning',
	under_review: 'warning',

	// intermediate - set by admin
	revision_requested: 'info',
	awaiting_lm_approval: 'info',
	awaiting_admin_approval: 'info',
	approved: 'info',
	ready_to_disburse: 'info',
	disbursed: 'success',
	overdue: 'error',
	default: 'info',

	// terminal
	rejected: 'error',
	completed: 'error'
}
