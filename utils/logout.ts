import { H3Event, sendRedirect } from 'h3'
import { clearSession } from './session'

export const useLogout = async (event: H3Event) => {
    await clearSession(event)

    console.log('useLogout')

    return await sendRedirect(event, '/login', 302)
}
