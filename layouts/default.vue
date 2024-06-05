<script setup lang="ts">
async function logout() {
    await $fetch(`/api/logout`, {
        method: 'POST'
    })

    clearNuxtData()
}
</script>


<template>
    <header>
        <nav>
            <ul>
                <li>
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/login">Login</nuxt-link>
                </li>
            </ul>
        </nav>

        <button @click="logout">
            Logout
        </button>
    </header>
    <main>
        <slot />
    </main>
</template>