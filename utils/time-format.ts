export function timeFormat(dateString: string) {
    const date = new Date(dateString)

    const format = date.toLocaleTimeString('en', { 
        month: 'long',
        day: 'numeric',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    // Replace all the slashes with dashes
    return format.replace(/\//g, '-').toLowerCase()
}