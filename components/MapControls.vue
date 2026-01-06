<script setup lang="ts">
const { zoom, setMapStyle } = useMap()

const layer = ref(layers[0].value)

watch(layer, (value) => {
    const item = layers.find((item) => item.value === value)

    if (item) {
        setMapStyle(item.layer)
    }
})
</script>

<template>
    <button class="layer-button" popovertarget="layers-dropdown">
        <i class="icon-layer-group"></i>
    </button>

    <div id="layers-dropdown" popover>
        <section>
            <label v-for="item in layers">
                {{ item.name }}
                <input type="radio" :value="item.value" v-model="layer" />
            </label>
        </section>
    </div>

    <div class="zoom-buttons">
        <button @click="zoom('in')">
            <i class="icon-plus"></i>
        </button>
        <button @click="zoom('out')">
            <i class="icon-minus"></i>
        </button>
    </div>
</template>

<style>
.zoom-buttons {
    background-color: var(--background-color);
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    overflow: hidden;

    position: relative;

    button {
        width: 35px;
        height: 35px;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--item-background-color-hover);
        }
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: calc(50% - 10px);

        width: 20px;
        height: 1px;
        background-color: var(--text-color);
        opacity: 0.5;
    }
}

.layer-button {
    background-color: var(--background-color);
    border-radius: 10px;
    width: 35px;
    height: 35px;
    transition: background-color 0.3s;

    anchor-name: --layers-dropdown;

    &:hover {
        background-color: var(--item-background-color-hover);
    }
}

#layers-dropdown {
    position-anchor: --layers-dropdown;
    position-area: left span-top;

    padding: 10px;
    border-radius: 10px;

    section {
        display: flex;
        flex-flow: column;
        gap: 5px;
    }

    label {
        display: block;
        cursor: pointer;

        padding: 5px 15px;
        border-radius: 10px;

        transition: background-color 0.3s;

        input[type="radio"] {
            visibility: hidden;
        }

        &:has(input[type="radio"]:checked) {
            background-color: var(--item-background-color-hover)
        }

        &:has(:not(input[type="radio"]:checked)) {
            opacity: 0.7;
        }

        &:hover {
            background-color: var(--item-background-color-hover)
        }
    }
}
</style>