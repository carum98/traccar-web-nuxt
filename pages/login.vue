<script setup lang="ts">
definePageMeta({
  layout: 'login'
})

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
            <input type="email" name="email" placeholder="Email">
        </label>

        <label>
            Password
            <input type="password" name="password" placeholder="Password">
        </label>

        <button type="submit">Login</button>
    </form>
</template>

<style scoped>
    form {
        width: 250px;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        margin-top: 1rem;

        input {
            width: 100%;
        }

        button[type="submit"] {
            padding: 0.6rem;
            border-radius: 10px;
            background-color: var(--primary-color);
            font-size: 16px;

            &:hover {
                background-color: var(--primary-color-dark);
            }
        }
    }
</style>