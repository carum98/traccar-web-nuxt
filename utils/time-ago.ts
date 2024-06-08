export function timeAgo(dateString: string) {
    const now = new Date()

    const date = new Date(dateString)
    const elapsed = now - date
    
    const units = [
        { max: 60, value: 1, name: 'second' },
        { max: 3600, value: 60, name: 'minute' },
        { max: 86400, value: 3600, name: 'hour' },
        { max: 2592000, value: 86400, name: 'day' },
        { max: 31536000, value: 2592000, name: 'month' },
        { max: Infinity, value: 31536000, name: 'year' }
    ] as { max: number, value: number, name: Intl.RelativeTimeFormatUnit }[]
    
    const seconds = Math.floor(elapsed / 1000)
    
    const unit = units.find(unit => seconds < unit.max)

    if (!unit) {
        throw new Error('Date too far in the past')
    }

    const { value, name } = unit
    
    const time = Math.floor(seconds / value);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    
    return rtf.format(-time, name);
}