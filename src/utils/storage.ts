export const rm = (key: string) => {
    localStorage.removeItem(key)
}
export const get = (key: string): string | null => {
    return localStorage.getItem(key)
}
export const set = (key: string, val: string) => {
    localStorage.setItem(key, val)
}