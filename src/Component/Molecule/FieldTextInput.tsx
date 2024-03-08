import React, { type ChangeEvent, type CSSProperties, useCallback } from 'react'
import { useField } from 'formik'
import type { TextInputProps } from '../Atoms'
import { TextInput } from '../Atoms'
import { FlexCol } from '../Flex'
import { Label } from '../Atoms/Label'

export type FieldTextInputProps = Omit<TextInputProps, 'onFocus'> & {
	name: string
	placeholder?: string
	wrapperStyle?: CSSProperties
	nextInputRef?: React.MutableRefObject<typeof TextInput> | null
}

export const FieldTextInput = React.forwardRef<
	TextInputProps,
	FieldTextInputProps
>(
	(
		{
			name,
			onChange,
			title,
			id,
			onBlur,
			wrapperStyle,
			nextInputRef,
			...props
		},
		ref
	) => {
		const [field, meta, helpers] = useField(name)

		const error = meta.touched && meta.error

		const handleBlur = useCallback(() => {
			helpers.setValue(meta.value && meta.value?.trim())
			helpers.setTouched(true)
			onBlur?.(meta.value)
		}, [helpers, meta.value, onBlur])

		return (
			<FlexCol align={'flex-start'} style={wrapperStyle}>
				{title && <Label>{title}</Label>}
				<TextInput
					id={id || 'outlined-basic'}
					value={field.value ? field.value.toString() : ''}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						helpers.setValue(e.target.value)
						onChange?.(e)
					}}
					error={!!error}
					onBlur={handleBlur}
					helperText={error}
					{...props}
				/>
			</FlexCol>
		)
	}
)

FieldTextInput.displayName = 'FieldTextInput'
