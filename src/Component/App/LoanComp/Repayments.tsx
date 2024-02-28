import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import type { ILoan } from '../../../typings/loan'
import moment from 'moment/moment'
import { useLMS } from '../../../Context'
import { useAppErrors } from '../../../hooks'
import { RepaymentTable } from './RepaymentTable'
import type { ILoanTransaction } from '../../../typings/transaction'
import { Gutter } from '../../Gutter'

const Grid = styled('div')`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	width: fit-content;
`

export const LoanRepayment: React.ComponentType<ILoan> = ({ ...props }) => {
	const [loading, setLoading] = useState(true)
	const { axiosInstance } = useLMS()
	const [repayments, setRepayments] = useState<ILoanTransaction[]>([])
	const { setAppError } = useAppErrors()

	const getRepaymentList = useCallback(async () => {
		try {
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/loans/${props._id}/transaction`
			)

			setRepayments(data)
		} catch (e: any) {
			setAppError(e)
		} finally {
			setLoading(false)
		}
	}, [axiosInstance, props._id, setAppError])

	useEffect(() => {
		if (props._id) {
			getRepaymentList()
		}
	}, [getRepaymentList, props._id])

	return (
		<>
			<Grid>
				<Typography fontWeight={600} variant={'subtitle1'}>
					Amount Repaid:
				</Typography>
				<Typography variant={'subtitle1'}>
					PKR {props.payments?.principal_repaid?.toLocaleString()}
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Amount Due:
				</Typography>
				<Typography variant={'subtitle1'}>
					PKR{' '}
					{(
						parseFloat(`${props.pending?.principal}`) +
						parseFloat(`${props.pending?.markup_fee}`)
					).toLocaleString()}
				</Typography>

				<Typography fontWeight={600} variant={'subtitle1'}>
					Repayment End Date:
				</Typography>
				<Typography variant={'subtitle1'}>
					{props.tenure
						? moment(props.disbursement_date)
								.add(props.tenure, 'days')
								.format('DD/MM/YY')
						: '-'}
				</Typography>

				{props.pending && props.pending?.late_fees > 0 && (
					<>
						<Typography fontWeight={600} variant={'subtitle1'}>
							Late Fee:
						</Typography>
						<Typography variant={'subtitle1'}>
							{props.pending?.late_fees.toLocaleString()}
						</Typography>
					</>
				)}
			</Grid>
			<Gutter />
			<RepaymentTable dataSource={repayments} />
		</>
	)
}
