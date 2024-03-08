import type { SelectChangeEvent } from '@mui/material'
import { Card, Tab, Tabs, Typography } from '@mui/material'

import React, { useCallback, useEffect, useState } from 'react'
import { FlexCol, FlexRow } from '../Flex'
import { Box, styled } from '@mui/system'
import { useLMS } from '../../Context'
import type { ILoan } from '../../typings/loan'
import { APPLICATION_STATUS, FILTER_BY_STATUS } from '../../data/Loanlist'
import { SearchBar } from '../Atoms/SearchBar'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Gutter } from '../Gutter'
import { LoansTable } from './LoanComp/Loans'
import { useAppErrors } from '../../hooks'
import { Application } from './LoanComp/Application'

const Row = styled(FlexRow)``

const Col = styled(FlexCol)`
	padding: 16px;
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

type LoanListProps = {
	onViewClick?(type: 'LOAN' | 'APPLICATION', loan: ILoan): void
	onRecordPaymentClick?(loan: ILoan): void
	tableMaxHeight?: number
}

export const LoanList: React.ComponentType<LoanListProps> = ({
	onViewClick,
	onRecordPaymentClick,
	tableMaxHeight
}) => {
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('all_loans')
	const [datasource, setDataSource] = useState<ILoan[]>([])
	const [filteredData, setFilteredData] = useState<ILoan[]>([])
	const [value, setValue] = useState(0)
	const { axiosInstance, EMAIL } = useLMS()
	const { setAppError } = useAppErrors()

	const getFilterArr = useCallback(
		(arr: ILoan[]) => {
			const ftc = arr.filter(f =>
				f.display_id.toLowerCase().includes(search.toLowerCase())
			)

			return filter === 'all_loans'
				? ftc
				: ftc.filter(
						f => f.status.toLowerCase() === filter.toLowerCase()
					)
		},
		[filter, search]
	)

	const getAllLoans = useCallback(async () => {
		try {
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/loans?email=${EMAIL}`
			)
			setDataSource(data.loans)
			setFilteredData(data.loans)
		} catch (e: any) {
			setAppError(e)
		}
	}, [EMAIL, axiosInstance, setAppError])

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
					<Box>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		)
	}

	useEffect(() => {
		getAllLoans()
	}, [getAllLoans])

	const onFilter = (event: SelectChangeEvent) => {
		setFilter(event.target.value as string)
	}

	const loan = getFilterArr(
		filteredData.filter(item => APPLICATION_STATUS.includes(item.status))
	)

	const application = getFilterArr(
		filteredData.filter(item => !APPLICATION_STATUS.includes(item.status))
	)

	return (
		<Card variant={'outlined'}>
			<Col>
				<Row>
					<SearchBar onSearch={t => setSearch(t)} />
					<Gutter gap={0.5} />
					<Select
						labelId="demo-select-small-label"
						id="demo-select-small"
						value={filter}
						sx={{ width: '20ch' }}
						size={'small'}
						placeholder={'Filter by status'}
						onChange={onFilter}
					>
						{FILTER_BY_STATUS.map(f => (
							<MenuItem value={f.value} key={f.value + f.name}>
								<em>{f.name}</em>
							</MenuItem>
						))}
					</Select>
				</Row>
			</Col>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={(e, value) => setValue(value)}
						aria-label="basic tabs example"
					>
						<Tab
							label={`Loan (${loan.length})`}
							{...a11yProps(0)}
						/>

						<Tab
							label={`Application (${application.length})`}
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<LoansTable
						dataSource={loan}
						onViewClick={onViewClick}
						onRecordPaymentClick={onRecordPaymentClick}
						tableMaxHeight={tableMaxHeight}
					/>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<Application
						dataSource={application}
						onViewClick={onViewClick}
						tableMaxHeight={tableMaxHeight}
					/>
				</CustomTabPanel>
			</Box>
		</Card>
	)
}
