<script setup lang="ts">
defineProps<{
    positions: Position[]
}>()

const { flyTo } = useMap()
</script>

<template>
    <div class="positions-list list-items">
        <ul>
            <li 
                v-for="position in positions" 
                :key="position.id"
                @click="flyTo(position.latitude, position.longitude)"
            >
                {{ position.latitude }}, {{ position.longitude }}
                {{ position.fixTime }}
            </li>
        </ul>
    </div>
</template>

<style>
.positions-list {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>