import React, { useEffect, useState } from 'react'
import { FlexCol, FlexRow } from '../Flex'
import { Button, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import type { IBusiness } from '../../typings/business'
import { useLMS } from '../../Context'
import { enqueueSnackbar } from 'notistack'

const Header = styled(FlexRow)`
	width: 100%;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.palette.grey['100']};
	padding: 8px 16px;
	justify-content: space-between;
	align-items: center;

	@media screen and (max-width: 700px) {
		flex-direction: column;
	}
`

const Wrapper = styled(FlexRow)`
	@media screen and (max-width: 700px) {
		width: 100%;
		justify-content: space-between;
	}
`

const StyledButton = styled(Button)`
	@media screen and (max-width: 700px) {
		margin-top: 16px;
	}
`

const CreditLimitWrapper1 = styled(FlexCol)`
	padding-right: 20px;
	padding-left: 20px;
	border-left: 1px solid ${({ theme }) => theme.palette.grey['100']};

	@media screen and (max-width: 700px) {
		display: none;
	}
`

const CreditLimitWrapper2 = styled(FlexRow)`
	display: none;
	@media screen and (max-width: 700px) {
		display: flex;
		margin-top: 10px;
	}
`

const Row = styled(FlexCol)`
	padding-right: 20px;
`

type SummaryCardProps = {
	onClick?(): void
}

export const SummaryCard: React.ComponentType<SummaryCardProps> = ({
	onClick
}) => {
	const [detail, setDetail] = useState<IBusiness | undefined>(undefined)
	const { EMAIL, userDetail } = useLMS()
	const theme = useTheme()

	useEffect(() => {
		if (!EMAIL) {
			enqueueSnackbar('Email is required', {
				variant: 'error'
			})
		} else {
			setDetail(userDetail)
		}
	}, [EMAIL, userDetail])

	return (
		<Header>
			<Wrapper>
				<Row align={'flex-start'}>
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
					>
						Active Loans
					</Typography>
					<Typography variant={'subtitle2'}>0</Typography>
				</Row>
				<Row align={'flex-start'}>
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
					>
						Applications
					</Typography>
					<Typography variant={'subtitle2'}>0</Typography>
				</Row>
				<Row align={'flex-start'}>
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
					>
						Amount Due
					</Typography>
					<Typography variant={'subtitle2'}>
						PKR{' '}
						{`${(
							(detail?.kyb.credit_limit || 0) -
							(detail?.kyb.available_credit_limit || 0)
						).toLocaleString()}`}
					</Typography>
				</Row>
				<CreditLimitWrapper1 align={'flex-start'}>
					<Typography
						variant={'caption'}
						color={theme.palette.grey['600']}
					>
						Credit Limit Left
					</Typography>
					<Typography variant={'subtitle2'}>
						PKR{' '}
						{(
							detail?.kyb.available_credit_limit || 0
						).toLocaleString()}
					</Typography>
				</CreditLimitWrapper1>
			</Wrapper>
			<StyledButton
				variant={'contained'}
				onClick={() => {
					onClick?.()
				}}
			>
				Apply for Financing
			</StyledButton>
			<CreditLimitWrapper2 align={'flex-start'}>
				<Typography variant={'caption'} fontWeight={500}>
					Credit Limit Left PKR 900,000
				</Typography>
			</CreditLimitWrapper2>
		</Header>
	)
}
