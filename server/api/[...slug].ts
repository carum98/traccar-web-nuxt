import { apiFetch } from "@utils/api-fetch"

export default defineEventHandler(async (event) => {
    const method = event.method

    const slug = getRouterParam(event, 'slug') as string
    const query = getQuery(event)

    if (method === 'GET') {
        const data = await apiFetch(event, slug, {
            method,
            query
        })

        return data
    } else if (method === 'POST' || method === 'PUT') {
        const body = await readBody(event)

        const data = await apiFetch(event, slug, {
            method,
            body
        })

        return data
    }  else if (method === 'DELETE') {
        const data = await apiFetch(event, slug, {
            method
        })

        return data
    }
})