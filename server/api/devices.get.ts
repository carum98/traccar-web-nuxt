import { apiFetch } from "@utils/api-fetch"

export default defineEventHandler(async (event) => {
    const [devices, positions]: [Device[], Position[]] = await Promise.all([
        apiFetch(event, '/devices'),
        apiFetch(event, '/positions')
    ])

    const data = devices.map((device) => {
        const position = positions.find((position) => position.id === device.positionId) as Position

        return {
            ...device,
            lastPosition: position
        } as Device
    })

    return data
})
