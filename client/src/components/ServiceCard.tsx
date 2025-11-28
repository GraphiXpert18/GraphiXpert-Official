import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { API_URL } from '@/lib/config';

interface ServiceProps {
    _id: string;
    title: string;
    description: string;
    priceRange?: string;
    image?: string;
}

const ServiceCard = ({ service }: { service: ServiceProps }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
            {service.image && (
                <img
                    src={service.image.startsWith('http') ? service.image : `${API_URL}${service.image}`}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {service.description}
                </p>
                {service.priceRange && (
                    <p className="text-sm text-gray-500 mb-4">
                        Starting from: <span className="font-semibold text-blue-600">{service.priceRange}</span>
                    </p>
                )}
                <Link
                    href={`/services/${service._id}`}
                    className="mt-auto flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
                >
                    View Details <FaArrowRight className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
