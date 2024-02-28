type P = {
	[key: string]: {
		color: 'success' | 'error' | 'warning' | 'primary'
		text: string
		hide?: boolean
	}
}

export const SNACKBAR_OPTIONS: P = {
	success: {
		color: 'success',
		text: 'Success'
	},
	error: {
		color: 'error',
		text: 'Error'
	},
	warning: {
		color: 'warning',
		text: 'Warning'
	},
	info: {
		color: 'primary',
		text: 'Info'
	},
	default: {
		color: 'error',
		text: 'Default',
		hide: true
	}
}
