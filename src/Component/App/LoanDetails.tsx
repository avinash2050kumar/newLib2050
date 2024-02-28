import React, { useCallback, useEffect, useState } from 'react'
import { useAppErrors } from '../../hooks'
import { useLMS } from '../../Context'
import type { ILoan } from '../../typings/loan'
import { ApprovedLoan } from './LoanComp/Approved'
import { RejectedLoan } from './LoanComp/RejectedLoan'

type LoanDetailsProps = {
	loanId: string
	onRecordClick?(): void
	isRepayment?: boolean
}

export const LoanDetails: React.ComponentType<LoanDetailsProps> = ({
	loanId,
	onRecordClick,
	isRepayment
}) => {
	const [value, setValue] = React.useState(isRepayment ? 1 : 0)
	const [loanDetail, setLoanDetail] = useState<ILoan>()
	const { axiosInstance } = useLMS()

	const { setAppError } = useAppErrors()

	const getALoanDetail = useCallback(async () => {
		try {
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/loans/${loanId}`
			)

			setLoanDetail(data.loan)
		} catch (e: any) {
			setAppError(e)
		}
	}, [axiosInstance, loanId, setAppError])

	useEffect(() => {
		if (loanId) {
			getALoanDetail()
		}
	}, [getALoanDetail, loanId])

	return (
		<>
			<>{loanId ? '' : 'Provide Valid LoanId'}</>
			{loanDetail && loanDetail?.status !== 'rejected' && (
				<ApprovedLoan
					loanDetail={loanDetail}
					value={value}
					setValue={setValue}
					onRecordClick={onRecordClick}
				/>
			)}
			{loanDetail && loanDetail?.status === 'rejected' && (
				<RejectedLoan loanDetail={loanDetail} value={value} />
			)}
		</>
	)
}
