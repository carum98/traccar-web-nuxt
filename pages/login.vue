<script setup lang="ts">
function submit(event: Event) {
    const formData = new FormData(e.target as HTMLFormElement)
    const params = Object.fromEntries(formData)

    console.log(params)
}
</script>

<template>
    <form @submit.prevent="submit">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button @click.prevent="login">Login</button>
    </form>
</template>