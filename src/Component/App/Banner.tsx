import { FlexCol, FlexRow } from '../Flex'
import { Gutter } from '../Gutter'
import { Button, Typography, useTheme } from '@mui/material'
import { IoIosClose } from 'react-icons/io'
import React, { useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/system'
import { RiErrorWarningLine } from 'react-icons/ri'
import type { BannerType, IBusiness } from '../../typings/business'
import { useLMS } from '../../Context'
import type { BannerDataType } from '../../data/banner'
import { BANNER_DATA } from '../../data/banner'
import { enqueueSnackbar } from 'notistack'

const FinanceContainer = styled(FlexRow)<{ color: any }>`
	width: 100%;
	padding: 12px;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ color }) => color};
	margin-bottom: 5px;
`

const ButtonWrapper = styled(FlexRow)`
	@media screen and (max-width: 800px) {
		display: none;
	}
`

const DescriptionButton = styled(FlexRow)`
	@media screen and (min-width: 801px) {
		display: none;
	}
`

const Wrapper = styled(FlexRow)`
	@media screen and (max-width: 800px) {
		flex-direction: column;
	}
`

const Gap = styled(FlexRow)`
	width: 8px;
	height: 8px;

	@media screen and (max-width: 800px) {
		width: 6px;
		height: 6px;
	}
`

type OFHeaderProps = {
	onClick?({
		type,
		contractUrl
	}: {
		type: BannerType
		contractUrl: string
	}): void
	onClose?(): void
}

export const Banner: React.ComponentType<OFHeaderProps> = ({
	onClose,
	onClick
}) => {
	const [loading, setLoading] = useState(true)
	const [detail, setDetail] = useState<IBusiness | undefined>()
	const { EMAIL, userDetail } = useLMS()
	const theme = useTheme()

	const status = useMemo(() => {
		let contractUrl, contractValid, reason
		if (detail) {
			contractUrl = detail.kyb?.facilities.filter(
				(d: any) => d.status === 'contract_pending'
			)[0]?.envelope_url
			contractValid = detail.kyb?.facilities.filter(
				(d: any) => d.status === 'contract_valid'
			)
			reason = detail.kyb?.statuses?.filter(
				(d: any) => d.status === 'rejected'
			)
		}
		return {
			contractUrl,
			contractValid,
			reason: reason && reason.length > 0 ? reason[0].reason : ''
		}
	}, [detail])

	useEffect(() => {
		if (!EMAIL) {
			enqueueSnackbar('Email is required', {
				variant: 'error'
			})
		} else {
			setDetail(userDetail)
		}
	}, [EMAIL, userDetail])

	const Render = ({
		data,
		color,
		disabled
	}: {
		color?: any
		data: BannerDataType
		disabled?: boolean
	}) => {
		return (
			<FinanceContainer color={color['50']}>
				<Wrapper>
					<RiErrorWarningLine
						fontSize={35}
						color={color['600'] || color}
					/>
					<Gap />
					<FlexCol>
						<Typography
							variant={'body2'}
							fontWeight={500}
							textAlign={'left'}
						>
							{data.title}
						</Typography>
						<Typography
							variant={'caption'}
							fontWeight={400}
							textAlign={'left'}
						>
							{data.description}
						</Typography>
						{data.actionTitle && (
							<>
								{/*<Gutter spacing={0.5} />*/}
								<DescriptionButton>
									<Button
										disabled={!!disabled}
										variant={'contained'}
										onClick={() => {
											onClick?.({
												type: data.type,
												contractUrl:
													status.contractUrl || ''
											})
										}}
									>
										{data.actionTitle}
									</Button>
								</DescriptionButton>
							</>
						)}
					</FlexCol>
				</Wrapper>
				<FlexRow align={'flex-start'} style={{ alignSelf: 'start' }}>
					{data.actionTitle && (
						<ButtonWrapper>
							<Button
								variant={'contained'}
								disabled={!!disabled}
								onClick={() => {
									onClick?.({
										type: data.type,
										contractUrl: status.contractUrl || ''
									})
								}}
							>
								{data.actionTitle}
							</Button>
						</ButtonWrapper>
					)}
					<Gutter gap={0.5} />
					<IoIosClose
						size={25}
						id={'close-button'}
						onClick={() => {
							onClose?.()
						}}
						style={{ cursor: 'pointer' }}
					/>
				</FlexRow>
			</FinanceContainer>
		)
	}

	return (
		<>
			{!loading && detail && (
				<>
					{!detail.kyb && !detail.user && (
						<Render
							data={BANNER_DATA().REGISTER as BannerDataType}
							color={theme.palette.primary}
						/>
					)}
					{detail.kyb && detail.kyb.status === 'pending' && (
						<Render
							data={BANNER_DATA().PENDING as BannerDataType}
							color={theme.palette.warning}
						/>
					)}
					{detail.kyb &&
						detail.kyb.status === 'approved' &&
						status.contractValid?.length === 0 && (
							<Render
								data={
									BANNER_DATA(
										undefined,
										!status.contractUrl
											? 'You will receive contract soon'
											: 'Review and sign contract'
									).APPROVED as BannerDataType
								}
								color={theme.palette.primary}
								disabled={!status.contractUrl}
							/>
						)}
					{/*{detail.kyb &&
						status.contractValid &&
						status.contractValid?.length > 0 && (
							<Render
								data={
									BANNER_DATA()
										.APPLY_FINANCING as BannerDataType
								}
								color={theme.palette.success}
							/>
						)}*/}
					{detail.kyb && detail.kyb.status === 'rejected' && (
						<Render
							data={
								BANNER_DATA(status?.reason)
									.REJECTED as BannerDataType
							}
							color={theme.palette.error}
						/>
					)}
				</>
			)}
		</>
	)
}
