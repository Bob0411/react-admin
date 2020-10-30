export const rm = (key: string, val: string) => {
    localStorage.setItem(key, val)
}
export const get = (key: string): string | null => {
    return localStorage.getItem(key)
}