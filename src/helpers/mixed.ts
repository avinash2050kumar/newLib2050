

export const getFileExtension = (filename: string = ''): string => {
	return filename.split('.').pop() || ''
}

export const isImageFileExtension = (filename: string = ''): boolean => {
	const extension = getFileExtension(filename)
	return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)
}

export const convertCamelCaseToTitleCase = (inputString: string) => {
	// Replace camelCase with space-separated words
	const spacedWords = inputString.replace(/([a-z])([A-Z])/g, '$1 $2')

	// Capitalize the first letter of each word
	return spacedWords.replace(/\b\w/g, function (match) {
		return match.toUpperCase()
	})
}
