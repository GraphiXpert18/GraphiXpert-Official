'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage, FaVideo } from 'react-icons/fa';
import PortfolioUploadModal from '@/components/PortfolioUploadModal';
import api from '@/lib/api';

import { API_URL } from '@/lib/config';

export default function AdminPortfolioPage() {
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

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

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/portfolio/${id}`);
                setPortfolio(portfolio.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting portfolio:', error);
                alert('Failed to delete portfolio item');
            }
        }
    };

    const handleEdit = (item: any) => {
        setEditItem(item);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditItem(null);
    };

    const handleUploadSuccess = () => {
        fetchPortfolio();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Portfolio</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
                >
                    <FaPlus className="mr-2" /> Add New Item
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading portfolio...</p>
                </div>
            ) : portfolio.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <FaImage className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 mb-4">No portfolio items yet</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add Your First Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map((item) => {
                        const thumbnailUrl = item.thumbnail
                            ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${API_URL}${item.thumbnail}`)
                            : item.images?.[0]
                                ? (item.images[0].startsWith('http') ? item.images[0] : `${API_URL}${item.images[0]}`)
                                : '/placeholder.jpg';

                        return (
                            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                                {/* Thumbnail with 16:9 ratio */}
                                <div className="relative w-full bg-gray-100" style={{ paddingBottom: '56.25%' }}>
                                    <img
                                        src={thumbnailUrl}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {item.featured && (
                                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{item.title}</h3>
                                    <p className="text-sm text-blue-600 mb-2">{item.category}</p>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                                    {/* Media indicators */}
                                    <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                                        {item.images?.length > 0 && (
                                            <span className="flex items-center">
                                                <FaImage className="mr-1" />
                                                {item.images.length} {item.images.length === 1 ? 'image' : 'images'}
                                            </span>
                                        )}
                                        {item.videos?.length > 0 && (
                                            <span className="flex items-center">
                                                <FaVideo className="mr-1" />
                                                {item.videos.length} {item.videos.length === 1 ? 'video' : 'videos'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Upload Modal */}
            <PortfolioUploadModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleUploadSuccess}
                editItem={editItem}
            />
        </div>
    );
}
