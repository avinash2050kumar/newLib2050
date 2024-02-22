

export const addOrRemoveArr = (array: any[], value: any) => {
	const index = array.indexOf(value)
	if (index === -1) {
		array.push(value)
	} else {
		array.splice(index, 1)
	}
	return array
}
