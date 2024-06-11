<script setup lang="ts">
const props = defineProps<{
    positions: Position[]
}>()

const progress = useState('progress', () => 0)
const isPlaying = ref(false)

let interval: NodeJS.Timeout | null = null

function play() {
    if (isPlaying.value) {
        clearInterval(interval!)
        isPlaying.value = false
    } else {
        interval = setInterval(() => {
            progress.value += 1
        }, 1000)
        isPlaying.value = true
    }
}

function pause() {
    clearInterval(interval!)
    isPlaying.value = false
}

function backward() {
    progress.value -= 1
}

function forward() {
    progress.value += 1
}

function togglePlay() {
    isPlaying.value ? pause() : play()
}

onUnmounted(() => {
    clearInterval(interval!)
})

watch(() => progress.value, (value) => {
    if (value >= props.positions.length) {
        pause()
    } else {
        const id = props.positions[value].id

        const element = document.getElementById(id.toString())
        if (!element) return

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })

        // emulate click on element
        element.click()
    }
})
</script>

<template>
    <section class="positions-player">
        <div class="positions-player__buttons">
            <button @click="backward">
                <i class="icon-backward"></i>
            </button>

            <button @click="togglePlay">
                <i v-if="isPlaying" class="icon-pause"></i>
                <i v-else class="icon-play"></i>
            </button>

            <button @click="forward">
                <i class="icon-forward"></i>
            </button>
        </div>

        <div class="positions-player__progress">
            <span>{{ positions.length }}</span>
            <input type="range" min="0" :max="positions.length" v-model.number="progress" />
            <span>{{ progress }}</span>
        </div>
    </section>
</template>

<style>
.positions-player {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.positions-player__buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 5px;

    i {
        font-size: 25px;
    }

    button {
        transition: scale 0.3s;

        &:nth-child(2) {
            background-color: var(--item-background-color-hover);
            width: 55px;
            height: 55px;
            border-radius: 50%;
            color: white;
        }

        &:hover {
            scale: 1.1;
        }
    }
}

.positions-player__progress {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    span {
        width: 40px;
        text-align: center;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 250px;
        height: 15px;
        border-radius: 15px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--text-color);
        cursor: pointer;
    }
}
</style>