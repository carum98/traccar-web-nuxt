import L from 'leaflet'

export const layers = [
    {
        name: 'OpenStreetMap',
        value: 'openstreetmap',
        layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    },
    {
        name: 'Stadia Dark',
        value: 'stadia-dark',
        layer: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
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

export function getMarkerByPoint(
    map: L.Map,
    point: [number, number]
): L.Marker | null {
    let marker: L.Marker | null = null

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            if (layer.getLatLng().equals(point)) {
                marker = layer
            }
        }
    })

    return marker
}