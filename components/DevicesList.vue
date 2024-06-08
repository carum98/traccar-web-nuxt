<script setup lang="ts">
defineProps<{
    devices: Device[]
}>()

const { flyTo } = useMap()
</script>

<template>
    <div class="devices-list list-items">
        <ul>
            <li 
                v-for="device in devices" 
                :key="device.id" 
                @click="flyTo(device.lastPosition.latitude, device.lastPosition.longitude)"
            >
                <span>
                    <img v-if="device.category === 'car'" src="/assets/svg/car.svg"/>
                    <img v-else src="/assets/svg/location-dot.svg"/>
                </span>

                <div>
                    <p>{{ device.name }}</p>

                    <small :class="device.status">
                        <template v-if="device.lastUpdate">
                            {{ timeAgo(device.lastUpdate) }}
                        </template>
                        <template v-else>
                            {{ device.status }}
                        </template>
                    </small>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
.devices-list {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    li {
        display: flex;
        align-items: center;
        gap: 15px;

        p {
            line-height: 17px;
        }

        small {
            &.offline {
                color: red;
            }

            &.online, &.unknown {
                color: green;
            }
        }

        img {
            width: 18px;
            height: 18px;
        }

        span {
            background-color: #fff;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: grid;
            place-content: center;
        }
    }
}
</style>