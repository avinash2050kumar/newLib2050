import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import type { ILoan, StatusObject } from '../../../typings/loan'

const Grid = styled('div')`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	width: fit-content;
`

export const RejectedLoanDetails: React.ComponentType<
	ILoan & { reason?: StatusObject[] }
> = ({ reason, ...props }) => {
	return (
		<>
			<Grid>
				<Typography fontWeight={600} variant={'subtitle1'}>
					Requested Amount:
				</Typography>
				<Typography variant={'subtitle1'}>
					PKR {props.required_financing?.toLocaleString()}
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Financing Term:
				</Typography>
				<Typography variant={'subtitle1'}>
					{props.tenure} days
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Markup type:
				</Typography>
				<Typography variant={'subtitle1'}>{props.type}</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Reason:
				</Typography>
				<Typography variant={'subtitle1'}>
					{reason && reason.length > 0
						? reason[reason.length - 1].reason
						: ''}
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Comment:
				</Typography>
				<Typography variant={'subtitle1'}>
					{reason && reason.length > 0
						? reason[reason.length - 1].comment
						: ''}
				</Typography>
			</Grid>
		</>
	)
}
