<template>
    <main>
        <img src="/logo.svg" alt="Logo" />
    
        <slot></slot>
    </main>

    <footer>
        Developed by <a href="https://github.com/carum98/traccar-web-nuxt">@carum98</a>, not affiliated with <a href="ttps://www.traccar.org">traccar.org</a>
    </footer>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 2rem);
    }

    footer {
        text-align: center;
        color: gray;
    }
</style>