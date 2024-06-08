<template>
    <button class="button_sections">
        <svg viewBox="0 0 448 512"><path fill="currentColor" d="M128 96A64 64 0 1 1 0 96a64 64 0 1 1 128 0zm0 160A64 64 0 1 1 0 256a64 64 0 1 1 128 0zM64 480a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM288 96A64 64 0 1 1 160 96a64 64 0 1 1 128 0zM224 320a64 64 0 1 1 0-128 64 64 0 1 1 0 128zm64 96a64 64 0 1 1 -128 0 64 64 0 1 1 128 0zm96-256a64 64 0 1 1 0-128 64 64 0 1 1 0 128zm64 96a64 64 0 1 1 -128 0 64 64 0 1 1 128 0zM384 480a64 64 0 1 1 0-128 64 64 0 1 1 0 128z"/></svg>
    </button>
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

    svg {
        width: 20px;
        height: 20px;
        margin-top: 3px;
    }

    &:hover {
        background-color: color-mix(in srgb, var(--background-color),#000 10%);
    }
}
</style>