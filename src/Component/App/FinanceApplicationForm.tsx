import React, { useEffect, useState } from 'react'
import { FlexCol, FlexRow } from '../Flex'
import { styled } from '@mui/system'
import {
	Button,
	Card,
	InputAdornment,
	Typography,
	useTheme
} from '@mui/material'
import { Gutter } from '../Gutter'
import { Formik } from 'formik'
import type { PERDICTION } from '../../data'
import { CREATE_LOAN } from '../../data'
import { UploadAttachment } from '../Molecule/UploadAttachment'
import * as Yup from 'yup'
import { useAppErrors } from '../../hooks'
import { useLMS } from '../../Context'
import { FieldCurrencyInput } from '../Molecule/FieldCurrencyInput'
import { enqueueSnackbar } from 'notistack'
import type { LoanPost } from '../../typings/loan'

const Wrapper = styled(FlexCol)`
	padding: 16px;
	width: 100%;
	height: 100%;
	flex-wrap: nowrap;
`

const Row = styled(FlexRow)`
	width: 100%;
	justify-content: space-between;
	align-items: center;
`

const HorizontalBar = styled(FlexRow)`
	width: 100%;
	border: 1px solid ${({ theme }) => theme.palette.grey['200']};
`

const PrimaryButtonWrapper = styled(FlexRow)``

const StyledPrimaryButton = styled(Button)`
	min-width: 0;
	min-height: 32px;
	padding: 0 10px;
	border-radius: 5px;
`

const Col = styled(FlexCol)`
	width: 100%;
`

const StyledRow = styled(FlexRow)`
	width: 100%;
	justify-content: flex-end;
`

const Box = styled(FlexCol)`
	background-color: ${({ theme }) => theme.palette.grey['50']};
	padding: 10px;
	border-radius: 7px;
	min-width: 300px;
	max-width: 400px;
`

const validationSchema = Yup.object().shape({
	required_financing: Yup.number()
		.required('Amount is required')
		.min(1, 'Amount must be greater than zero')
})

type FinanceApplicationFormProps = {
	loanId?: string
	data?: LoanPost
	onSuccess?(load: any): void
}

export const FinanceApplicationForm: React.ComponentType<
	FinanceApplicationFormProps
> = ({ loanId, data, onSuccess }) => {
	const [prediction, setPrediction] = useState<PERDICTION>()
	const theme = useTheme()
	const { axiosInstance, EMAIL, userDetail } = useLMS()
	const { setAppError } = useAppErrors()

	const calculateAmount = async (e: string, principal: string) => {
		try {
			const response = await axiosInstance.post(
				'/v1/external-lending/sme/loans/predict',

				{
					user_id: userDetail?.user.id,
					tenure: e,
					principal_amount: principal
				}
			)
			setPrediction(response.data.balances)
		} catch (e: any) {
			setAppError(e)
		}
	}

	const fetchData = async () => {
		try {
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/users?email=${EMAIL}`
			)
		} catch (e: any) {
			setAppError(e)
		}
	}

	useEffect(() => {
		if (EMAIL) {
			fetchData()
		}
	}, [])

	const onSubmit = async (value: any, action: any) => {
		try {
			action.setSubmitting(true)

			if (!data) {
				const res = await axiosInstance.post(
					'/v1/external-lending/sme/loans',
					{
						...value,
						email: EMAIL
					}
				)
				onSuccess?.(res.data)
				action.resetForm({
					values: CREATE_LOAN
				})
				setPrediction(undefined)
				enqueueSnackbar('Successfully Submitted', {
					variant: 'success'
				})
			} else {
				const res = await axiosInstance.patch(
					`/v1/external-lending/sme/loans/${loanId}`,
					{
						...value,
						email: EMAIL
					}
				)
				onSuccess?.(res.data)
				action.resetForm({
					values: CREATE_LOAN
				})
				setPrediction(undefined)
				enqueueSnackbar('Successfully Submitted', {
					variant: 'success'
				})
			}
		} catch (e: any) {
			setAppError(e)
		} finally {
			action.setSubmitting(false)
		}
	}

	return (
		<Card variant={'outlined'}>
			<Wrapper>
				<Formik
					initialValues={data || CREATE_LOAN}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ values, handleSubmit, isSubmitting, isValid }) => (
						<>
							<Row>
								<Col>
									<Typography variant={'h6'} fontWeight={600}>
										Apply for Financing
									</Typography>
									<Typography variant={'body2'}>
										Please provide us details of your
										inventory/purchase order/invoice.
									</Typography>
								</Col>
							</Row>
							<Col>
								<Gutter spacing={2} />
							</Col>
							<UploadAttachment
								buttonLabel={'ATTACH DOCUMENT'}
								name={'invoice_data'}
								title={
									'Documents (invoice/purchase order/inventory)'
								}
							/>
							<FieldCurrencyInput
								title={'Financing Amount (PKR)'}
								name="required_financing"
								placeholder={'0'}
								size="small"
								wrapperStyle={{ width: '100%' }}
								style={{ width: '100%' }}
								inputProps={{ style: { textAlign: 'end' } }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Typography>PKR</Typography>
										</InputAdornment>
									)
								}}
								onBlur={e =>
									calculateAmount(
										(values?.tenure as string) || '0',
										e
									)
								}
							/>
							<Gutter spacing={0.3} />
							<FieldCurrencyInput
								title={'Financing Term (days)'}
								name="tenure"
								placeholder={'0'}
								size="small"
								wrapperStyle={{ width: '100%' }}
								style={{ width: '100%' }}
								inputProps={{ style: { textAlign: 'end' } }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Typography>PKR</Typography>
										</InputAdornment>
									)
								}}
								onBlur={e =>
									calculateAmount(
										e,
										values.required_financing as string
									)
								}
							/>
							<Gutter />
							<Box>
								<Typography
									variant={'caption'}
									color={theme.palette.grey['700']}
								>
									Principal Amount
								</Typography>
								<Typography variant={'body2'}>
									{(
										parseFloat(
											`${values.required_financing}`
										) || 0
									).toLocaleString()}
								</Typography>
								<Gutter spacing={0.3} />

								<Typography
									variant={'caption'}
									color={theme.palette.grey['700']}
								>
									Total Markup
								</Typography>
								<Typography variant={'body2'}>
									PKR {prediction?.markupPending}
								</Typography>
								<Gutter spacing={0.4} />
								<HorizontalBar />
								<Gutter spacing={0.4} />
								<Typography
									variant={'caption'}
									color={theme.palette.grey['700']}
								>
									Total Net Payment Due
								</Typography>
								<Typography variant={'body2'} fontWeight={600}>
									PKR{' '}
									{(
										(parseFloat(
											`${prediction?.amountPending}`
										) || 0) +
										(prediction?.markupPending || 0)
									).toLocaleString()}
								</Typography>
							</Box>
							<StyledRow>
								<StyledPrimaryButton
									variant={'outlined'}
									onClick={() => {}}
									disabled={isSubmitting}
								>
									<PrimaryButtonWrapper>
										Cancel
									</PrimaryButtonWrapper>
								</StyledPrimaryButton>
								<Gutter gap={1} />
								<StyledPrimaryButton
									variant={'contained'}
									onClick={() => handleSubmit()}
									disabled={isSubmitting || !isValid}
								>
									<PrimaryButtonWrapper>
										Submit
									</PrimaryButtonWrapper>
								</StyledPrimaryButton>
							</StyledRow>
						</>
					)}
				</Formik>
			</Wrapper>
		</Card>
	)
}
