import { ofetch, type FetchOptions } from 'ofetch'
import { H3Event, createError } from 'h3'
import { getSession } from './session'
import { useLogout } from './logout'

const config = useRuntimeConfig()

const client = ofetch.create({ 
    baseURL: config.apiTraccar, 
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiFetch = async (event: H3Event, request: RequestInfo, options?: FetchOptions) => {
    const token = await getSession(event)

    if (token === null) {
        return await useLogout(event)
    }

    return client(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async onResponseError({ response, error }) {
            if (response.status === 401) {
                await useLogout(event)
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
