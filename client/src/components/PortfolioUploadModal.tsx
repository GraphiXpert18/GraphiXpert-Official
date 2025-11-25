'use client';

import { useState } from 'react';
import { FaTimes, FaUpload, FaImage, FaVideo, FaFileImage } from 'react-icons/fa';
import api from '@/lib/api';

interface PortfolioUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editItem?: any;
}

export default function PortfolioUploadModal({ isOpen, onClose, onSuccess, editItem }: PortfolioUploadModalProps) {
    const [formData, setFormData] = useState({
        title: editItem?.title || '',
        category: editItem?.category || 'Web Design',
        description: editItem?.description || '',
        videoUrl: editItem?.videoUrl || '',
        featured: editItem?.featured || false,
    });

    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const categories = ['Web Design', 'App Development', 'UI/UX Design', 'Graphic Design', 'Video Editing', 'Digital Marketing'];

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages([...images, ...files]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setVideos([...videos, ...files]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    const removeVideo = (index: number) => {
        setVideos(videos.filter((_, i) => i !== index));
        setVideoPreviews(videoPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setUploadProgress(0);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('videoUrl', formData.videoUrl);
            data.append('featured', formData.featured.toString());

            if (thumbnail) {
                data.append('thumbnail', thumbnail);
            }

            images.forEach(image => {
                data.append('images', image);
            });

            videos.forEach(video => {
                data.append('videos', video);
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            };

            if (editItem) {
                await api.put(`/portfolio/${editItem._id}`, data, config);
            } else {
                await api.post('/portfolio', data, config);
            }

            onSuccess();
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error uploading portfolio:', error);
            alert('Failed to upload portfolio. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: 'Web Design',
            description: '',
            videoUrl: '',
            featured: false,
        });
        setThumbnail(null);
        setImages([]);
        setVideos([]);
        setThumbnailPreview(null);
        setImagePreviews([]);
        setVideoPreviews([]);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {editItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                        disabled={uploading}
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter project title"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                            Category *
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your project..."
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaFileImage className="inline mr-2" />
                            Thumbnail (Optional - auto-selects first image if not provided)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {thumbnailPreview && (
                            <div className="mt-4 relative inline-block">
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="w-48 h-27 object-cover rounded-md"
                                    style={{ aspectRatio: '16/9' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnail(null);
                                        setThumbnailPreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <FaTimes size={12} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Images Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaImage className="inline mr-2" />
                            Images (Up to 10)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImagesChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Videos Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            <FaVideo className="inline mr-2" />
                            Videos (Up to 5)
                        </label>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={handleVideosChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {videoPreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {videoPreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <video
                                            src={preview}
                                            className="w-full h-32 object-cover rounded-md"
                                            controls
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* External Video URL */}
                    <div>
                        <label htmlFor="videoUrl" className="block text-gray-700 font-medium mb-2">
                            External Video URL (YouTube, Vimeo, etc.)
                        </label>
                        <input
                            type="url"
                            id="videoUrl"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://youtube.com/..."
                        />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="featured" className="ml-2 text-gray-700 font-medium">
                            Featured Project
                        </label>
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                            <p className="text-center text-sm text-gray-600 mt-2">
                                Uploading... {uploadProgress}%
                            </p>
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
                        >
                            <FaUpload className="mr-2" />
                            {uploading ? 'Uploading...' : editItem ? 'Update' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
