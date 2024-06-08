<script setup lang="ts">
const sections = [
    { name: 'Devices', icon: 'icon-car' },
    { name: 'Users', icon: 'icon-user' },
    { name: 'Groups', icon: 'icon-cars' },
    { name: 'Reports', icon: 'icon-report' },
    { name: 'Geofences', icon: 'icon-geozone' },
]
</script>

<template>
    <button class="button_sections" popovertarget="sections_dropdown">
        <i class="icon-grid-round"></i>
    </button>
    <div id="sections_dropdown" popover>
        <section>
            <button v-for="section in sections" :key="section.name">
                <i :class="section.icon"></i>
                {{ section.name }}
            </button>
        </section>
    </div>
</template>

<style>
.button_sections {
    background-color: var(--background-color);
    border-radius: 15px;
    width: 45px;
    height: 45px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s;
    position: relative;

    anchor-name: --sections_dropdown;

    font-size: 20px;

    &:hover {
        background-color: color-mix(in srgb, var(--background-color),#000 10%);
    }
}

#sections_dropdown {
    position-anchor: --sections_dropdown;
    inset-area: bottom span-left;

    padding: 10px;
    border-radius: 10px;

    section {
        display: grid;
        grid-template-columns: repeat(3, 80px);
        grid-auto-rows: 80px;
        gap: 10px;
    }

    button {
        border: unset;
        border-radius: 10px;
        background-color: var(--item-background-color);
        font-size: 13px;

        i {
            display: block;
            font-size: 25px;
        }

        &:hover {
            background-color: color-mix(in srgb, var(--item-background-color),#000 10%);
        }
    }
}
</style>