<script setup lang="ts">
import L from 'leaflet'

async function getDevices() {
    const [devices, positions] = await Promise.all([
        $fetch('/api/devices'),
        $fetch('/api/positions')
    ])

    const data = devices.map((device) => {
        const position = positions.find((position) => position.id === device.positionId)

        return {
            device,
            position
        }
    })

    return data
}

onMounted(() => {
    const element = document.getElementById('map')

    const map = L.map(element, {
        center: [0, 0],
        zoom: 13,
        zoomControl: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    getDevices().then((items) => {
        const markers = items.map((item) => L.marker([item.position.latitude, item.position.longitude]))

        const group = L.layerGroup(markers).addTo(map)

        map.setView(markers.at(-1).getLatLng(), 18)

        map.on('click', (event) => {
            console.log(event.latlng)
        })
    })
})
</script>

<template>
    <div id="map"></div>
</template>