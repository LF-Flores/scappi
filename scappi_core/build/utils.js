export default function random_id(size) {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
