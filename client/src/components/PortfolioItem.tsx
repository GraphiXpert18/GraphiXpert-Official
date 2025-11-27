import Link from 'next/link';
import Image from 'next/image';

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
        return `http://localhost:5000${imagePath}`;
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
        <Link href={`/portfolio/${item._id}`}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300 bg-gray-100">
                {/* 16:9 Aspect Ratio Container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <Image
                        src={displayImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition duration-500"
                        unoptimized
                    />
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-blue-300 font-medium mb-2">{item.category}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                    <p className="text-white mt-4 text-sm font-medium">Click to view details →</p>
                </div>
            </div>
        </Link>
    );
};

export default ProjectItem;
