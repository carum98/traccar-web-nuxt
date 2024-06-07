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

    function setMarkers<T>(items: Array<T & { lastPosition: { latitude: number, longitude: number } }>, onClick: (item: T) => void) {
        const markers = items.map((item) => L.marker([item.lastPosition.latitude, item.lastPosition.longitude]).on('click', () => {
            onClick(item)
        }))
    
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