<script setup lang="ts">
const props = defineProps<{
    positions: Position[]
}>()

const { moveTo, highlightRoutePoint } = useMap()

const index = useState<number>('progress')

function onSelect(position: Position) {
    moveTo(position.latitude, position.longitude)
    highlightRoutePoint(position.latitude, position.longitude)

    index.value = props.positions.indexOf(position)
}
</script>

<template>
    <div class="positions-list list-items">
        <ul>
            <li 
                v-for="(position, i) in positions" 
                :key="position.id"
                :id="position.id.toString()"
                :class="{ 'active': index === i }"
                @click="onSelect(position)"
            >
                <p>{{ position.latitude }}, {{ position.longitude }}</p>
                <small>{{ timeFormat(position.fixTime) }}</small>

                <section>
                    <i 
                        class="icon-location-arrow-up"
                        :style="{
                            visibility: position.course ? 'visible' : 'hidden',
                            transform: `rotate(${position.course}deg)`
                        }"
                    ></i>
                    <i 
                        class="icon-engine" 
                        :class="{ 'active': position.attributes.ignition }"
                    ></i>

                    <span v-if="position.speed">
                        {{ position.speed.toFixed(2) }} km/h
                    </span>
                </section>
            </li>
        </ul>
    </div>
</template>

<style>
.positions-list {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    li.active {
        background-color: var(--item-background-color-hover);
    }

    li {
        position: relative;

        section {
            position: absolute;
            right: 10px;
            top: 10px;

            display: grid;
            justify-items: end;
            grid-template-columns: repeat(2, 20px);

            span {
                grid-column: span 2;
                color: gray;
                font-size: 12px;
                white-space: nowrap;
            }

            i {
                font-size: 14px;
            }

            .icon-location-arrow-up {
                color: gray;
            }

            .icon-engine {
                color: gray;

                &.active {
                    color: rgb(83, 139, 83);
                }
            }

        }

        small {
            color: gray;
        }
    }
}
</style>