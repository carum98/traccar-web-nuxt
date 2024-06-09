<script setup lang="ts">
// data
const devices = ref<Device[]>([])
const route = ref<Position[]>([])

const { init, drawRoute, setMarkers } = useMap()

// methods
async function getTodayPositions(deviceId: number): Promise<Position[]> {
    const firstHour = new Date()
    firstHour.setDate(firstHour.getDate() - 1)
    firstHour.setHours(0, 0, 0, 0)

    const lastHour = new Date()
    lastHour.setDate(lastHour.getDate() - 1)
    lastHour.setHours(23, 59, 59, 999)

    return await $fetch<Position[]>(`/api/positions`, {
        query: {
            deviceId,
            from: firstHour.toISOString(),
            to: lastHour.toISOString()
        }
    })
}

// watch
watch(devices, (values) => {
    setMarkers(
        values,
        (device) => new IconDevice({ category: device.category }),
        (device) => getTodayPositions(device.id).then((positions) => route.value = positions)
    )
})
watch(route, (values) => {
    const items = values.map((item) => {
        return {
            point: [item.longitude, item.latitude,],
            item
        }
    }) as {
        point: [number, number]
        item: Position
    }[]

    drawRoute(
        items,
        (item) => {
            document.getElementById(item.id.toString())?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        },
    )
})

// lifecycle
onMounted(async () => {
    init('map')
    devices.value = await $fetch('/api/devices')
})
</script>

<template>
    <main class="traccar-layout">
        <section class="traccar-layout__aside">
            <DevicesList :devices="devices" />
            <PositionsList :positions="route" />
        </section>

        <section class="traccar-layout__navbar">
            <ButtonSections />
            <ButtonUserAvatar />
        </section>

        <section class="traccar-layout__controls">
            <MapControls />
        </section>

        <div id="map"></div>
    </main>
</template>