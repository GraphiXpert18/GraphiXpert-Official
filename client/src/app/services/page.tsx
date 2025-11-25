'use client';

import { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import api from '@/lib/api';

// Mock data in case backend is down
const mockServices = [
    {
        _id: '1',
        title: 'Web Design',
        description: 'Custom, responsive websites designed to engage your audience and grow your business.',
        priceRange: '$500 - $5000',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '2',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        priceRange: '$2000 - $15000',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '3',
        title: 'UI/UX Design',
        description: 'User-centered design solutions that enhance user satisfaction and loyalty.',
        priceRange: '$1000 - $8000',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '4',
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns to boost your online visibility and reach.',
        priceRange: '$500/mo - $5000/mo',
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '5',
        title: 'Graphic Design',
        description: 'Creative graphic design services for branding, marketing materials, and more.',
        priceRange: '$100 - $2000',
        image: 'https://images.unsplash.com/photo-1626785774573-4b7993125486?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: '6',
        title: 'Video Editing',
        description: 'Professional video editing services for corporate videos, social media, and more.',
        priceRange: '$200 - $3000',
        image: 'https://images.unsplash.com/photo-1574717436423-a75a68c65b44?auto=format&fit=crop&w=800&q=80',
    },
];

export default function ServicesPage() {
    const [services, setServices] = useState(mockServices);
    const [loading, setLoading] = useState(false); // Set to true if actually fetching

    useEffect(() => {
        // Uncomment to fetch from API
        /*
        const fetchServices = async () => {
          try {
            setLoading(true);
            const { data } = await api.get('/services');
            setServices(data);
          } catch (error) {
            console.error('Failed to fetch services:', error);
            // Fallback to mock data is already set
          } finally {
            setLoading(false);
          }
        };
        fetchServices();
        */
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Our Services
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                    Comprehensive digital solutions tailored to your business needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
}
