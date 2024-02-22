import  axios  from 'axios'
import type {
	AwsResponsePropS,
} from '../typings'


export const uploadADoc = async (
	//BUSINESS: string,
	fileType: string,
	applicationType: 'image' | 'application',
	type: string
) => {
	const url = `/auth/cbfs/upload-url?mediaType=${applicationType}&businessId=${''}&fileType=${fileType}&enityType=${type}`

	try {
		const { data } = await axios.get<AwsResponsePropS>(url)

		return data
	} catch (error: any) {
		throw error.response.data
	}
}

