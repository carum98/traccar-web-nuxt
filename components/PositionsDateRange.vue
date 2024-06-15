<script setup lang="ts">
const dates = defineModel<{ start: Date, end: Date }>({
    required: true
})

const datesText = computed(() => {
    const start = dates.value.start
        .toLocaleDateString('en-us', { month:"short", day:"numeric", hour12: true, hour: 'numeric', minute: 'numeric' })
        .toLowerCase()

    const end = dates.value.end
        .toLocaleDateString('en-us', { month:"short", day:"numeric", hour12: true, hour: 'numeric', minute: 'numeric' })
        .toLowerCase()

    return {
        start,
        end
    }
})

function closePopover() {
    const popover = document.querySelector('#date-picker') as HTMLElement
    popover.hidePopover()
}

function changeRangeTime({ start, end }: { start: Date, end: Date }) {
    closePopover()

    dates.value = {
        start,
        end
    }
}
</script>

<template>
    <section class="positions-date-range-picker">
        <p>
            {{ datesText.start }} <i class="icon-arrow-right"></i> {{ datesText.end }}
        </p>

        <button popovertarget="date-picker">
            <i class="icon-calendar-week"></i>
        </button>

        <div id="date-picker" popover="manual">
            <DatePickerIntex 
                :value="dates" 
                @close="closePopover"
                @input="changeRangeTime"
            ></DatePickerIntex>
        </div>
    </section>
</template>

<style>
.positions-date-range-picker {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    display: flex;
    gap: 10px;

    > p {
        background-color: var(--item-background-color);
        padding: 10px 15px;
        border-radius: 10px;
    }

    > button {
        background-color: var(--item-background-color-hover);
        border-radius: 10px;
        width: 43px;
        height: 43px;

        anchor-name: --date-picker;
    }

    #date-picker {
        position-anchor: --date-picker;
        inset-area: bottom span-left;

        padding: 10px 15px;
        border-radius: 10px;
    }
}
</style>