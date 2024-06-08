import L from 'leaflet'

let map: L.Map

export function useMap() {
    function init(id: string) {
        const element = document.getElementById(id) as HTMLElement

        map = L.map(element, {
            center: [0, 0],
            zoom: 13,
            zoomControl: false
        })
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    }

    function drawRoute(points: [number, number][]) {
        // Remove previous route
        map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
                map.removeLayer(layer)
            }
        })

        L.polyline(points, { color: 'red' }).addTo(map)
    }

    function setMarkers<T>(
        items: Array<T & { lastPosition: { latitude: number, longitude: number } }>,
        iconBuilder: (item: T) => L.Icon,
        onClick: (item: T) => void
    ) {
        const markers = items.map((item) => L.marker([item.lastPosition.latitude, item.lastPosition.longitude], {
                icon: iconBuilder(item)
            })
            .on('click', () => onClick(item)
        ))
    
        L.layerGroup(markers).addTo(map)
    
        const lastMarker = markers.at(-1)
        if (lastMarker) {
            map.setView(lastMarker.getLatLng(), 18)
        }
    }

    function flyTo(lat: number, lon: number) {
        map.flyTo([lat, lon], 18)
    }

    return {
        init,
        drawRoute,
        setMarkers,
        flyTo
    }
}

export const IconDevice = L.DivIcon.extend({
    options: {
        className: 'icon-device-marker',
        iconAnchor: [20, 15],
    },
    createIcon: function () {
        const { category } = this.options

        const div = document.createElement('div')
        const icon = document.createElement('i')

        if (category === 'car') {
            icon.classList.add('icon-car')
        } else {
            icon.classList.add('icon-location-dot')
        }

        div.appendChild(icon)
        this._setIconStyles(div, 'icon')

        return div
    }
}) as any
