'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';

// Mock data (same as Services page for consistency)
const mockServices = [
    {
        _id: '1',
        title: 'Web Design',
        description: 'Custom, responsive websites designed to engage your audience and grow your business.',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom Graphics'],
        deliverables: ['Source Code', 'Design Assets', 'Documentation'],
        timeline: '2-4 Weeks',
        priceRange: '$500 - $5000',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '2',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        features: ['iOS & Android', 'Push Notifications', 'Offline Mode', 'App Store Submission'],
        deliverables: ['APK/IPA Files', 'Source Code', 'Admin Panel'],
        timeline: '1-3 Months',
        priceRange: '$2000 - $15000',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '3',
        title: 'UI/UX Design',
        description: 'User-centered design solutions that enhance user satisfaction and loyalty.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
        deliverables: ['Figma Files', 'Style Guide', 'Interactive Prototype'],
        timeline: '2-3 Weeks',
        priceRange: '$1000 - $8000',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '4',
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns to boost your online visibility and reach.',
        features: ['SEO', 'Social Media Marketing', 'Email Campaigns', 'Analytics'],
        deliverables: ['Monthly Reports', 'Strategy Document', 'Ad Creatives'],
        timeline: 'Ongoing',
        priceRange: '$500/mo - $5000/mo',
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '5',
        title: 'Graphic Design',
        description: 'Creative graphic design services for branding, marketing materials, and more.',
        features: ['Logo Design', 'Brochures', 'Business Cards', 'Social Media Graphics'],
        deliverables: ['Vector Files', 'Print Ready Files', 'Brand Guidelines'],
        timeline: '1-2 Weeks',
        priceRange: '$100 - $2000',
        image: 'https://images.unsplash.com/photo-1626785774573-4b7993125486?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '6',
        title: 'Video Editing',
        description: 'Professional video editing services for corporate videos, social media, and more.',
        features: ['Color Grading', 'Sound Design', 'Motion Graphics', 'Subtitles'],
        deliverables: ['High Quality Video', 'Project Files', 'Thumbnail'],
        timeline: '3-7 Days',
        priceRange: '$200 - $3000',
        image: 'https://images.unsplash.com/photo-1574717436423-a75a68c65b44?auto=format&fit=crop&w=800&q=80',
    },
];

export default function ServiceDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const foundService = mockServices.find((s) => s._id === id);
            setService(foundService);
        }
    }, [id]);

    if (!service) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-96 w-full">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                        {service.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-6">Overview</h2>
                        <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                        <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {service.features.map((feature: string, index: number) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <FaCheckCircle className="text-green-500 mr-3" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-2xl font-bold mb-4">Deliverables</h3>
                        <ul className="list-disc list-inside text-gray-700 mb-8 pl-4">
                            {service.deliverables.map((item: string, index: number) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-8 rounded-lg shadow-lg sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Service Details</h3>

                            <div className="flex items-center mb-4">
                                <FaClock className="text-blue-600 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Timeline</p>
                                    <p className="font-semibold">{service.timeline}</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-8">
                                <FaDollarSign className="text-blue-600 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Starting Price</p>
                                    <p className="font-semibold">{service.priceRange}</p>
                                </div>
                            </div>

                            <Link
                                href={`/contact?service=${encodeURIComponent(service.title)}`}
                                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-bold hover:bg-blue-700 transition duration-300"
                            >
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
