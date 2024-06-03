import { ofetch, type FetchOptions } from 'ofetch'
import { H3Event, createError } from 'h3'
import { useToken } from './token'

const config = useRuntimeConfig()

const client = ofetch.create({ 
    baseURL: config.apiTraccar, 
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiFetch = async (event: H3Event, request: RequestInfo, options?: FetchOptions) => {
    const token = await useToken(event)

    if (token === null) {
        // return await useLogout(event)
    }

    return client(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async onResponseError({ response, error }) {
            if (response.status === 401) {
                // await useLogout(event)
            } else {
                sendError(event, createError({
                    statusCode: response.status,
                    data: response._data,
                    stack: error?.stack
                }))
            }
        }
    })
}
