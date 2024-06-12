<template>
    <section class="positions-date-range-picker">
        <div>
            june 9, 12:01 am <i class="icon-arrow-right"></i> june 9, 11:59 pm
        </div>

        <button popovertarget="date-picker">
            <i class="icon-calendar-week"></i>
        </button>

        <div id="date-picker" popover>
            <DatePickerIntex />
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

    > div {
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
        inset-area: bottom;
    }
}
</style>