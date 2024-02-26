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
	}, [EMAIL, axiosInstance, setAppError])

	const initialValue: RepaymentType = {
		user_id: loanDetail && loanDetail.user_id ? loanDetail.user_id : '',
		amount: '0',
		type: 'repayment',
		method: 'bank_transfer',
		payment_date: moment.utc().format(),
		maxPayment: loanDetail?.pending?.principal || 0
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
		[EMAIL, axiosInstance, setAppError]
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
