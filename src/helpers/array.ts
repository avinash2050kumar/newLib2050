export const addOrRemoveArr = (array: any[], value: any) => {
	const index = array.indexOf(value)
	if (index === -1) {
		array.push(value)
	} else {
		array.splice(index, 1)
	}
	return array
}

export const arrayLength = (obj: any) => {
	let len = 0
	for (const key in obj) {
		if (Array.isArray(obj[key])) {
			len += obj[key].length
		}
	}
	return len
}
