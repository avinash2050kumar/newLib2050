export function split(string: string): string[] {
	return string.split('')
}

export function pascalCase(name = '') {
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export function truncate(text: string, length: number) {
	let str = text.substring(0, length).trim()

	if (text.length > length) {
		str += '...'
	}

	return str
}
