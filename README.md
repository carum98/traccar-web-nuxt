# Traccar Web
This is a unofficial web interface for [Traccar](https://www.traccar.org/) GPS tracking server. It is a simple and lightweight that allows you track your devices in real-time.

This project uses [Traccar API](https://www.traccar.org/api-reference/) to get the data from the server.

## Screenshots

## Setup

### Docker
#### Build
```bash
docker build -t <name-container> -f ./Dockerfile.prod .
```

#### Run
```bash
docker run -d -p 8080:80 <name-container> -e NUXT_API_TRACCAR=<traccar-url>
```

### Manual
### Environment Variables
You need to set the environment variable `NUXT_API_TRACCAR` with the URL of your Traccar server.

### Up
```bash
npm install # Install dependencies
npm run build # Build the project
node .output/server/index.mjs # Run the server
```

