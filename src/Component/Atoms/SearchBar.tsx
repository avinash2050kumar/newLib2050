import type { FocusEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { styled } from '@mui/system'
import type { Regex } from '../../helpers'
import type { TextInputProps } from './TextInput'
import { TextInput } from './TextInput'
import { useDebouncedCallback } from 'use-debounce'

const InputIcons = styled(InputAdornment)`
	:hover {
		cursor: pointer;
	}
`

export type SearchBarProps = {
	onSearch?(text: string): void
	onBlur?(
		text: string,
		event?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	): void
	regex?: Regex
} & Omit<TextInputProps, 'onChange' | 'onBlur' | 'value'>

export const SearchBar: React.ComponentType<SearchBarProps> = ({
	onSearch,
	onBlur,
	regex,
	...props
}) => {
	const [searchText, setSearchText] = useState<string>('')

	const onClear = useCallback(() => {
		setSearchText('')
		onSearch?.('')
		onBlur?.('')
	}, [onSearch, onBlur])

	const debouncedSearch = useDebouncedCallback(text => onSearch?.(text), 500)
	const RenderIcons = useCallback(
		() => (
			<InputIcons position="end" sx={{ marginRight: 0.5 }}>
				{searchText ? (
					<HighlightOffIcon
						onClick={onClear}
						fontSize={'small'}
						color={'primary'}
					/>
				) : (
					<SearchIcon />
				)}
			</InputIcons>
		),
		[onClear, searchText]
	)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (regex && e.target.value.match(regex)) {
			setSearchText(e.target.value)
			debouncedSearch(e.target.value)
		} else if (!regex) {
			setSearchText(e.target.value)
			debouncedSearch(e.target.value)
		}
	}

	return (
		<TextInput
			size="small"
			value={searchText}
			placeholder={'Search'}
			onBlur={e => {
				onBlur?.(searchText, e)
			}}
			style={{ width: '35ch' }}
			InputProps={{
				endAdornment: <RenderIcons />
			}}
			onChange={onChange}
			{...props}
		/>
	)
}
