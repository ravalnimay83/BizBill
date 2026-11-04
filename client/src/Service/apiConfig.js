// Automatically points to the current host (localhost on PC, local IP on mobile)
const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
export const API_BASE_URL = `http://${host}:8080/api/v1.0`;
