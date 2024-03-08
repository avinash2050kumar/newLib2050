import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { pascalCase } from '../../../helpers/string'
import { Button, Chip } from '@mui/material'
import { LOAN_COLOR } from '../../../data/color'
import type { ILoan } from '../../../typings/loan'

type LoansTable = {
	dataSource: ILoan[]
	onViewClick?(type: 'APPLICATION', loan: ILoan): void
	tableMaxHeight?: number
}

export const Application: React.ComponentType<LoansTable> = ({
	dataSource = [],
	onViewClick,
	tableMaxHeight
}) => {
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
						<TableCell>Application</TableCell>
						<TableCell>Status</TableCell>
						<TableCell align={'right'}>Amount (PKR)</TableCell>
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
								{row.display_id}
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
								{(
									row.required_financing || 0
								)?.toLocaleString()}
							</TableCell>

							<TableCell>
								<Button
									variant={'text'}
									onClick={() =>
										onViewClick?.('APPLICATION', row)
									}
								>
									View
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
