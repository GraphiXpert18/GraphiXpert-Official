import Link from 'next/link';
import Image from 'next/image';

import { API_URL } from '@/lib/config';

interface ProjectProps {
    _id: string;
    title: string;
    category: string;
    thumbnail?: string;
    images?: string[];
    image?: string;
    description: string;
}

const ProjectItem = ({ item }: { item: ProjectProps }) => {
    // Helper function to get full image URL (supports both Cloudinary and local paths)
    const getImageUrl = (imagePath: string | undefined) => {
        if (!imagePath) return '/placeholder.jpg';
        // If it's already a full URL (Cloudinary), return as-is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Otherwise, it's a local path, prepend the server URL
        return `${API_URL}${imagePath}`;
    };

    // Use thumbnail if available, otherwise fall back to first image
    const displayImage = item.thumbnail
        ? getImageUrl(item.thumbnail)
        : item.images && item.images.length > 0
            ? getImageUrl(item.images[0])
            : item.image
                ? getImageUrl(item.image)
                : '/placeholder.jpg';

    return (
        <Link href={`/portfolio/${item._id}`} className="block h-full">
            <div className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                        src={displayImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                        unoptimized
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                        {item.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                        {item.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-medium text-sm group/link">
                        View Project
                        <svg
                            className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectItem;
