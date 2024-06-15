<script setup lang="ts">
defineProps<{
    devices: Device[]
}>()

const { flyTo } = useMap()
const device = defineModel<Device>()

function onSelect(item: Device) {
    device.value = item
    flyTo(item.lastPosition.latitude, item.lastPosition.longitude)
}
</script>

<template>
    <div class="devices-list list-items">
        <ul>
            <li 
                v-for="item in devices" 
                :key="item.id" 
                :class="{ 'active': item.id === device?.id }"
                @click="onSelect(item)"
            >
                <span>
                    <i v-if="item.category === 'car'" class="icon-car"></i>
                    <i v-else class="icon-location-dot"></i>
                </span>

                <div>
                    <p>{{ item.name }}</p>

                    <small :class="item.status">
                        <template v-if="item.lastUpdate">
                            {{ timeAgo(item.lastUpdate) }}
                        </template>
                        <template v-else>
                            {{ item.status }}
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

        [class^="icon-"] {
            font-size: 18px;
            color: black;
        }

        small {
            &.offline {
                color: red;
            }

            &.online, &.unknown {
                color: green;
            }
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