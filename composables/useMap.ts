import L from 'leaflet'

let map: L.Map

export const layers = [
    {
        name: 'Stadia Dark',
        value: 'stadia-dark',
        layer: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
    },
    {
        name: 'OpenStreetMap',
        value: 'openstreetmap',
        layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    },
    {
        name: 'Google Maps',
        value: 'google',
        layer: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}')
    },
    {
        name: 'Google Satellite',
        value: 'google-satellite',
        layer: L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}')
    },
    {
        name: 'Google Terrain',
        value: 'google-terrain',
        layer: L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}')
    },
    {
        name: 'Google Hybrid',
        value: 'google-hybrid',
        layer: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}')
    },
    {
        name: 'Google Roads',
        value: 'google-roads',
        layer: L.tileLayer('https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}')
    },
    {
        name: 'Carto Dark',
        value: 'carto-dark',
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
    },
    {
        name: 'Carto Voyager',
        value: 'carto-voyager',
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
    },
    {
        name: 'Carto Positron',
        value: 'carto-positron',
        layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png')
    },
]

export function useMap() {
    function init(id: string) {
        const element = document.getElementById(id) as HTMLElement

        map = L.map(element, {
            center: [0, 0],
            zoom: 13,
            zoomControl: false
        })
    
        setLayer(layers[0].layer)
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

    function setLayer(layer: L.TileLayer) {
        map.eachLayer((l) => {
            if (l instanceof L.TileLayer) {
                map.removeLayer(l)
            }
        })

        layer.addTo(map)
    }

    function flyTo(lat: number, lon: number) {
        map.flyTo([lat, lon], 18)
    }

    // Zoom
    function zoom(type: 'in' | 'out') {
        const currentZoom = map.getZoom()
        const newZoom = type === 'in' ? currentZoom + 1 : currentZoom - 1
        map.setZoom(newZoom)
    }

    return {
        init,
        drawRoute,
        setMarkers,
        flyTo,
        zoom,
        setLayer,
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
