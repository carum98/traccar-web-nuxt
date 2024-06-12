<script setup lang="ts">
const props = defineProps<{
    date: Date
    hidePrev?: boolean
    hideNext?: boolean
}>()

// Emits
defineEmits<{
    pre: []
    next: []
}>()

const start = defineModel<Date>('start')
const end = defineModel<Date>('end')

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthName = computed(() => {
    return props.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const firstDate = computed(() => {
    const date = new Date(props.date)
    date.setDate(1)
    return date
})

const lastDate = computed(() => {
    const date = new Date(props.date)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date
})

const days = computed(() => {
    const days = []

    const date = new Date(firstDate.value)
    date.setDate(1 - date.getDay())

    while (date <= lastDate.value) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }

    // fill the rest of the days
    while (days.length < 42) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }

    return days
})

function onSelect(day: Date) {
    if (start.value !== undefined) {
        start.value = day
    } else {
        end.value = day
    }
}
</script>

<template>
    <section class="date-picker-calendar">
        <div class="date-picker-calendar__header">
            <button @click="$emit('pre')" :disabled="!hideNext">
                <i class="icon-angle-left"></i>
            </button>
            <span>{{ monthName }}</span>
            <button @click="$emit('next')" :disabled="!hidePrev">
                <i class="icon-angle-right"></i>
            </button>
        </div>

        <div class="date-picker-calendar__calendar">
            <div class="names">
                <div v-for="day in weekDays" :key="day">
                    {{ day }}
                </div>
            </div>

            <div class="days">
                <button 
                    v-for="day in days" 
                    :class="{ 
                        'is-before': start ? day >= start : false,
                        'is-after': end ? day <= end : false,
                    }"
                    :disabled="day.getMonth() !== props.date.getMonth()"
                    @click="onSelect(day)"
                >
                    {{ day.getDate() }}
                </button>
            </div>
        </div>
    </section>
</template>

<style>
.date-picker-calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    button {
        background-color: var(--item-background-color-hover);
        border-radius: 10px;
        width: 35px;
        height: 35px;

        &:disabled {
            visibility: hidden;
        }
    }
}

.date-picker-calendar__calendar {
    .names, .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 1fr;
        gap: 5px;
    }

    .names {
        div {
            text-align: center;
            width: 35px;
            height: 25px;
            font-size: 14px;
            color: gray;
        }
    }

    .days {
        button {
            background-color: var(--item-background-color-hover);
            border-radius: 10px;
            width: 35px;
            height: 35px;

            &:disabled {
                opacity: 0.5;
                color: gray;
            }

            &.is-before, &.is-after {
                background-color: var(--background-color);
            }
        }
    }
}
</style>