<script setup lang="ts">
const baseDate = ref(new Date())

const dates = reactive({
    start: new Date(),
    end: new Date()
})

watch(dates, (value) => {
    console.log('dates', value)
})

const firstDate = computed(() => {
    const date = new Date(baseDate.value)
    date.setDate(1)
    return date
})

const lastDate = computed(() => {
    const date = new Date(baseDate.value)
    date.setMonth(date.getMonth() + 1)
    return date
})

function prevDate(): void {
    baseDate.value.setMonth(baseDate.value.getMonth() - 1)
    baseDate.value = new Date(baseDate.value)
}

function nextDate(): void {
    baseDate.value.setMonth(baseDate.value.getMonth() + 1)
    baseDate.value = new Date(baseDate.value)
}
</script>

<template>
    <div class="date-picker">
        <section class="date-picker__calendars">
            <DatePickerCalendar 
                :date="firstDate"
                hide-next
                v-model:start="dates.start"
                @pre="prevDate"
            ></DatePickerCalendar>
            <DatePickerCalendar 
                :date="lastDate" 
                hide-prev
                v-model:end="dates.end"
                @next="nextDate"
            ></DatePickerCalendar>
        </section>
        <section>
            <button>
                Cancel
            </button>
            <button>
                Apply
            </button>
        </section>
    </div>
</template>

<style>
.date-picker__calendars {
    display: flex;
    gap: 25px;
}
</style>