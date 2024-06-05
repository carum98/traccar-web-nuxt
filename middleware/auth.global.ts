import { getSession } from '@utils/session'

export default defineNuxtRouteMiddleware(async (ctx) => {
    if (process.client) return

    // get session from context
    const event = useRequestEvent()
    if (!event) return

    const session = await getSession(event)

    const { name } = ctx

    // redirect to /login if session is not set
    if (!session?.token && name !== 'login') {
        return navigateTo('/login')
    } else if (session?.token && name === 'login') {
        return navigateTo('/')
    }
})