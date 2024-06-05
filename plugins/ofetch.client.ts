import { ofetch } from 'ofetch'

export default defineNuxtPlugin((_nuxtApp) => {
    globalThis.$fetch = ofetch.create({
        async onResponse({ response }) {
            // Redirect
            if (response.redirected) {
                const url = new URL(response.url)

                await navigateTo(url.pathname, { redirectCode: 302 })
            }
        }
    })
})