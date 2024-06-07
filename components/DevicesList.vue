<script setup lang="ts">
defineProps<{
    devices: Device[]
}>()

const { flyTo } = useMap()
</script>

<template>
    <div class="devices-list list-items">
        <ul>
            <li 
                v-for="device in devices" 
                :key="device.id" 
                @click="flyTo(device.lastPosition.latitude, device.lastPosition.longitude)"
            >
                {{ device.name }}
            </li>
        </ul>
    </div>
</template>

<style>
.devices-list {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>