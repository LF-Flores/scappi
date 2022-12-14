function random_id(size = 20): string {
    return [...Array(size)].map(
                () => Math.floor(Math.random() * 16).toString(16)
            ).join('')
}

export { random_id };