<script setup lang="ts">
const router = useRouter()

async function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const params = Object.fromEntries(formData)

    await $fetch('/api/login', {
        method: 'POST',
        body: params
    })

    router.push('/')
}
</script>

<template>
    <form @submit.prevent="submit">
        <label>
            Email
            <input type="text" name="email" placeholder="Email">
        </label>

        <label>
            Password
            <input type="password" name="password" placeholder="Password">
        </label>

        <button type="submit">Login</button>
    </form>
</template>