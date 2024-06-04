import { resolve } from 'path'

export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        apiTraccar: ''
    },
    alias: {
        '@': resolve(__dirname, './'),
        '@components': resolve(__dirname, './components'),
        '@composables': resolve(__dirname, './composables'),
        '@utils': resolve(__dirname, './utils'),
        '@pages': resolve(__dirname, './pages'),
        '@views': resolve(__dirname, './views'),
    },
})
