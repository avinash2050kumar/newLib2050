import { Button, Card, Chip, Tab, Tabs, Typography } from '@mui/material'
import { Gutter } from '../../Gutter'
import { pascalCase } from '../../../helpers/string'
import { Box, styled } from '@mui/system'
import { LoanItemDetails } from './Details'
import { LoanRepayment } from './Repayments'
import type { SetStateAction } from 'react'
import React from 'react'
import { FlexCol, FlexRow } from '../../Flex'
import type { ILoan } from '../../../typings/loan'
import { LOAN_COLOR } from '../../../data/color'

const Row = styled(FlexRow)``

const Col = styled(FlexCol)`
	padding: 16px;
`

const Grid = styled('div')`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	row-gap: 2px;
	width: auto;
	padding: 14px;
`

const StyledButton = styled(Button)`
	margin-right: 14px;
	margin-top: 14px;

	@media screen and (max-width: 600px) {
		margin: 0 0 10px 10px;
	}
`

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

type ApprovedLoanProps = {
	loanDetail: ILoan
	onRecordClick?(): void
	value: number
	setValue: React.Dispatch<SetStateAction<number>>
}

export const ApprovedLoan: React.ComponentType<ApprovedLoanProps> = ({
	loanDetail,
	value,
	onRecordClick,
	setValue
}) => {
	const isVisible =
		loanDetail.status !== 'in_progress' &&
		loanDetail.status !== 'under_review' &&
		loanDetail.status !== 'approved' &&
		loanDetail.status !== 'ready_to_disburse'

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		)
	}

	return (
		<Card>
			<Col>
				<Row>
					<Typography fontWeight={600} variant={'h6'}>
						Loan {loanDetail.display_id}
					</Typography>
					<Gutter gap={0.5} />
					<Chip
						label={pascalCase(
							loanDetail.status.replaceAll('_', ' ')
						)}
						size={'small'}
						color={LOAN_COLOR[loanDetail.status]}
						variant="outlined"
					/>
				</Row>

				{isVisible && (
					<>
						<Gutter spacing={0.5} />
						<Card variant={'outlined'} style={{ width: '100%' }}>
							<Row justify={'space-between'}>
								<Grid>
									<Typography fontWeight={500} variant={'h6'}>
										Payable Today:
									</Typography>
									<Typography fontWeight={500} variant={'h6'}>
										PKR{' '}
										{parseFloat(
											`${loanDetail.pending?.principal}` ||
												'0'
										) +
											parseFloat(
												`${loanDetail.pending?.markup_fee}` ||
													'0'
											) +
											parseFloat(
												`${loanDetail.pending?.late_fees}` ||
													'0'
											).toFixed(2)}
									</Typography>
									<Typography variant={'caption'}>
										Total Principal:
									</Typography>
									<Typography variant={'caption'}>
										PKR{' '}
										{parseFloat(
											`${loanDetail.required_financing}` ||
												'0'
										).toFixed(2)}
									</Typography>
									<Typography variant={'caption'}>
										Markup Accrued:
									</Typography>
									<Typography variant={'caption'}>
										PKR{' '}
										{parseFloat(
											`${loanDetail.markup}` || '0'
										).toFixed(2)}
									</Typography>
								</Grid>
								{loanDetail.status === 'disbursed' && (
									<StyledButton
										variant={'contained'}
										size={'small'}
										style={{
											marginRight: 14,
											marginTop: 14
										}}
										onClick={() => onRecordClick?.()}
									>
										Record Payment
									</StyledButton>
								)}
							</Row>
						</Card>
					</>
				)}
			</Col>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="Details" {...a11yProps(0)} />
						{isVisible && (
							<Tab label="Repayments" {...a11yProps(1)} />
						)}
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<LoanItemDetails {...loanDetail} />
				</CustomTabPanel>
				{isVisible && (
					<CustomTabPanel value={value} index={1}>
						<LoanRepayment {...loanDetail} />
					</CustomTabPanel>
				)}
			</Box>
		</Card>
	)
}
