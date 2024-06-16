<script setup lang="ts">
const { init, drawRoute, setMarkers } = useMap()

// data
const dates = ref({
    start: new Date(),
    end: new Date()
})

const device = ref<Device>()
const devices = ref<Device[]>([])
const route = ref<Position[]>([])

// computed
const showSections = computed(() => device.value !== undefined && route.value.length > 0)

// methods
async function getPositions(): Promise<void> {
    route.value = await $fetch<Position[]>(`/api/positions`, {
        query: {
            deviceId: device.value?.id,
            from: dates.value.start.toISOString(),
            to: dates.value.end.toISOString()
        }
    })
}

// watch
watch(dates, (_) => getPositions())
watch(device, (_) => getPositions())

watch(devices, (values) => {
    setMarkers(
        values,
        (value) => new IconDevice({ category: value.category }),
        (value) => device.value = value
    )
})
watch(route, (values) => {
    const items = values.map((item) => ({
        point: [item.longitude, item.latitude,],
        item
    })) as {
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
        }
    )
})

// lifecycle
onMounted(async () => {
    init('map')
    devices.value = await $fetch('/api/devices')

    dates.value.start.setHours(0, 0, 0, 0)
    dates.value.end.setHours(23, 59, 59, 999)
})
</script>

<template>
    <main class="traccar-layout" :class="{ 'hide-sections': !showSections }">
        <section class="traccar-layout__aside">
            <DevicesList 
                :devices="devices" 
                v-model="device"
            ></DevicesList>
            <PositionsList 
                :positions="route"
            ></PositionsList>
        </section>

        <section class="traccar-layout__navbar">
            <ButtonSections />
            <ButtonUserAvatar />
        </section>

        <section class="traccar-layout__controls">
            <MapControls />
        </section>

        <section class="traccar-layout__player">
            <PositionsPlayer 
                :positions="route"
            ></PositionsPlayer>
        </section>

        <section class="traccar-layout__range">
            <PositionsDateRange 
                v-model="dates"
            ></PositionsDateRange>
        </section>

        <div id="map"></div>
    </main>
</template>