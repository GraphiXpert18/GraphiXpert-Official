'use client';

import { useState, useEffect } from 'react';
import PortfolioItem from '@/components/PortfolioItem';
import api from '@/lib/api';

interface PortfolioItemType {
    _id: string;
    title: string;
    category: string;
    thumbnail?: string;
    images?: string[];
    image?: string;
    description: string;
}

const categories = ['All', 'Web Design', 'App Development', 'UI/UX Design', 'Graphic Design', 'Multimedia Service'];

export default function PortfolioPage() {
    const [filter, setFilter] = useState('All');
    const [portfolio, setPortfolio] = useState<PortfolioItemType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const response = await api.get('/portfolio');
            setPortfolio(response.data);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = filter === 'All'
        ? portfolio
        : portfolio.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Masterpieces</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
                        Explore our diverse collection of projects where creativity meets technology.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${filter === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-offset-2 ring-blue-500'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200 shadow-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-medium animate-pulse">Curating projects...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredItems.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                            <p className="mt-2 text-gray-500">We haven't added any projects to this category yet.</p>
                        </div>
                    )}

                    {/* Portfolio Grid */}
                    {!loading && filteredItems.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="transform transition-all duration-500 hover:-translate-y-2"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <PortfolioItem item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
