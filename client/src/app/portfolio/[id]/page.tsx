'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { FaArrowLeft, FaTag, FaPlay } from 'react-icons/fa';

import { API_URL } from '@/lib/config';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [Project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    useEffect(() => {
        if (params.id) {
            fetchProject();
        }
    }, [params.id]);

    const fetchProject = async () => {
        try {
            const response = await api.get(`/portfolio/${params.id}`);
            setProject(response.data);
        } catch (error) {
            console.error('Error fetching Project:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!Project) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center py-12">
                    <p className="text-gray-500">Project not found.</p>
                    <button
                        onClick={() => router.push('/portfolio')}
                        className="mt-4 text-blue-600 hover:text-blue-800"
                    >
                        Back to Portfolio
                    </button>
                </div>
            </div>
        );
    }

    const images = Project.images || [];
    const videos = Project.videos || [];
    const allMedia = [
        ...images.map((img: string) => ({ type: 'image', url: img })),
        ...videos.map((vid: string) => ({ type: 'video', url: vid }))
    ];

    const currentMedia = allMedia[currentMediaIndex];
    const displayUrl = currentMedia
        ? (currentMedia.url.startsWith('http') ? currentMedia.url : `${API_URL}${currentMedia.url}`)
        : '/placeholder.jpg';

    // Extract YouTube video ID if videoUrl is provided
    const getYouTubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const youtubeEmbedUrl = Project.videoUrl ? getYouTubeEmbedUrl(Project.videoUrl) : null;

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
                onClick={() => router.push('/portfolio')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition duration-300"
            >
                <FaArrowLeft className="mr-2" />
                Back to Portfolio
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Media Gallery */}
                <div>
                    {/* Main Media Display */}
                    <div className="relative rounded-lg overflow-hidden shadow-2xl mb-4 bg-gray-100">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            {currentMedia?.type === 'video' ? (
                                <video
                                    src={displayUrl}
                                    controls
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={displayUrl}
                                    alt={Project.title}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            )}
                        </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    {allMedia.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {allMedia.map((media: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentMediaIndex(index)}
                                    className={`relative rounded overflow-hidden ${currentMediaIndex === index
                                        ? 'ring-4 ring-blue-500'
                                        : 'opacity-70 hover:opacity-100'
                                        } transition duration-300`}
                                >
                                    {media.type === 'video' ? (
                                        <div className="relative w-full h-20 bg-gray-900 flex items-center justify-center">
                                            <FaPlay className="text-white text-2xl" />
                                        </div>
                                    ) : (
                                        <img
                                            src={media.url.startsWith('http') ? media.url : `${API_URL}${media.url}`}
                                            alt={`${Project.title} ${index + 1}`}
                                            className="w-full h-20 object-cover bg-gray-50"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* External Video (YouTube, etc.) */}
                    {youtubeEmbedUrl && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Video</h3>
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    src={youtubeEmbedUrl}
                                    className="absolute inset-0 w-full h-full rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div>
                    <div className="flex items-center mb-4">
                        <FaTag className="text-blue-600 mr-2" />
                        <span className="text-blue-600 font-medium">{Project.category}</span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                        {Project.title}
                    </h1>

                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                            {Project.description}
                        </p>
                    </div>

                    {Project.caseStudy && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Case Study</h3>
                            <p className="text-gray-700 whitespace-pre-line">{Project.caseStudy}</p>
                        </div>
                    )}

                    {Project.link && (
                        <div className="mt-8">
                            <a
                                href={Project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                View Live Project
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
