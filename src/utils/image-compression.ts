import imageCompression from 'browser-image-compression'

/**
 * This is taken from the lib because it doesn't export it out
 * It can be useful
 * */
interface IImageCompressorOptions {
	/** @default Number.POSITIVE_INFINITY */
	maxSizeMB?: number
	/** @default undefined */
	maxWidthOrHeight?: number
	/** @default false */
	useWebWorker?: boolean
	/** @default 10 */
	maxIteration?: number
	/** Default to be the exif orientation from the image file */
	exifOrientation?: number
	/** A function takes one progress argument (progress from 0 to 100) */
	onProgress?: (progress: number) => void
	/** Default to be the original mime type from the image file */
	fileType?: string
	/** @default 1.0 */
	initialQuality?: number
}

const ImageCompressor = async (
	image: Blob,
	options?: IImageCompressorOptions
) => {
	const defaultOptions: IImageCompressorOptions = {
		maxSizeMB: 0.2,
		initialQuality: 0.9,
		maxWidthOrHeight: 400,
		fileType: 'image/png',
		useWebWorker: true
	}

	// if image is already of proper size, no need to resize it
	if (image.size / 1024 / 1024 <= (defaultOptions.maxSizeMB ?? 1)) {
		return image
	}

	const imageFile = image as File

	return await imageCompression(imageFile, {
		...defaultOptions,
		...options
	})
}

export const CompressImage = async (
	image: Blob,
	options?: IImageCompressorOptions
) => {
	const defaultOptions: IImageCompressorOptions = {
		maxSizeMB: 0.99,
		maxWidthOrHeight: 900,
		fileType: 'image/png',
		useWebWorker: true
	}

	const imageFile = image as File

	return await imageCompression(imageFile, {
		...defaultOptions,
		...options
	})
}

export default ImageCompressor
