import L from 'leaflet'
import { layers, getMarkerByPoint } from '@utils/map'
export { layers }

let map: L.Map

type MapContext = {
    mapStyle: L.Layer | null
    markerHighlight: L.Marker | null
    route: {
        points: L.GeoJSON<GeoJSON.MultiPoint>
        line: L.GeoJSON<GeoJSON.LineString>
    } | null
}

const context: MapContext = {
    mapStyle: null,
    markerHighlight: null,
    route: null
}

export function useMap() {
    function init(id: string) {
        const element = document.getElementById(id) as HTMLElement

        map = L.map(element, {
            center: [0, 0],
            zoom: 13,
            zoomControl: false
        })
    
        setMapStyle(layers[0].layer)
    }

    function drawRoute<T>(
        points: { point: [number, number], item: T & { course: number } }[],
        onClick: (item: T) => void
    ) {
        if (context.route) {
            map.removeLayer(context.route.points)
            map.removeLayer(context.route.line)
        }

        const coordinates = points.map(item => item.point)

        if (coordinates.length === 0) return

        const lines: GeoJSON.Feature<GeoJSON.LineString> = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates
            }
        }

        const makers: GeoJSON.Feature<GeoJSON.MultiPoint> = {
            type: 'Feature',
            properties: {
                points: points.map(item => item.item)
            },
            geometry: {
                type: 'MultiPoint',
                coordinates
            }
        }

        const linesLayer = L.geoJSON(lines, {
            style: {
                color: 'blue',
                weight: 5,
                opacity: 0.7
            }
        }).addTo(map)

        const makersLayer = L.geoJSON(makers, {
            pointToLayer: (feature, latlng) => {
                const index = coordinates.findIndex(coordinate => coordinate[0] === latlng.lng && coordinate[1] === latlng.lat)
                const item = feature.properties.points[index]

                return L.marker(latlng, {
                    icon: new IconCourse({ course: item.course })
                })
                .on('click', () => onClick(item))
            }
        }).addTo(map)

        map.fitBounds(linesLayer.getBounds())

        context.route = {
            points: makersLayer,
            line: linesLayer
        }
    }

    function highlightRoutePoint(lat: number, lon: number) {
        const point = getMarkerByPoint(map, [lat, lon])
        if (!point) return

        if (context.markerHighlight) {
            map.removeLayer(context.markerHighlight)
        }

        context.markerHighlight = L.marker(point.getLatLng(), {
            icon: new IconCourse({ 
                course: (point.options.icon?.options as L.DivIconOptions & { course: number }).course, 
                highlight: true
            })
        }).addTo(map)
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

    function setMapStyle(layer: L.TileLayer) {
        context.mapStyle?.remove()
        map.addLayer(layer)
        context.mapStyle = layer
    }

    function flyTo(lat: number, lon: number) {
        map.flyTo([lat, lon], 18)
    }

    function moveTo(lat: number, lon: number) {
        map.setView([lat, lon])
    }

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
        moveTo,
        zoom,
        setMapStyle,
        highlightRoutePoint,
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

const IconCourse = L.DivIcon.extend({
    options: {
        className: 'icon-course-marker',
    },
    createIcon: function () {
        const { course, highlight } = this.options

        const div = document.createElement('div')
        const icon = document.createElement('div')

        icon.style.borderBottomColor = highlight ? 'red' : '#160077'

        this._setIconStyles(div, 'icon')
        icon.style.transform += `rotate(${course}deg)`

        div.appendChild(icon)

        return div
    }
}) as any
