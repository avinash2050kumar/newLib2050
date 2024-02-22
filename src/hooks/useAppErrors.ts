import type { IAPIErrorResponse } from '../typings'
import { useSnackbar } from 'notistack'
import { getAllErrors } from '../helpers/getAllErrors'
import { useCallback, useEffect, useState } from 'react'

// Going to update soon
export const useAppErrors = () => {
    const [errors, setErrors] = useState<IAPIErrorResponse>({ errors: [] })
    const [actions, setActions] = useState<any | undefined>()
    const { enqueueSnackbar } = useSnackbar()

    const transformDotNotationObject = (obj: any) => {
        const result: any = {}

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key]
                const keys = key.split('.')

                let currentObj = result
                for (let i = 0; i < keys.length - 1; i++) {
                    const nestedKey = keys[i]
                    if (!currentObj[nestedKey]) {
                        currentObj[nestedKey] = {}
                    }
                    currentObj = currentObj[nestedKey]
                }

                currentObj[keys[keys.length - 1]] = value
            }
        }

        return result
    }

    useEffect(() => {
        const { fieldErrors, messageErrors } = getAllErrors(errors)
        actions?.setErrors(transformDotNotationObject(fieldErrors))
        messageErrors.map(err => enqueueSnackbar(err.message))
    }, [actions, enqueueSnackbar, errors])

    const setAppError = useCallback(
        (e: IAPIErrorResponse, formikAction?: any) => {
            setErrors(e)
            setActions(formikAction)
        },
        []
    )

    return { setAppError }
}
