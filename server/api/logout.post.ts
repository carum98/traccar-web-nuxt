import { useLogout } from '@utils/logout'

export default defineEventHandler(async (event) => {
    await useLogout(event)
})