<script setup lang="ts">
function logout() {
    $fetch('/api/logout', { method: 'POST' })
}
</script>

<template>
    <button class="button_avatar" popovertarget="avatar_dropdown">
        <i class="icon-user"></i>
    </button>
    <div id="avatar_dropdown" popover>
        <button @click="logout">
            <i class="icon-right-from-bracket"></i>
            Logout
        </button>
    </div>
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

    anchor-name: --avatar_dropdown;

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

#avatar_dropdown {
    position-anchor: --avatar_dropdown;
    position-area: bottom span-left;

    padding: 10px;
    border-radius: 10px;

    button {
        height: 43px;
        width: 100px;
        border-radius: 10px;
        font-size: 15px;
        background-color: var(--item-background-color);

        &:hover {
            background-color: var(--item-background-color-hover)
        }
    }
}
</style>