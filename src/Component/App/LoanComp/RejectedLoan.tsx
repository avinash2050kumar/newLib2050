import { Card, Chip, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { Gutter } from '../../Gutter'
import { pascalCase } from '../../../helpers/string'
import { Box, styled } from '@mui/system'
import React from 'react'
import { FlexCol, FlexRow } from '../../Flex'
import type { ILoan } from '../../../typings/loan'
import { RejectedLoanDetails } from './RejectLoanDetails'
import { IoIosInformationCircleOutline } from 'react-icons/io'

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
	value: number
}

export const RejectedLoan: React.ComponentType<ApprovedLoanProps> = ({
	loanDetail,
	value
}) => {
	const reason = loanDetail.statuses?.filter(d => d.status === 'rejected')

	const theme = useTheme()

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
		<Card variant={'outlined'}>
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
						color="error"
						variant="outlined"
					/>
				</Row>
				<Gutter spacing={0.5} />
				<Card
					variant={'outlined'}
					style={{ width: '100%', padding: 10 }}
				>
					<Row align={'center'}>
						<IoIosInformationCircleOutline
							size={22}
							color={theme.palette.error.main}
						/>
						<Gutter gap={0.5} />
						<Typography variant={'subtitle1'} fontWeight={600}>
							Rejection Reason
						</Typography>
					</Row>
					<Typography variant={'subtitle2'} fontWeight={400}>
						{reason && reason.length > 0
							? reason[reason.length - 1].comment
							: ''}
					</Typography>
				</Card>
			</Col>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} aria-label="basic tabs example">
						<Tab label="Details" {...a11yProps(0)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<RejectedLoanDetails {...loanDetail} reason={reason} />
				</CustomTabPanel>
			</Box>
		</Card>
	)
}
