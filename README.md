# Traccar Web
This is a unofficial web interface for [Traccar](https://www.traccar.org/) GPS tracking server. It is a simple and lightweight that allows you track your devices in real-time.

This project uses [Traccar API](https://www.traccar.org/api-reference/) to get the data from the server.

## Features
- Dark mode
- Multiple map providers (Google Maps, OpenStreetMap, Carto, Stadia)
- Positions animation (play, pause, stop)
- Select time range of positions

## Screenshots
![CleanShot 2024-06-15 at 19 58 01](https://github.com/carum98/traccar-web-nuxt/assets/40967143/8c62e450-bef3-466e-8e15-a744a0f2efa1)
![CleanShot 2024-06-15 at 19 28 56](https://github.com/carum98/traccar-web-nuxt/assets/40967143/f77e6fdc-6081-4319-bf2f-03cd76fe3f2a)

## Setup

### Docker
```bash
docker build -t <name-container> -f ./Dockerfile.prod .
docker run -d -p 8080:80 <name-container> -e NUXT_API_TRACCAR=<traccar-url>
```

### Manual
```bash
export NUXT_API_TRACCAR=<traccar-url> # Set the Traccar URL

npm install # Install dependencies
npm run build # Build the project
node .output/server/index.mjs # Run the server
```
