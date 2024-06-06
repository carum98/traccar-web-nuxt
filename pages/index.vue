<script setup lang="ts">
import L from 'leaflet'

// data
let map: L.Map

// methods
function initMap() {
    const element = document.getElementById('map') as HTMLElement

    map = L.map(element, {
        center: [0, 0],
        zoom: 13,
        zoomControl: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
}

async function getDevices() {
    const [devices, positions]: [Device[], Position[]] = await Promise.all([
        $fetch('/api/devices'),
        $fetch('/api/positions')
    ])

    const data = devices.map((device) => {
        const position = positions.find((position) => position.id === device.positionId) as Position

        return {
            device,
            position
        }
    })

    return data
}

async function setMarkers() {
    const items = await getDevices()

    const markers = items.map((item) => L.marker([item.position.latitude, item.position.longitude]).on('click', () => {
        drawTodayRoute(item.device.id)
    }))

    L.layerGroup(markers).addTo(map)

    const lastMarker = markers.at(-1)
    if (lastMarker) {
        map.setView(lastMarker.getLatLng(), 18)
    }
}

async function drawTodayRoute(deviceId: number) {
    const positions = await getTodayPositions(deviceId)

    const latLngs = positions.map((position) => [position.latitude, position.longitude]) as [number, number][]

    L.polyline(latLngs, { color: 'red' }).addTo(map)
}

async function getTodayPositions(deviceId: number): Promise<Position[]> {
    const firstHour = new Date()
    firstHour.setHours(0, 0, 0, 0)

    const lastHour = new Date()
    lastHour.setHours(23, 59, 59, 999)

    return await $fetch<Position[]>(`/api/positions`, {
        query: {
            deviceId,
            from: firstHour.toISOString(),
            to: lastHour.toISOString()
        }
    })
}

// lifecycle
onMounted(() => {
    initMap()
    setMarkers()
})
</script>

<template>
    <div id="map"></div>
</template>