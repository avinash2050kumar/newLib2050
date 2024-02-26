import React, { type ChangeEvent, type CSSProperties, useCallback } from 'react'
import { useField } from 'formik'
import { POSITIVE_NUMBER_WITH_DECILMAL, type Regex } from '../../helpers'
import { Label } from '../Atoms/Label'
import { FlexCol } from '../Flex'
import type { TextInputProps } from '../Atoms'
import { TextInput } from '../Atoms'

export type FieldCurrencyInputProps = Omit<
	TextInputProps,
	'onBlur' | 'onChange' | 'onFocus'
> & {
	regex?: Regex
	name: string
	onBlur?(amount: string): void
	placeholder?: string
	wrapperStyle?: CSSProperties
	nextInputRef?: React.MutableRefObject<typeof TextInput> | null
}

export const FieldCurrencyInput = React.forwardRef<
	TextInputProps,
	FieldCurrencyInputProps
>(
	(
		{
			name,
			regex,
			nextInputRef,
			id,
			title,
			wrapperStyle,
			onBlur,
			...props
		},
		ref
	) => {
		const [field, meta, helpers] = useField(name as any)
		const { setValue, setTouched } = helpers
		const { value } = field

		const error = meta.touched && meta.error

		const handleBlur = useCallback(() => {
			if (
				value &&
				value.length > 0 &&
				value.charAt(value.length - 1) === '.'
			) {
				setValue(value.slice(0, -1))
				onBlur?.(value.slice(0, -1))
			} else {
				onBlur?.(value)
			}

			setTouched(true)
		}, [onBlur, setTouched, setValue, value])

		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			const typedValue = e.target.value.replaceAll(',', '') || ''

			if (typedValue.match(regex || POSITIVE_NUMBER_WITH_DECILMAL)) {
				setValue(typedValue)
			}
		}

		return (
			<FlexCol align={'flex-start'} style={wrapperStyle}>
				{title && <Label>{title}</Label>}
				<TextInput
					variant={'outlined'}
					id={id || 'outlined-basic'}
					value={field.value ? field.value.toString() : ''}
					onChange={onChange}
					type={'tel'}
					error={!!error}
					onBlur={handleBlur}
					helperText={error}
					{...props}
				/>
			</FlexCol>
		)
	}
)

FieldCurrencyInput.displayName = 'FieldCurrencyInput'
