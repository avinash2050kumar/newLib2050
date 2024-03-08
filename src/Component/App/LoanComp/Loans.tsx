import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { pascalCase } from '../../../helpers/string'
import moment from 'moment'
import { Button, Chip, Typography, useTheme } from '@mui/material'
import { LOAN_COLOR } from '../../../data/color'
import type { ILoan } from '../../../typings/loan'
import { getDateFormat } from '../../../helpers/date'
import { Gutter } from '../../Gutter'
import { styled } from '@mui/system'
import { FlexRow } from '../../Flex'

const Wrapper = styled(FlexRow)`
	flex-wrap: nowrap;
`

type LoansTable = {
	dataSource: ILoan[]
	onViewClick?(type: 'LOAN', loan: ILoan): void
	onRecordPaymentClick?(loan: ILoan): void
	tableMaxHeight?: number
}

export const LoansTable: React.ComponentType<LoansTable> = ({
	dataSource = [],
	onViewClick,
	onRecordPaymentClick,
	tableMaxHeight
}) => {
	const theme = useTheme()

	return (
		<TableContainer
			component={Paper}
			style={{
				minHeight: tableMaxHeight || 300,
				maxHeight: tableMaxHeight || 300
			}}
		>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Loan</TableCell>
						<TableCell>Status</TableCell>
						<TableCell align={'right'}>End Date</TableCell>
						<TableCell align={'right'}>Principal (PKR)</TableCell>
						<TableCell align={'right'}>Markup (PKR)</TableCell>
						<TableCell align={'right'}>Repaid (PKR)</TableCell>
						<TableCell align={'right'}>Late Fee (PKR)</TableCell>
						<TableCell align={'right'}>Amount Due (PKR)</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataSource.map(row => (
						<TableRow
							key={row.display_id}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0
								}
							}}
						>
							<TableCell component="th" scope="row">
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{row.display_id}
								</Typography>
							</TableCell>
							<TableCell component="th" scope="row">
								<Chip
									label={pascalCase(
										row.status.replaceAll('_', ' ')
									)}
									size={'small'}
									color={LOAN_COLOR[row.status]}
									variant="outlined"
								/>
							</TableCell>
							<TableCell align={'right'}>
								<Typography variant={'body2'}>
									{row.status === 'disbursed'
										? moment(row.due_date).format(
												'DD/MM/YY'
											)
										: ''}
								</Typography>
								<Typography
									variant={'caption'}
									color={theme.palette.grey['700']}
								>
									{row.status === 'disbursed'
										? getDateFormat(row?.due_date || '')
										: ''}
								</Typography>
							</TableCell>
							<TableCell align={'right'}>
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{(
										row.required_financing || 0
									)?.toLocaleString()}
								</Typography>
							</TableCell>
							<TableCell align={'right'}>
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{row.status === 'disbursed'
										? parseFloat(
												`${row.pending?.markup_fee || 0}`
											).toLocaleString()
										: ''}
								</Typography>
							</TableCell>
							<TableCell align={'right'}>
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{row.status === 'disbursed'
										? (
												parseFloat(
													`${row.payments?.markup_fee || 0}`
												) +
												parseFloat(
													`${row.payments?.principal_repaid || 0}`
												) +
												parseFloat(
													`${row.payments?.late_fees || 0}`
												)
											).toLocaleString()
										: ''}
								</Typography>
							</TableCell>
							<TableCell align={'right'}>
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{row.status === 'disbursed'
										? (
												parseFloat(
													`${row.pending?.late_fees || 0}`
												) +
												parseFloat(
													`${row.payments?.late_fees || 0}`
												)
											).toLocaleString()
										: ''}
								</Typography>
							</TableCell>
							<TableCell align={'right'}>
								<Typography
									variant={'body2'}
									style={{ flexWrap: 'nowrap' }}
								>
									{row.status === 'disbursed'
										? (
												parseFloat(
													`${row.pending?.markup_fee || 0}`
												) +
												parseFloat(
													`${row.pending?.principal || 0}`
												) +
												parseFloat(
													`${row.pending?.late_fees || 0}`
												)
											).toLocaleString()
										: ''}
								</Typography>
							</TableCell>
							<TableCell>
								<Wrapper>
									<Button
										variant={'text'}
										onClick={() =>
											onViewClick?.('LOAN', row)
										}
									>
										View
									</Button>
									<Gutter gap={0.5} />
									<Button
										variant={'text'}
										onClick={() =>
											onRecordPaymentClick?.(row)
										}
									>
										Record Payment
									</Button>
								</Wrapper>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
