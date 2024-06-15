<script setup lang="ts">
const value = defineModel<{ hours: number, minutes: number, type: 'am' | 'pm' }>({
    required: true
})
</script>

<template>
    <div class="date-picker-times">
        <SelectorSimple 
            :options="Array.from({ length: 12 }, (_, i) => i + 1)"
            v-model="value.hours"
        ></SelectorSimple>
        <SelectorSimple 
            :options="Array.from({ length: 60 }, (_, i) => i)"
            v-model="value.minutes"
        ></SelectorSimple>
        <SelectorSimple 
            :options="['am', 'pm']"
            v-model="value.type"
        ></SelectorSimple>
    </div>
</template>

<style>
.date-picker-times {
    display: flex;
    gap: 5px;
}
</style>
