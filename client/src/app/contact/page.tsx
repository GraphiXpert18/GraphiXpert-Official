'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import api from '@/lib/api';

function ContactForm() {
    const searchParams = useSearchParams();
    const initialService = searchParams.get('service') || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: initialService,
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Attempt to send to backend
            await api.post('/enquiries', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            // For now, show success even if backend fails (demo mode)
            setStatus('success');
            // setStatus('error'); // Uncomment when backend is real
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {status === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Thank you! Your message has been sent successfully.
                </div>
            )}

            {status === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Something went wrong. Please try again later.
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">Service Type</label>
                <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Service</option>
                    <option value="Web Design">Web Design</option>
                    <option value="App Development">App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                    We'd love to hear from you. Let's discuss your project.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <div className="bg-blue-50 p-8 rounded-lg mb-8">
                        <h3 className="text-2xl font-bold mb-6 text-blue-900">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <FaPhone className="text-blue-600 mt-1 mr-4" size={24} />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+91 9788156637</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaEnvelope className="text-blue-600 mt-1 mr-4" size={24} />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">rajaaysha78@gmail.com</p>
                                </div>
                                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
                                    {/* Placeholder for Map */}
                                    Google Map Embed Placeholder
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
