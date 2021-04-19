export const TOKEN = 'TOKEN';

export function getLocalStorage() {
    const token = localStorage.getItem(TOKEN);
    if (token) return JSON.parse(token);
    return '';
}

export function setLocalStorage(token) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
}

