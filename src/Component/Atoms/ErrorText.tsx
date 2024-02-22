import React from 'react'
import { Typography, useTheme } from '@mui/material'

type Props = {
	text?: string | boolean
}

export const ErrorText: React.ComponentType<Props> = ({ text }) => {
	const theme = useTheme()

	return text ? (
		<Typography
			variant={'caption'}
			color={theme.palette.error.main}
		>
			{text}
		</Typography>
	) : (
		<></>
	)
}
