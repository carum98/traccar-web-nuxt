<template>
    <button class="button_avatar">
        <svg viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    </button>
</template>

<style>
.button_avatar {
    background-color: var(--background-color);
    border: unset;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s;
    position: relative;

    svg {
        width: 17px;
        height: 17px;
    }

    &::before {
        content: '';
        border: 3px solid color-mix(in srgb, var(--background-color),#000 40%);
        border-radius: 50%;
        display: block;
        position: absolute;
        inset: 4px;
    }

    &:hover {
        background-color: color-mix(in srgb, var(--background-color),#000 10%);
    }
}
</style>