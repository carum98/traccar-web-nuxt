type Position = {
    id: number
    latitude: number
    longitude: number
    fixTime: string
    speed: number
    course: number
    attributes: {
        ignition: boolean
        motion: boolean
    }
}