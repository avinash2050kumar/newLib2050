import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import type { ILoan } from '../../../typings/loan'
import moment from 'moment'

const Grid = styled('div')`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	width: fit-content;
`

export const LoanItemDetails: React.ComponentType<ILoan> = ({ ...props }) => {
	const isVisible =
		props.status !== 'in_progress' && props.status !== 'under_review'

	return (
		<>
			<Grid>
				<Typography fontWeight={600} variant={'subtitle1'}>
					Total Loan Amount:
				</Typography>
				<Typography variant={'subtitle1'}>
					PKR {props.required_financing?.toLocaleString()}
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Tenure:
				</Typography>
				<Typography variant={'subtitle1'}>
					{props.tenure} days
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Markup Type:
				</Typography>
				<Typography variant={'subtitle1'}>{props.type}</Typography>

				{isVisible && (
					<Typography fontWeight={600} variant={'subtitle1'}>
						Markup Rate:
					</Typography>
				)}
				{isVisible && (
					<Typography variant={'subtitle1'}>
						{parseFloat(`${props.markup}`).toFixed(2)}
					</Typography>
				)}

				{isVisible && (
					<Typography fontWeight={600} variant={'subtitle1'}>
						Start Date:
					</Typography>
				)}
				{isVisible && (
					<Typography variant={'subtitle1'}>
						{moment(props.disbursement_date).format('DD/MM/YY')}
					</Typography>
				)}

				{isVisible && (
					<Typography fontWeight={600} variant={'subtitle1'}>
						Repayment End Date:
					</Typography>
				)}
				{isVisible && (
					<Typography variant={'subtitle1'}>
						{props.tenure
							? moment(props.disbursement_date)
									.add(props.tenure, 'days')
									.format('DD/MM/YY')
							: '-'}
					</Typography>
				)}
			</Grid>
		</>
	)
}
