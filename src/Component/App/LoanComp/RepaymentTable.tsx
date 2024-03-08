import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import type { ILoanTransaction } from '../../../typings/transaction'
import { FlexCol } from '../../Flex'
import { pascalCase } from '../../../helpers/string'
import moment from 'moment'
import { Chip } from '@mui/material'
import { styled } from '@mui/system'
import { LOAN_COLOR } from '../../../data/color'

const Button = styled(FlexCol)`
	color: ${({ theme }) => theme.palette.primary.main};

	:hover {
		cursor: pointer;
	}
`

export const RepaymentTable: React.ComponentType<{
	dataSource: ILoanTransaction[]
}> = ({ dataSource = [] }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>S.No</TableCell>
						<TableCell>Amount (PKR)</TableCell>
						<TableCell>Payment Details</TableCell>
						<TableCell>File</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataSource.map((row, i) => (
						<TableRow
							key={row._id}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0
								}
							}}
						>
							<TableCell component="th" scope="row">
								{i + 1}
							</TableCell>
							<TableCell>
								<FlexCol>{row.amount}</FlexCol>
								<FlexCol>
									{pascalCase(row?.method).replaceAll(
										'_',
										' '
									)}
								</FlexCol>
							</TableCell>
							<TableCell>
								<FlexCol>
									{moment(row.created_at).format('DD/MM/YY')}
								</FlexCol>
								<FlexCol>
									<Chip
										label={pascalCase(row.status)}
										size={'small'}
										color={LOAN_COLOR[row.status]}
										variant="filled"
									/>
								</FlexCol>
							</TableCell>
							<TableCell>
								<Button
									onClick={() =>
										window.open(
											row.transaction_image,
											'_blank'
										)
									}
								>
									Attachment-{i + 1}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
