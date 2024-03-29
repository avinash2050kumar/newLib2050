import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'
import { App } from '../App'
import type { PaletteOptions } from '@mui/material/styles/createPalette'
import axios, { type AxiosInstance } from 'axios'
import type { IBusiness } from '../typings/business'

type LMSContextProps = {
	TOKEN: string
	BASE_URL: string
	axiosInstance: AxiosInstance
	EMAIL?: string
	setEmail?(email: string): void
	userDetail?: IBusiness
}

type Props = {
	children: React.ReactNode
	token: string
	base_url: string
	theme?: 'light' | 'dark'
	palette?: PaletteOptions
	email?: string
}

const LMSContext = React.createContext<LMSContextProps>({} as LMSContextProps)

export const LMSProvider: React.FC<Props> = ({
	children,
	token,
	base_url,
	theme,
	palette,
	email
}) => {
	const [userEmail, setUserEmail] = useState(email)
	const [Token, setToken] = useState(token)
	const [userDetail, setUserDetail] = useState<IBusiness>()

	const fetchData = useCallback(async () => {
		try {
			const { data } = await axiosInstance.get(
				`/v1/external-lending/sme/users?email=${userEmail}`
			)
			setUserDetail(data)
		} catch (e: any) {
			//
		}
	}, [userEmail])

	const axiosInstance = axios.create({
		baseURL: base_url,
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const value: LMSContextProps = useMemo(() => {
		return {
			TOKEN: Token,
			BASE_URL: base_url,
			axiosInstance: axiosInstance,
			EMAIL: userEmail,
			setEmail: (email: string) => setUserEmail(email),
			userDetail: userDetail
		}
	}, [Token, base_url, axiosInstance, userEmail, userDetail])

	useEffect(() => {
		if (email) {
			fetchData()
		}
	}, [email, fetchData])

	return (
		<LMSContext.Provider value={value}>
			<App theme={theme} palette={palette}>
				{children}
			</App>
		</LMSContext.Provider>
	)
}

export const useLMS = () => useContext(LMSContext)
