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
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Our Portfolio
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                    Check out some of our recent work.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-full font-medium transition duration-300 ${filter === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading portfolio...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No projects found in this category.</p>
                </div>
            )}

            {/* Portfolio Grid */}
            {!loading && filteredItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <PortfolioItem key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
