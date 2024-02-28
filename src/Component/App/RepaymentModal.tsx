import React, { useCallback, useEffect, useState } from 'react'

import {
	Button,
	InputAdornment,
	type ModalProps,
	Typography,
	useTheme
} from '@mui/material'
import { styled } from '@mui/system'
import { FlexCol, FlexRow } from '../Flex'
import { Formik } from 'formik'
import { IoIosClose } from 'react-icons/io'
import { dateFormat, TRANSACTION_METHOD } from '../../data'
import { pascalCase } from '../../helpers'
import type { PaymentMethod, RepaymentType } from '../../typings'
import { CiCircleInfo } from 'react-icons/ci'
import { Gutter } from '../Gutter'
import { Label } from '../Atoms/Label'
import { StyledModal } from '../StyledModal'
import { CustomAutoComplete } from '../Atoms/CustomAutoComplete'
import { FieldCurrencyInput } from '../Molecule/FieldCurrencyInput'
import { useLMS } from '../../Context'
import { useAppErrors } from '../../hooks'
import { enqueueSnackbar } from 'notistack'
import { DatePicker } from '../Atoms/DatePicker'
import type { ILoan } from '../../typings/loan'
import moment from 'moment'
import * as Yup from 'yup'
import type { AnyObject } from 'yup/es/types'
import { FaRegCopy } from 'react-icons/fa'
import { SingleUpload } from '../Molecule/SingleUpload'

const Container = styled(FlexCol)`
	align-items: flex-end;
	background-color: ${({ theme }) => theme.palette.background.default};
	padding: 16px;
	z-index: 0;
	border-radius: 10px;
	min-width: 300px;
	max-width: 500px;
	max-height: 90%;
	width: 100%;
`

const Row = styled(FlexRow)`
	width: 100%;
`

const Col = styled(FlexCol)`
	width: 100%;
`

const WRow = styled(Row)`
	padding: 10px;

	:hover {
		background-color: ${({ theme }: any) => theme.palette.primary['50']};
	}
`

const Copy = styled(FaRegCopy)`
	color: ${({ theme }: any) => theme.palette.grey['400']};

	:hover {
		cursor: pointer;
	}
`

const Box = styled(FlexCol)`
	width: 100%;
	background-color: ${({ theme }) => theme.palette.grey['50']};
	padding: 10px;
	border-radius: 5px;
`

const Box2 = styled(FlexCol)`
	width: 100%;
	border: 1px solid ${({ theme }) => theme.palette.grey['100']};
	padding: 10px;
	border-radius: 5px;
	flex-wrap: nowrap;
	overflow: scroll;
	max-height: 200px;
`

const CloseButtonWrapper = styled(FlexCol)`
	justify-content: center;
	align-items: center;
	height: 30px;
	width: 30px;
	right: 1.75em;
	&:hover {
		cursor: pointer;
		border-radius: 25%;
		background-color: ${({ theme }) => theme.palette.grey['100']};
		display: flex;
	}
`

const StyledPrimaryButton = styled(Button)`
	min-width: 0;
	min-height: 32px;
	padding: 0 10px;
	border-radius: 5px;
`

const validationSchema = Yup.object().shape({
	amount: Yup.number()
		.required('Amount is required')
		.min(1, 'Amount must be greater than zero')
		.test(
			'maxPayment',
			(
				quantity: number | undefined,
				values: Yup.TestContext<AnyObject>
			) => {
				const { parent } = values
				console.log('error', values, quantity)

				if (parent?.maxPayment < (quantity || 0)) {
					return values.createError({
						path: values.path,
						message: `Amount cannot be greater than ${parent?.maxPayment}`
					})
				}
				return true
			}
		)
})

type RepaymentModalProps = {
	onSuccess?(): void
	loanId: string
} & Omit<ModalProps, 'children'>

type PaymentMethodT = { value: PaymentMethod; label: string }

export const RepaymentModal: React.ComponentType<RepaymentModalProps> = ({
	onClose,
	onSuccess,
	loanId,
	...props
}) => {
	const [loading, setLoading] = useState(true)
	const [detail, setDetail] = useState<any>()
	const [loanDetail, setLoanDetail] = useState<ILoan>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const theme = useTheme()
	const { EMAIL, axiosInstance } = useLMS()
	const { setAppError } = useAppErrors()

	const getALoanDetail = useCallback(async () => {
		try {
			const res = await axiosInstance.get(
				`/v1/external-lending/sme/loans/repayment-details?email=${EMAIL}`
			)
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/loans/${loanId}`
			)
			setDetail(res.data)
			setLoanDetail(data.loan)
		} catch (e: any) {
			setAppError(e)
		} finally {
			setLoading(false)
		}
	}, [EMAIL, axiosInstance, loanId, setAppError])

	const initialValue: RepaymentType = {
		user_id: loanDetail && loanDetail.user_id ? loanDetail.user_id : '',
		amount: '0',
		type: 'repayment',
		method: 'bank_transfer',
		payment_date: moment.utc().format(),
		maxPayment: loanDetail?.pending?.principal || 0,
		transaction_image:
			'data:image/png;base64,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'
	}

	const loanRepayment = useCallback(
		async (values: RepaymentType) => {
			try {
				await axiosInstance.post(
					`/v1/external-lending/sme/loans/${loanId}/transaction`,
					values
				)
				onSuccess?.()
				onClose?.({}, 'escapeKeyDown')
				//setDetail(data)
			} catch (e: any) {
				setAppError(e)
			}
		},
		[axiosInstance, loanId, onClose, onSuccess, setAppError]
	)

	const RenderOption = ({
		opt,
		setFieldValue
	}: {
		opt: PaymentMethodT
		setFieldValue: any
	}) => {
		return (
			<WRow
				onClick={() => {
					setFieldValue('method', opt.value)
				}}
			>
				{opt.label}
			</WRow>
		)
	}

	const onSubmit = async (values: RepaymentType, actions: any) => {
		try {
			actions.setSubmitting(true)
			await loanRepayment(values)
		} catch (e) {
			//
		} finally {
			actions.setSubmitting(false)
		}
	}

	useEffect(() => {
		if (loanId) {
			getALoanDetail()
		} else {
			enqueueSnackbar('Invalid loan id', {
				variant: 'error'
			})
		}
	}, [])

	const Form = () => {
		return (
			<FlexCol style={{ width: '100%' }}>
				{!loading && loanDetail && (
					<Formik
						initialValues={initialValue}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{({
							values,
							handleSubmit,
							isSubmitting,
							isValid,
							setFieldValue
						}) => (
							<>
								<FlexRow
									align={'center'}
									justify={'space-between'}
									style={{ width: '100%' }}
								>
									<Typography
										fontWeight={600}
										variant={'body1'}
									>
										Record Payment
									</Typography>
									<CloseButtonWrapper>
										<IoIosClose
											size={25}
											onClick={() => {
												setIsModalOpen(false)
												onClose?.({}, 'escapeKeyDown')
											}}
										/>
									</CloseButtonWrapper>
								</FlexRow>
								<Gutter />
								<FieldCurrencyInput
									title={'Amount'}
									name="amount"
									placeholder={'Amount'}
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
								/>
								<Gutter spacing={0.5} />
								<Col>
									<Label>{'Payment Date*'}</Label>
									<Gutter spacing={0.2} />
									<DatePicker
										slotProps={{
											textField: {
												placeholder: 'Start Date',
												style: {
													borderRadius: 10,
													width: '100%'
												}
											}
										}}
										format={dateFormat}
										value={values.payment_date}
										onChange={e => {
											setFieldValue('paymentDate', e)
										}}
									/>
								</Col>
								<Gutter spacing={0.5} />
								<Col>
									<Label>Transaction Method</Label>
									<Gutter spacing={0.1} />
									<CustomAutoComplete
										options={TRANSACTION_METHOD}
										renderOption={(props, option) => (
											<RenderOption
												opt={option}
												setFieldValue={setFieldValue}
												{...props}
											/>
										)}
										size={'small'}
										style={{ width: '100%' }}
										value={pascalCase(
											TRANSACTION_METHOD.find(
												d => d.value === values.method
											)?.label
										)}
										filterOptions={(i, p) => {
											return i.filter(r =>
												r.label
													.toLowerCase()
													.includes(
														(
															p.inputValue || ''
														).toLowerCase()
													)
											)
										}}
										placeholder={'Method'}
									/>
								</Col>
								<Gutter spacing={0.5} />
								<FlexCol style={{ width: '100%' }}>
									<SingleUpload
										name={'transaction_image'}
										title={'Transaction Image (Optional)'}
									/>
								</FlexCol>
								<Gutter spacing={2} />
								<FlexRow
									align={'center'}
									justify={'space-between'}
									style={{ width: '100%' }}
								>
									<Typography variant={'body1'}></Typography>
									<StyledPrimaryButton
										variant={'contained'}
										onClick={() => handleSubmit()}
										disabled={!isValid || isSubmitting}
									>
										Save
									</StyledPrimaryButton>
								</FlexRow>
							</>
						)}
					</Formik>
				)}
			</FlexCol>
		)
	}

	const Information = () => {
		return (
			<FlexCol style={{ width: '100%' }}>
				<FlexRow
					align={'center'}
					justify={'space-between'}
					style={{ width: '100%' }}
				>
					<Typography fontWeight={600} variant={'body1'}>
						Make Repayment
					</Typography>
					<CloseButtonWrapper>
						<IoIosClose
							size={25}
							onClick={() => {
								setIsModalOpen(false)
								onClose?.({}, 'escapeKeyDown')
							}}
						/>
					</CloseButtonWrapper>
				</FlexRow>
				<Gutter />
				{detail && detail.repayment_address && (
					<>
						<Box>
							<Typography
								variant={'caption'}
								color={theme.palette.grey['600']}
							>
								Bank Name
							</Typography>
							<Typography variant={'body1'} fontWeight={500}>
								{detail.repayment_address.bank_name}
							</Typography>
							<Gutter spacing={0.5} />
							<Typography
								variant={'caption'}
								color={theme.palette.grey['600']}
							>
								Account Title
							</Typography>
							<Typography variant={'body1'} fontWeight={500}>
								{detail.repayment_address.account_title}
							</Typography>
							<Gutter spacing={0.5} />
							<Typography
								variant={'caption'}
								color={theme.palette.grey['600']}
							>
								Account Number
							</Typography>
							<Typography variant={'body1'} fontWeight={500}>
								{detail.repayment_address.account_number}{' '}
								<Copy
									onClick={() =>
										navigator.clipboard
											.writeText(
												detail.repayment_address
													.account_number
											)
											.then(e =>
												enqueueSnackbar(
													'Account Number successfully copied',
													{
														variant: 'success'
													}
												)
											)
									}
								/>
							</Typography>
							<Gutter spacing={0.5} />
							<Typography
								variant={'caption'}
								color={theme.palette.grey['600']}
							>
								IBAN
							</Typography>
							<Typography variant={'body1'} fontWeight={500}>
								{detail.repayment_address.iban}{' '}
								<Copy
									onClick={() =>
										navigator.clipboard
											.writeText(
												detail.repayment_address.iban
											)
											.then(e =>
												enqueueSnackbar(
													'IBAN successfully copied',
													{
														variant: 'success'
													}
												)
											)
									}
								/>
							</Typography>
						</Box>
						<Gutter />
					</>
				)}

				<Box2>
					<FlexRow align={'center'} justify={'center'}>
						<CiCircleInfo />
						<Gutter gap={0.2}></Gutter>
						<Typography variant={'body1'} fontWeight={500}>
							Repayment Instructions
						</Typography>
					</FlexRow>
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
					>
						A step by step guide on how to repay your financing
						amount.
					</Typography>
					<Gutter />
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
						style={{
							overflowWrap: 'break-word',
							whiteSpace: 'pre-line'
						}}
					>
						{detail?.instructions}
					</Typography>
				</Box2>
				<Gutter />
				<Button
					variant={'outlined'}
					style={{ alignSelf: 'flex-end' }}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Record Repayment
				</Button>
			</FlexCol>
		)
	}

	return (
		<StyledModal {...props}>
			<Container>
				{isModalOpen && <Form />}
				{!isModalOpen && <Information />}
			</Container>
		</StyledModal>
	)
}
