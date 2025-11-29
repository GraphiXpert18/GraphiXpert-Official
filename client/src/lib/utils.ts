import { API_URL } from './config';

export const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return '/placeholder.jpg';

    // If it's already a full URL (Cloudinary, external), return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Ensure proper slash handling
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${baseUrl}${path}`;
};
