<script setup lang="ts" generic="T">
defineProps<{
    options: T[]
}>()

const value = defineModel<T>()

const popoverId = `selector-simple-${Math.random().toString(36).slice(2)}`
const anchorId = `--${popoverId}`

const styleInput = {
    anchorName: anchorId
}

const styleDropdown = {
    positionAnchor: anchorId,
    insetArea: 'bottom'
}
</script>

<template>
    <div class="selector-simple">
        <button
            class="selector-simple__input" 
            :popovertarget="popoverId"
            :style="styleInput"
        >
            <span>
                {{ value }}
            </span>

            <i class="icon-angle-right"></i>
        </button>
        <div 
            class="selector-simple__dropdown" 
            :id="popoverId" 
            popover
            :style="styleDropdown"
        >
            <ul>
                <li 
                    v-for="option in options" 
                    @click="value = option"
                    :class="{ 'is-active': option === value }"
                >
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.selector-simple__input {
    cursor: pointer;
    background-color: var(--item-background-color-hover);
    width: 65px;
    height: 30px;
    border-radius: 10px;
    padding: 0 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    i {
        display: inline-block;
        rotate: 90deg;
    }
}

.selector-simple__dropdown {
    border-radius: 10px;
    max-height: 30vh;
    overflow-y: scroll;
    border-radius: 10px;
    padding: 5px;
    width: 65px;

    ul {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    li {
        cursor: pointer;
        text-align: center;
        background-color: var(--item-background-color);
        border-radius: 10px;

        &:hover, &.is-active {
            background-color: var(--item-background-color-hover);
        }
    }
}
</style>