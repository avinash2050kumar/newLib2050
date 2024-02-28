import {
	Button,
	Card,
	CircularProgress,
	Typography,
	useTheme
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import { styled } from '@mui/system'
import { useDropzone } from 'react-dropzone'
import { FlexCol, FlexRow } from '../Flex'
import * as Axios from 'axios'
import { useAppErrors } from '../../hooks'
import { useField } from 'formik'
import { useSnackbar } from 'notistack'
import { CompressImage } from '../../utils'
import { ErrorText } from '../Atoms'
import { Gutter } from '../Gutter'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import { getFileExtension, isImageFileExtension } from '../../helpers'
import { MdCheckCircle, MdDelete } from 'react-icons/md'
import { formatFileSize } from '../../helpers/filesize'
import type { AwsResponsePropS } from '../../typings'
import { useLMS } from '../../Context'

const Wrapper = styled(FlexRow)`
	width: 100%;
`

const Delete = styled(MdDelete)<{ disabled?: boolean }>`
	color: ${({ theme }) => theme.palette.primary.contrastText};

	:hover {
		cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	}
`

const Flex = styled('div')`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	width: 100%;
`

const StyledCard = styled(Card)`
	width: 100%;
	margin-bottom: 10px;
	padding: 10px;
	align-items: center;
`

const Box3 = styled('div')`
	height: min-content;
`

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})

const Row = styled(FlexRow)`
	width: 100%;
	justify-content: space-between;
	align-items: center;
`

type Props = {
	name: string
	disabled?: boolean
	title: string
	buttonLabel?: string
}

export const SingleUpload: React.ComponentType<Props> = ({
	disabled,
	name,
	title,
	buttonLabel
}) => {
	const [loading, setLoading] = useState(false)
	const [tempFile, setTempFile] = useState({ url: '', name: '' })
	const [, meta, helpers] = useField(name)
	const { setAppError } = useAppErrors()
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const { axiosInstance } = useLMS()

	const error = meta.touched && meta.error

	const isImage = (url: string = '') => {
		const urlParts = url.toString().split('.')
		const lastPart = urlParts[urlParts.length - 1]
		const Fext = lastPart.split('?')[0]

		return (
			Fext.toLowerCase() === 'png' ||
			Fext.toLowerCase() === 'jpeg' ||
			Fext.toLowerCase() === 'jpg'
		)
	}

	const uploadADoc = async (
		//BUSINESS: string,
		fileName: string
	) => {
		try {
			const { data } = await axiosInstance.get<AwsResponsePropS>(
				`/v1/external-lending/sme/s3/presigned-url?file_name=${fileName}`
			)

			return data
		} catch (error: any) {
			throw error.response.data
		}
	}

	const onDrop = useCallback(
		async (acceptedFiles: any) => {
			try {
				if (acceptedFiles && acceptedFiles[0]) {
					const selectedFile = acceptedFiles[0]
					const getExt = getFileExtension(selectedFile.name)
					const isImage = isImageFileExtension(getExt)

					setLoading(true)
					setTempFile({ url: '', name: selectedFile.name })

					const data = await uploadADoc(selectedFile.name)
					let res: any = undefined

					if (isImage) {
						res = await CompressImage(selectedFile)
					}

					const reader = new FileReader()
					reader.onload = async evt => {
						await Axios.default
							.put(data.putPresignedURL, evt.target?.result, {
								headers: {
									'Content-Type': isImage
										? res.type
										: selectedFile.type
								}
							})
							.then(() => {
								helpers.setValue(data.putPresignedURL)

								enqueueSnackbar('Upload Successful', {
									variant: 'success'
								})
								setLoading(false)
								setTempFile({ url: '', name: '' })
							})
							.catch(() => {
								enqueueSnackbar('Upload Failed', {
									variant: 'error'
								})
								setLoading(false)
							})
					}

					reader.readAsArrayBuffer(isImage ? res : selectedFile)
				} else {
					setLoading(false)
				}
			} catch (error: any) {
				setAppError(error)
				setLoading(false)
			}
		},
		[enqueueSnackbar, helpers, meta.value, name, setAppError]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpeg'],
			'image/jpg': ['.jpg'],
			'application/pdf': ['.pdf']
		}
		//maxSize: 1000000
	})

	return (
		<>
			<Row>
				<Typography variant={'body1'} fontWeight={400}>
					{title}
				</Typography>
				<Button
					{...getRootProps()}
					role={undefined}
					variant="outlined"
					tabIndex={-1}
					startIcon={<UploadFileOutlinedIcon />}
					disabled={loading || disabled}
				>
					<input
						{...getInputProps()}
						disabled={disabled || loading}
					/>
					{buttonLabel ? buttonLabel : 'Upload file'}
					<VisuallyHiddenInput type="file" />
				</Button>
			</Row>

			<Gutter spacing={0.5} />
			<Wrapper>
				<Flex>
					<StyledCard variant={'outlined'}>
						<Row justify={'space-between'} align={'center'}>
							<FlexRow>
								{/*<Box3>
									{isImage(meta.value) ? (
										<img
											width={40}
											height={40}
											src={meta.value}
										/>
									) : (
										<ImFilePdf
											size={40}
											color={'#FF505F'}
										/>
									)}
								</Box3>*/}
								{/*<Gutter gap={0.5} />*/}
								<FlexCol justify={'space-between'}>
									<Typography variant={'subtitle2'}>
										Attachment
									</Typography>
									<FlexRow>
										<Typography
											variant={'caption'}
											color={theme.palette.grey['600']}
										>
											{formatFileSize(2430)}
										</Typography>
										<Gutter gap={1} />
										<Typography
											variant={'caption'}
											color={theme.palette.grey['600']}
										>
											Completed
										</Typography>
									</FlexRow>
								</FlexCol>
							</FlexRow>
							<FlexRow align={'center'}>
								<Delete onClick={() => helpers.setValue('')} />
								<Gutter gap={1} />
								<MdCheckCircle color={'#178D46'} size={30} />
							</FlexRow>
						</Row>
					</StyledCard>

					{(tempFile.name || tempFile.url) && (
						<StyledCard variant={'outlined'}>
							<Row justify={'space-between'} align={'center'}>
								<FlexRow>
									{/*<Box3
										style={{
											height: 40,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<CircularProgress />
									</Box3>
									<Gutter gap={0.5} />*/}
									<FlexCol
										//style={{ height: 40 }}
										justify={'space-between'}
									>
										<Typography>{`Attachment-${tempFile.name}.`}</Typography>
										<Typography variant={'caption'}>
											Uploading
										</Typography>
									</FlexCol>
								</FlexRow>
								<FlexRow align={'center'}>
									<Delete aria-disabled={true} disabled />
									<Gutter gap={1} />
									<CircularProgress />
								</FlexRow>
							</Row>
						</StyledCard>
					)}
				</Flex>
				<FlexRow style={{ width: '100%' }} align={'flex-start'}>
					<ErrorText text={error} />
				</FlexRow>
			</Wrapper>
			<Gutter />
		</>
	)
}
