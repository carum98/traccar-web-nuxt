<script setup lang="ts">
const baseDate = ref(new Date())

const props = defineProps<{
    value: {
        start: Date
        end: Date
    }
}>()

const emits = defineEmits<{
    close: []
    input: [{ start: Date, end: Date }]
}>()

const dates = reactive({
    start: props.value.start,
    end: props.value.end
})

const times = reactive({
    start: {
        hours: 0,
        minutes: 0,
        type: 'am'
    },
    end: {
        hours: 12,
        minutes: 59,
        type: 'pm'
    }
})

watch(dates, (value) => {
    console.log('dates', value)
})

const datesText = computed(() => {
    const start = dates.start.toLocaleDateString('en-us', { month:"short", day:"numeric" }) 
    const end = dates.end.toLocaleDateString('en-us', { month:"short", day:"numeric" })

    const startTime = `${times.start.hours.toString().padStart(2,'0')}:${times.start.minutes.toString().padStart(2,'0')} ${times.start.type}`
    const endTime = `${times.end.hours.toString().padStart(2,'0')}:${times.end.minutes.toString().padStart(2,'0')} ${times.end.type}`

    return `${start}, ${startTime} - ${end}, ${endTime}`
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

function select() {
    const start = new Date(dates.start)
    start.setHours(times.start.type === 'pm' ? times.start.hours + 12 : times.start.hours)
    start.setMinutes(times.start.minutes)

    const end = new Date(dates.end)
    end.setHours(times.end.type === 'pm' ? times.end.hours + 12 : times.end.hours)
    end.setMinutes(times.end.minutes)
    
    emits('input', { start, end })
}
</script>

<template>
    <div class="date-picker">
        <section class="date-picker__calendars">
            <DatePickerCalendar 
                position="left"
                :date="firstDate"
                v-model:start="dates.start"
                v-model:end="dates.end"
                @pre="prevDate"
            ></DatePickerCalendar>
            <DatePickerCalendar 
                position="right"
                :date="lastDate" 
                hide-prev
                v-model:start="dates.start"
                v-model:end="dates.end"
                @next="nextDate"
            ></DatePickerCalendar>
        </section>
        <section class="date-picker__times">
            <DatePickerTime 
                v-model="times.start"
            ></DatePickerTime>
            <DatePickerTime 
                v-model="times.end"
            ></DatePickerTime>
        </section>
        <section class="date-picker__actions">
            <p>{{ datesText }}</p>

            <div>
                <button @click="$emit('close')">
                    Cancel
                </button>
                <button @click="select">
                    Apply
                </button>
            </div>
        </section>
    </div>
</template>

<style>
.date-picker__calendars, .date-picker__times {
    display: flex;
    gap: 25px;
    justify-content: space-around;
    margin-bottom: 15px;
}

.date-picker__actions {
    display: flex;
    justify-content: end;
    padding-top: 10px;

    border-top: 1px solid var(--item-background-color-hover);

    button {
        background-color: var(--item-background-color-hover);
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
        margin-left: 10px;

        &:last-child {
            background-color: var(--primary-color);
        }
    }
}
</style>