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
    const session = await getSession(event)

    if (session?.token === null) {
        return await useLogout(event)
    }

    return client(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${session.token}`
        },
        async onResponseError({ response, error }) {
            if (response.status === 401 || response.status === 400) {
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
