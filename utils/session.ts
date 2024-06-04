import { type SessionConfig, H3Event } from 'h3'
import * as h3 from 'h3'

const config = {
    name: 'traccar',
    password: 'abe312002202557be2e39a6f20783198fd1225206ddce8170c31594c11f8d76a',
    maxAge: 32400
} as SessionConfig

export const getSession = async (event: H3Event): Promise<String> => {
    const session = await h3.getSession(event, config)

    return session.data as String
}

export const setSession = async (event: H3Event, data: String) => {
    await h3.updateSession(event, config, (_) => data)
}

export const clearSession = async (event: H3Event) => {
    await h3.clearSession(event, config)
    h3.deleteCookie(event, config.name as string)
}
