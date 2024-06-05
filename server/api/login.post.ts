import { setSession } from '@utils/session'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const body = await readBody(event)
    const { email, password } = body

    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    
    const data = await $fetch<String>('/session/token', {
        method: 'POST',
        baseURL: config.apiTraccar,
        body: JSON.stringify({ expiration }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`
        },
    })

    await setSession(event, { token: data })

    return {
        status: 200,
        data: {
            message: 'Login successful'
        }
    }
})