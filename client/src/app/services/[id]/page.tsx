'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaClock, FaTag } from 'react-icons/fa';
import api from '@/lib/api';

export default function ServiceDetailsPage() {
    const params = useParams();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchService(params.id as string);
        }
    }, [params.id]);

    const fetchService = async (id: string) => {
        try {
            const { data } = await api.get(`/services/${id}`);
            setService({
                ...data,
                image: data.image ? `http://localhost:5000${data.image}` : undefined
            });
        } catch (error) {
            console.error('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition">
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {service.image && (
                        <div className="h-64 md:h-96 w-full relative">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 text-white">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.title}</h1>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {!service.image && (
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h1>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                {service.features && service.features.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.features.map((feature: string, index: number) => (
                                                <li key={index} className="flex items-start">
                                                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {service.deliverables && service.deliverables.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">What You Get</h3>
                                        <ul className="space-y-3">
                                            {service.deliverables.map((item: string, index: number) => (
                                                <li key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                                                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">Service Details</h3>

                                    <div className="space-y-6 mb-8">
                                        {service.priceRange && (
                                            <div className="flex items-start">
                                                <div className="bg-green-100 p-3 rounded-lg mr-4 text-green-600">
                                                    <FaTag size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium uppercase">Price Range</p>
                                                    <p className="text-lg font-bold text-gray-900">{service.priceRange}</p>
                                                </div>
                                            </div>
                                        )}

                                        {service.timeline && (
                                            <div className="flex items-start">
                                                <div className="bg-blue-100 p-3 rounded-lg mr-4 text-blue-600">
                                                    <FaClock size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium uppercase">Estimated Timeline</p>
                                                    <p className="text-lg font-bold text-gray-900">{service.timeline}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                                        className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        Enquire Now
                                    </Link>
                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        Contact us for a custom quote tailored to your needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
