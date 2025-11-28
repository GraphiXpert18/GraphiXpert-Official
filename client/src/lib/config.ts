const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5007';
export const API_URL = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
